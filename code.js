document.addEventListener("DOMContentLoaded", function() {
  const panels = document.querySelectorAll('.panel');

  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      removeActiveClasses();
      panel.classList.add('active');
    });
  });

  function removeActiveClasses() {
    panels.forEach(panel => {
      panel.classList.remove('active');
    });
  }
});

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function setTime() {
     const options = {
        timeZone: 'America/Argentina/Mendoza', //'Europe/Paris'
        hour12: false,
    };
    const time = new Date().toLocaleString('en-US', options);

    const timeParts = time.split(", ");
    const dateParts = timeParts[0].split("/");
    const month = parseInt(dateParts[0], 10) - 1;
    const date = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    const timeString = timeParts[1].split(":");
    const hours = parseInt(timeString[0], 10);
    const minutes = parseInt(timeString[1], 10);
    const seconds = parseInt(timeString[2], 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hoursForClock = hours % 12 || 12;

    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;
    const minuteAngle = (minutes / 60) * 360;
    const secondAngle = (seconds / 60) * 360;

    hourEl.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
    if (seconds === 0) {
        secondEl.style.display = 'block';
    } else if (seconds === 59) {
        secondEl.style.display = 'none';
    }
    /*if (minutes === 0) {
        minuteEl.style.display = 'block';
    } else if (minutes === 59) {
        minuteEl.style.display = 'none';
    }
    if (hours === 0) {
        hourEl.style.display = 'block';
    } else if (hours === 59) {
        hourEl.style.display = 'none';
    }*/
    

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    dateEl.innerHTML = `${days[new Date(year, month, date).getDay()]}, ${months[month]} ${date}`;
}
setTime()
setInterval(setTime, 1000)