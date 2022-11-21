//onload
let eventId;
window.onload = () => {
    eventId = sessionStorage.getItem('eventId');
    fetchEvent(eventId);
}

//elements
var eventName = document.querySelector('#eventName');
var createrName = document.querySelector('#createrName');
var eventDuration = document.querySelector('#eventDuration');
var formeventName = document.querySelector('#event-Name');
var formcreaterName = document.querySelector('#creater-Name');
var formeventDuration = document.querySelector('#event-Duration');
var selectedDate = document.querySelector('#selectedDate');
var slotError = document.querySelector('#slot-err');
var bookingForm = document.querySelector('#bookingform');
var slotTime = document.querySelector('#slottime');
var slotDate = document.querySelector('#slotdate');

let datedetails; // start and end date variable
let workingdays;
let slotsOfEvent; //slots of the event
var duration;

//fetch the event details
const fetchEvent = async (eventId) => {
    try {
        let event = await axios.get(`/events/event/${eventId}`); //fetch event by slots
        slotsOfEvent = await axios.get(`/slots/${eventId}`);
        slotsOfEvent = slotsOfEvent.data.slots;
        event = event.data.event[0];
        displayDetails(event);
        datedetails = genDate(event.startDate, event.noOfDays);
        workingdays = event.workingDays;
        duration = event.duration;
        renderCalendar(event);
    } catch (error) {
        console.log(error);
    }
}

//display the user details

const displayDetails = (event) => {
    var time = getTime(event.duration, event.durationFormat);
    eventName.innerHTML= event.eventName;
    createrName.innerHTML = event.createrName;
    eventDuration.innerHTML = `<i class="fa-regular fa-clock"></i> ${time.duration} ${time.format}`;
    formeventName.innerHTML = event.eventName;
    formcreaterName.innerHTML = event.createrName;
    formeventDuration.innerHTML = `<i class="fa-regular fa-clock"></i> ${time.duration} ${time.format}`;
}

//time generation function
const getTime = (duration, format) => {
    duration = format == 'hr' ? Math.trunc(duration/60) : duration;
    if (format == 'hr') {
        if (duration > 1) {
            format = 'Hours';
        }else{
            format = 'Hour';
        }
    }else{
        format = 'Minutes';
    }

    return {
        'duration' : duration,
        'format' : format,
    }
}

//Calendar js
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons i");
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
              
const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const renderCalendar = () => {
    
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        var current = new Date(currYear, currMonth, i);
        var yestDay = new Date();
        yestDay.setDate(yestDay.getDate()-1);
        if (current >= datedetails.startDate && current <= datedetails.endDate && weekDays[current.getDay()] in workingdays && current > yestDay) {
            liTag += `<li class="${isToday} available" onclick="showSlots(${i})">${i}</li>`;
        }else{
            liTag += `<li class="${isToday}">${i}</li>`;
        }
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

//date genarate function
const genDate = (start, noOfDays) => {
    var startDate = new Date(start);
    var newDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    var milisec = (noOfDays * 1000 * 3600 * 24) + newDate.getTime();
    var endDate = new Date(milisec);
    return {
        "startDate" : newDate,
        "endDate" : endDate,
    }
}

//showing the slots
let theDate;
const showSlots = (value) => {
    theDate = new Date(currYear, currMonth, value);
    var day = weekDays[theDate.getDay()];
    selectedDate.innerHTML = `${value} ${monthShort[currMonth]} ${currYear}`;
    var start = parseInt(workingdays[day]['start-time'].substr(0,2)) * 60 + parseInt(workingdays[day]['start-time'].substr(3, 5));
    var end = parseInt(workingdays[day]['end-time'].substr(0,2)) * 60 + parseInt(workingdays[day]['end-time'].substr(3, 5)) * 60;
    var meridiem = ' AM';
    var slots = document.getElementById('slots');
    slots.innerHTML = '';
    for (let i = start; i <= end; i += duration){
        if (i >= 720) {
            meridiem = ' PM';
        }
        var time = '';
        if (Math.trunc(i/60) > 12) {
            time += Math.trunc(i/60)-12;
        }else{
            time += Math.trunc(i/60);
        }
        time += ':';
        if (i%60 == 0) {
            time += '00';
        }else{
            time += i % 60;
        }
        time += meridiem;

        var input_ele = document.createElement('input');
        input_ele.setAttribute('type','radio');
        input_ele.setAttribute('name','times');
        input_ele.setAttribute('id',time);
        input_ele.setAttribute('value',time);
        if (checkIsBooked(time, theDate)) {
            input_ele.disabled = true;
        }
        var label_ele = document.createElement('label');
        label_ele.setAttribute('for',time);
        label_ele.innerText = time;

        
        slots.appendChild(input_ele);
        slots.appendChild(label_ele);
    }
}


//checking the slots is booked or not

const checkIsBooked = (timeValue, dateValue) => {
    for (let i = 0; i < slotsOfEvent.length; i++) {
        var tempDate = new Date(slotsOfEvent[i].slotDate);
        if (slotsOfEvent[i].slotTime == timeValue && tempDate.getDate() == dateValue.getDate() && tempDate.getMonth() == dateValue.getMonth()) {
            return true;
        }
    }
    //console.log(timeValue, dateValue);
    return false;
}

//form
var form = document.querySelector('.form');
var cancelBtn = document.querySelector('#cancel');
var userForm = document.querySelector('#userDetail');
var formbutton = document.querySelector('.formbuttons');

//result
var successmsg = document.querySelector('.successmsg');
var bookingError = document.querySelector('#bookingerror');

//booking form trigger

var popup = document.querySelector('.popup');

bookingForm.addEventListener('click', () => {
    if (document.querySelector('input[name="times"]:checked') != null) {
        slotError.style.display = 'none';
        popup.style.display = 'block';
        slotTime.innerHTML = document.querySelector('input[name="times"]:checked').value;
        slotDate.innerHTML = `${theDate.getDate()} ${monthShort[currMonth]} ${currYear}`;
    }else{
        slotError.style.display = 'block';
    }
});

//cancel button
cancelBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    nameErr.style.display = 'none';
    emailErr.style.display = 'none';
    mblNoErr.style.display = 'none';
    userName.value = '';
    email.value = '';
    mobilNo.value = '';
})

//form submit
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (inputCheck()) {
        try {
            await axios.post('/slots/bookslot',{
                eventId : eventId,
                slotDate : theDate,
                slotTime : document.querySelector('input[name="times"]:checked').value,
                name : userName.value,
                email : email.value,
                contact : mobilNo.value
            });
            userForm.style.display = 'none';
            successmsg.style.display = 'block';
            setTimeout(() => {
                location.href = '../pages/events.html';
            }, 2000);
        } catch (error) {
            bookingError.style.display = 'block';
        }
    }
})


//form elements
//input fields
var userName = document.querySelector('#name');
var email = document.querySelector('#email');
var mobilNo = document.querySelector('#mobilNo');

//form error
var nameErr = document.querySelector('#nameErr');
var emailErr = document.querySelector('#emailErr');
var mblNoErr = document.querySelector('#mblNoErr');

//checking the create form inputs are valid
function inputCheck() {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var phoneno = /^\d{10}$/;
    var check = true;
    if (userName.value == '') {
        nameErr.style.display = 'block';
        check = false;
    }
    if (!email.value.match(validRegex)) {
        emailErr.style.display = 'block';
        check = false;
    }
    if (mobilNo.value.length < 10) {
        mblNoErr.style.display = 'block';
        check = false;
    }
    if (!mobilNo.value.match(phoneno)) {
        mblNoErr.innerHTML = 'Please provide valid number.'
        mblNoErr.style.display = 'block';
        check = false;
    }
    if (check) {
        nameErr.style.display = 'none';
        emailErr.style.display = 'none';
        mblNoErr.style.display = 'none';
    }
    return check;
}
//onchange for create form
function OnChange(){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userName.value != '') {
        nameErr.style.display = 'none';
    }
    if (email.value.match(validRegex)) {
        emailErr.style.display = 'none';
    }
    if (mobilNo.value.length == 10) {
        mblNoErr.style.display = 'none';
    }
}