//create event button
const create = document.querySelector('#create');

create.addEventListener('click', () => {
    location.href = '../pages/createevent.html';
})

//Onload
var createrId;
window.onload = () => {
    if (sessionStorage.getItem('userId') == undefined) {
        location.href = '../index.html';
    }
    createrId = JSON.parse(sessionStorage.getItem('userId'));
    sessionStorage.removeItem('editEventId');
    fetchEvents(createrId);
    fetchUser(createrId);
}

//elemnts
var eventsCon = document.querySelector('.events'); //event container
var eventCount = document.querySelector('#eventcount'); //event count
var profileBtn = document.querySelector('#profile'); //profile button
var profileCard =  document.querySelector('.profileCard'); //profile card
var logoutBtn =  document.querySelector('#logout-btn'); //logout confg button
var popup = document.querySelector('.popup'); //popup
var popupContent = document.querySelector('.content'); //popup content
var userName = document.querySelector('#userName');
var userEmail = document.querySelector('#userEmail');



const fetchEvents = async (createrId) => {
    try {
        var events = await axios.get(`/events/${createrId}`);
        displayEvents(events.data.events);
    } catch (error) {
        console.log(error);
    }
}

const fetchUser = async (userId) => {
    try {
        var user = await axios.get(`/account/userdetail/${userId}`);
        user = user.data.user;
        userName.innerHTML = user.name;
        userEmail.innerHTML = user.email;
    } catch (error) {
        console.log(error);
    }
}

const displayEvents = (events) => {
    if (events.length > 0) {
        eventsCon.innerHTML = '';
        eventCount.innerHTML = events.length;
    }
    var htmlevents = events.map((event) => {
        var date = genDate(event.startDate, event.noOfDays);
        var time = getTime(event.duration, event.durationFormat);
        return `
        <div class="event" id="${event._id}">
            <h4>${event.eventName}</h4>
            <div class="dateinfo">
                <p><i class="fa-regular fa-calendar"></i> From <span>${date.startDate} ${date.startMon} ${date.startYear}</span></p>
                <p><i class="fa-regular fa-calendar"></i> To <span>${date.endDate} ${date.endMon} ${date.endYear}</span></p>
            </div>
            <div class="timeinfo">
                <p><i class="fa-regular fa-clock"></i> <span>${time.duration} ${time.format}</span></p>
            </div>
            <div class="event-btns">
                <button id="details" onclick="eventDetail('${event._id}')">Details</button>
                <button id="edit" onclick="editEvent('${event._id}')">Edit</button>
                <button id="delete" onclick="deleteEvent('${event._id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
    }); 
    for (let i = 0; i < htmlevents.length; i++) {
        eventsCon.innerHTML += htmlevents[i];
    }
    
}


//months
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//date genarate function
const genDate = (startDate, noOfDays) => {
    var date = new Date(startDate);
    var milisec = (noOfDays * 1000 * 3600 * 24) + date.getTime();
    var endDate = new Date(milisec);
    return {
        "startDate" : date.getDate(),
        "startMon" : months[date.getMonth()],
        "startYear" : date.getFullYear(),
        "endDate" : endDate.getDate(),
        "endMon" : months[endDate.getMonth()],
        "endYear" : endDate.getFullYear(),
    }
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


//logout process
var isVisible = false;
profileBtn.addEventListener('click', () => {
    if (!isVisible) {
        profileCard.style.display = 'block';
        isVisible = !isVisible;
    }else{
        profileCard.style.display = 'none';
        isVisible = !isVisible;
    }
});

logoutBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    popupContent.innerHTML = `
        <h1>Are you sure want to logout?</h1>
        <div class="popup-btns">
            <button id="cancel">Cancel</button>
            <button id="logout">Logout</button>
        </div>`;
    
    var cancel = document.querySelector('#cancel'); //cancek button for logout
    var logout = document.querySelector('#logout'); //logout button

    cancel.addEventListener('click', () => {
        popup.style.display = 'none';
        profileCard.style.display = 'none';
    });
    
    //logout
    logout.addEventListener('click', () => {
        sessionStorage.removeItem('userId');
        location.href = '../index.html';
    })
});

var prevClick = '';
//event details

const eventDetail = async (eventId) => {
    try {
        var slots = await axios.get(`/slots/${eventId}`);
        slots = slots.data.slots;
        displaySlots(slots);
        if (prevClick != '') {
            var prev = document.getElementById(prevClick);
            prev.style.background = '#fff';
        }
        var selectdEvent = document.getElementById(eventId);
        selectdEvent.style.background = '#EEEEEE';
        prevClick = eventId;
    } catch (error) {
        console.log(error);
    }
}

//action elements
var slotsInfo = document.querySelector('.slotinfo');
var slotsCon = document.querySelector('#slots');


const displaySlots = (slots) => {
    slotsCon.innerHTML = '';
    if (slots.length < 1) {
        slotsInfo.style.display = 'block';
        slotsCon.innerHTML = `
            <div class="slotinfo">
            <p>No slots are booked.</p>
            </div>`;
        return;
    }
    slotsInfo.style.display = 'none';
    slotsCon.classList.remove('center');
    slotsCon.classList.add('grid');
    var htmlslots = slots.map((slot) => {
        var date = new Date(slot.slotDate);
        return `<div class="slot">
            <div class="customerinfo">
                <h3>${slot.name}</h3>
                <p><i class="fa-solid fa-envelope"></i>${slot.email}</p>
                <p><i class="fa-solid fa-phone"></i> ${slot.contact}</p>
            </div>
            <div class="time">
                <i class="fa-regular fa-clock"></i>
                <h3>${slot.slotTime}</h3>
                <p>${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
            </div>
            </div>`
    });

    for (let i = 0; i < htmlslots.length; i++) {
        slotsCon.innerHTML += htmlslots[i];
    }
}

//check the event that have any booked events

const isBooked = async (eventId) => {
    try {
        var slots = await axios.get(`/slots/${eventId}`);
    } catch (error) {
        console.log(error);
    }
    if (slots.data.slots.length == 0) {
        return true;
    }
    return false;
}

//edit event

const editEvent = async (eventId) => {
    if (await isBooked(eventId)) {
        sessionStorage.setItem('editEventId', eventId);
        location.href = '../pages/createevent.html';
    }else{
        popupContent.innerHTML = `
        <h3>Can not edit this event.</h3>
        <p>Some slots are booked in this event.</p>
        <div class="popup-btns">
            <button id="ok">Okey</button>
        </div>`;
        popup.style.display = 'block';
        document.querySelector('#ok').addEventListener('click',() => {
            popup.style.display = 'none';
        });
    }
}

//delete event

const deleteEvent = async (eventId) => {
    if (await isBooked(eventId)) {
        popupContent.innerHTML = `
        <h3>Are you sure want to delete?</h3>
        <p>This can not be undone.</p>
        <div class="popup-btns">
            <button id="cancel">Cancel</button>
            <button id="deletebtn">Delete</button>
        </div>`;
        popup.style.display = 'block';
        document.querySelector('#deletebtn').addEventListener('click', async() => {
            await axios.delete(`/events/event/${eventId}`);
            popup.style.display = 'none';
            window.location.reload();
        });
        cancel.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }else{
        popupContent.innerHTML = `
        <h3>Can not delete this event.</h3>
        <p>Some slots are booked in this event.</p>
        <div class="popup-btns">
            <button id="ok">Okey</button>
        </div>`;
        popup.style.display = 'block';
        document.querySelector('#ok').addEventListener('click',() => {
            popup.style.display = 'none';
        });
    }
}