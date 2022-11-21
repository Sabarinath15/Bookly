//onload
window.onload = () => {
    if (sessionStorage.getItem('userId') == undefined) {
        location.href = '../index.html';
    }

    if (sessionStorage.getItem('editEventId') != undefined) {
        editForm(sessionStorage.getItem('editEventId'));
    }
}

const form = document.querySelector('#form'); // create form

//input elements
var eventName =  document.querySelector('#eventName');
var duration = document.querySelector('#duration');
var timeFormat = document.querySelector('#time-format');
var startDate = document.querySelector('#start-date');
var noOfDays = document.querySelector('#no-of-days');
var days = document.querySelectorAll('input[name="day"]');
var daysTime = {};

//error elemts
var nameErr = document.querySelector('#nameErr');
var durationErr = document.querySelector('#durationErr');
var startDateErr = document.querySelector('#startDateErr');
var daysErr = document.querySelector('#daysErr');
var timeErr = document.querySelector('#timeErr');

//popup notification
var popup = document.querySelector('.popup');
var blurBg = document.querySelector('.blur');


//edit the event 
const editForm = async (eventId) => {
    try {
        var event = await axios.get(`/events/event/${eventId}`);
        event = event.data.event[0];
        changeFileds(event);
    } catch (error) {
        console.log(error);
    }
}

const changeFileds = (event) => {
    var date = new Date(event.startDate);
    eventName.value = event.eventName;
    duration.value = event.duration;
    timeFormat.value = event.durationFormat;
    startDate.value = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    noOfDays.value = event.noOfDays;
    for (const day in event.workingDays) {
        var input = document.querySelector(`#${day}`);
        input.disabled = false;
        var start_time = document.querySelector('#'+day+'-start-time');
        var end_time = document.querySelector('#'+day+'-end-time');
        start_time.value = event.workingDays[day]['start-time'];
        end_time.value = event.workingDays[day]['end-time'];
    }
}

//form submit

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (checkInput()) {
        //console.log(eventName.value, parseInt(duration.value), timeFormat.value, new Date(startDate.value).toJSON(), parseInt(noOfDays.value), daysTime);
        var createrId = JSON.parse(sessionStorage.getItem('userId'));
        var convDuration = timeFormat.value == "min" ? parseInt(duration.value) : parseInt(duration.value) * 60;
        var date = new Date(startDate.value).toJSON();
        try {
            var creater = await axios.get(`/account/userdetail/${createrId}`);
            if (sessionStorage.getItem('editEventId') != undefined) {
                console.log(sessionStorage.getItem('editEventId'));
                await axios.put(`/events/event/${sessionStorage.getItem('editEventId')}`,{
                    createrId : createrId,
                    createrName : creater.data.user.name,
                    eventName : eventName.value,
                    duration : convDuration,
                    durationFormat : timeFormat.value,
                    startDate : date,
                    noOfDays : parseInt(noOfDays.value),
                    workingDays : daysTime,
                });
            }else{
                await axios.post('/events/createEvent',{
                    createrId : createrId,
                    createrName : creater.data.user.name,
                    eventName : eventName.value,
                    duration : convDuration,
                    durationFormat : timeFormat.value,
                    startDate : date,
                    noOfDays : parseInt(noOfDays.value),
                    workingDays : daysTime,
                });
            }
            popup.innerHTML = 
            `<div>
                <h1>Successfull!</h1>
                <p>Event was created and scheduled successfully.</p>
            </div>
            <button onclick="location.href ='./dashboard.html'">Ok</button>`;
            popup.style.visibility = 'visible';
            blurBg.style.visibility = 'visible';
        } catch (error) {
            popup.innerHTML = 
            `<div>
                <h1 style="color: #FF5252">Oops...!</h1>
                <p>Something went wrong, please try again.</p>
            </div>
            <button onclick="location.href ='./dashboard.html'">Ok</button>`;
            popup.style.visibility = 'visible';
            blurBg.style.visibility = 'visible';
        }
    }
})

//Checking thge input values
function checkInput() {
    var check = true;
    daysTime = {};
    if (eventName.value === '') {
        nameErr.style.display = 'block';
        check = false;
    }

    if (duration.value === '') {
        durationErr.style.display = 'block';
        check = false;
    }else if(isNaN(duration.value)) {
        durationErr.innerHTML = 'The duration must be a number.';
        durationErr.style.display = 'block';
        check = false;
    }
    if (startDate.value === '') {
        startDateErr.style.display = 'block';
        check =  false;
    }else if (startDate.value < new Date()) {
        startDateErr.innerHTML = 'The date must not be in past.';
        startDateErr.style.display = 'block';
        check =  false;
    }

    if (noOfDays.value === '') {
        daysErr.style.display = 'block';
        check = false;
    }else if (noOfDays.value < 1) {
        daysErr.innerHTML = 'The no. of days must be 1 or more.';
        daysErr.style.display = 'block';
        check = false;
    }else if (noOfDays > 60) {
        daysErr.innerHTML = 'The no. of days must not be greater than 60 days.';
        daysErr.style.display = 'block';
        check = false;
    }

    for (let i = 0; i < days.length; i++) {
        if (days[i].checked) {
            var start_time = document.querySelector('#'+days[i].value+'-start-time').value;
            var end_time = document.querySelector('#'+days[i].value+'-end-time').value;
            if (start_time < end_time) {
               daysTime[days[i].value] = {
                'start-time' : start_time,
                'end-time' : end_time,
               }
            }else{
                timeErr.style.display = 'block';
                check = false;
            }
        }
    }

    if (check) {
        nameErr.style.display = 'none';
        durationErr.style.display = 'none';
        startDateErr.style.display = 'none';
        daysErr.style.display = 'none';
        timeErr.style.display = 'none';
    }

    return check;
}

//onchange input
function onChangeInputs() {
    if (eventName.value != '') {
        nameErr.style.display = 'none';
    }

    if (duration.value != '' && !isNaN(duration.value)) {
        durationErr.style.display = 'none';
    }

    if (startDate.value != '' && startDate.value >= new Date()) {
        startDateErr.style.display = 'none';
    }

    if (noOfDays.value != '' && noOfDays.value > 0) {
        daysErr.style.display = 'none';
    }
}


//enable time box
function enableTime(id) {
    var day = document.getElementById(id);
    var start = document.getElementById(`${id}-start-time`);
    var end = document.getElementById(`${id}-end-time`);
    if (day.checked) {
        start.removeAttribute('disabled');
        end.removeAttribute('disabled');
    }else{
        start.setAttribute('disabled', true);
        end.setAttribute('disabled', true);
    }
}