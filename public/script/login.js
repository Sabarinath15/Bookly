//onload

window.onload = () => {
    if (sessionStorage.getItem('userId') != undefined) {
        location.href = '../pages/dashboard.html';
    }
}



//form
const createForm = document.querySelector('#createForm');
const loginForm = document.querySelector('#loginForm');

//form container
const createCon =  document.querySelector('.create-acc');
const loginCon = document.querySelector('.login-acc');
//container change buttons
const login = document.querySelector('#login');
const signup = document.querySelector('#signup');

//create input fields
var orgName = document.querySelector('#orgName');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var confPassword = document.querySelector('#confPassword');

//create form error
var nameErr = document.querySelector('#nameErr');
var emailErr = document.querySelector('#emailErr');
var passwordErr = document.querySelector('#passwordErr');
var confpasswordErr = document.querySelector('#confpasswordErr');

//login input fileds
var logEmail = document.querySelector('#log-email');
var logPassword = document.querySelector('#log-password');

//login form error
var logEmailErr = document.querySelector('#log-emailErr');
var logPasswordErr = document.querySelector('#log-passwordErr');

//error message
var createError = document.querySelector('#create-error');
var loginError = document.querySelector('#login-error');

//Create form event listner
createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (createInputCheck()) {
        try {
            const haveAcc = await axios.get(`/account/checkuser/${email.value}`); //checking the user has account
            if (!haveAcc.data.have) {
                const user = await axios.post('/account/newuser', {
                    "name" : orgName.value,
                    "email" : email.value,
                    "password" : password.value
                }); //Store the valid user data
                console.log(user);
                sessionStorage.setItem('userId', JSON.stringify(user.data.id)); // storing the user id in local
                createError.style.display = 'none';
                location.href = '../pages/dashboard.html'; //navigate to dashboard
            }else{
                createError.innerHTML = 'The email is already exist, please Login.';
                createError.style.display = 'block';
                orgName.value = '';
                email.value = '';
                password.value = '';
                confPassword.value = '';
            }
        } catch (error) {
            createError.innerHTML = 'Something went wrong, try again later';
            console.log(error);
            createError.style.display = 'block';
            orgName.value = '';
            email.value = '';
            password.value = '';
            confPassword.value = '';
        }
    }
});


//login form event listner
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (loginInputCheck()) {
        try {
            const haveAcc = await axios.get(`/account/checkuser/${logEmail.value}`); //checking the user has account
            if (haveAcc.data.have) {
                var user = await axios.get(`/account/user/${logEmail.value}`); //get the user details
                user = user.data.data.Items[0];
                if (user.password == logPassword.value && user.email == logEmail.value) {
                    sessionStorage.setItem('userId', JSON.stringify(user['id'])); //store the user id in local
                    loginError.style.display = 'none';
                    location.href = '../pages/dashboard.html'; //navigate to dashboard
                }else{
                    loginError.innerHTML = 'The password is incorrect.';
                    loginError.style.display = 'block';
                }
            }else{
                loginError.innerHTML = 'The email is not registered, please Signup.';
                loginError.style.display = 'block';
                logEmail.value = '';
                logPassword.value = '';
            }
        } catch (error) {
            loginError.innerHTML = 'Something went wrong, try again later';
            console.log(error);
            loginError.style.display = 'block';
            logEmail.value = '';
            logPassword.value = '';
        }
    }
})

//change the form container
login.addEventListener('click', () => {
    createCon.style.display = 'none';
    loginCon.style.display = 'block';
});

signup.addEventListener('click', () => {
    loginCon.style.display = 'none';
    createCon.style.display = 'block';
})


//checking the create form inputs are valid
function createInputCheck() {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var check = true;
    if (orgName.value == '') {
        nameErr.style.display = 'block';
        check = false;
    }
    if (!email.value.match(validRegex)) {
        emailErr.style.display = 'block';
        check = false;
    }
    if (password.value.length < 8) {
        passwordErr.style.display = 'block';
        check = false;
    }
    if (password.value != confPassword.value) {
        confpasswordErr.style.display = 'block';
        check = false;;
    }
    if (check) {
        nameErr.style.display = 'none';
        emailErr.style.display = 'none';
        passwordErr.style.display = 'none';
        confpasswordErr.style.display = 'none';
    }
    return check;
}
//onchange for create form
function OnChange(){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (orgName.value != '') {
        nameErr.style.display = 'none';
    }
    if (email.value.match(validRegex)) {
        emailErr.style.display = 'none';
    }
    if (password.value.length >= 8) {
        passwordErr.style.display = 'none';
    }
    if (password.value == confPassword.value) {
        confpasswordErr.style.display = 'none';
    }
}

//checking input fileds of login form

function loginInputCheck() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var check = true;
    if (!logEmail.value.match(validRegex)) {
        logEmailErr.style.display = 'block';
        check = false;
    }
    if (logPassword.value.length < 8) {
        logPasswordErr.style.display = 'block';
        check = false;
    }
    if (check) {
        logEmailErr.style.display = 'none';
        logPasswordErr.style.display = 'none';
    }
    return check;
}

//onchange for login form
function OnChangeLogin(){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (logEmail.value.match(validRegex)) {
        logEmailErr.style.display = 'none';
    }
    if (logPassword.value.length >= 8) {
        logPasswordErr.style.display = 'none';
    }
}