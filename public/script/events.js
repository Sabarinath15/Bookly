//onload
window.onload = () => {
    sessionStorage.removeItem('eventId');
    fetchEvents();
}

//elements

var eventsCon = document.querySelector('.events'); //event container
var info = document.querySelector('.info'); //info

const fetchEvents = async () => {
    try {
        var events = await axios.get('/events/');
        events = events.data.data.Items;
        displayEvents(events);
    } catch (error) {
        console.log(error);
    }
}

const displayEvents = (events) => {
    if (events.length > 0) {
        info.style.display = 'none';
        eventsCon.classList.remove('center');
        eventsCon.classList.add('grid');
    }
    var htmlevents = events.map((event) => {
        var time = getTime(event.event.duration, event.event.durationFormat);
        return `
        <div class="event">
            <div class="title">
                <h2>${event.event.eventName}</h2>
            </div>
            <div class="text">
                <h4>${event.event.createrName}</h4>
                <p><i class="fa-regular fa-clock"></i> ${time.duration} ${time.format}</p>
            </div>
            <div class="button">
                <button onclick="showEvent('${event.id}')">Book</button>
            </div>
        </div>`
    });

    for (let i = 0; i < htmlevents.length; i++) {
        eventsCon.innerHTML += htmlevents[i];
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

//showevent

const showEvent = (id) => {
    sessionStorage.setItem('eventId', id);
    location.href = '../pages/event.html';
}