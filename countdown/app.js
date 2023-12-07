const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('secs');
const titleCoundDown = document.querySelector('.titleCountdown');


// grab date input 
inputDays = document.querySelector('#day');
inputMonth = document.querySelector('#months');
inputYear = document.querySelector("#year")
submitBtn = document.getElementById('submitBtn');


// Title Inpuit
titleDiv = document.querySelector('#titleH2');
titleCoundDown.innerText = 'Countdown to New Year';


// Set minimum on year input to uncoming year 
// Get the current year
const currentYear = new Date().getFullYear();
const yearInput = document.getElementById('year');
yearInput.setAttribute('min', currentYear + 1);
yearInput.setAttribute('value', currentYear + 1);




let year = 2024;

let newYear = `1 jan ${year}`;

// Event listner
submitBtn.addEventListener('click', function(e) {

    e.preventDefault();

    const inputDaysvalue = inputDays.value;
    const inputMonthvalue = inputMonth.value;
    const inputYearvalue = inputYear.value;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const messageDiv = document.querySelector('.erroMessage');
    let err = "Year must be larger than Current Year";


    // Custom title input
    const titleInput = titleDiv.value;
    if(titleInput) {
        titleH2 = titleInput
        titleCoundDown.innerText = `Countdown to ${titleH2}`;
    } 




    if(inputYearvalue <= currentYear) {
        messageDiv.innerText = err;
    }else {

        messageDiv.innerText = '';

        inputFullDate = `${inputDaysvalue} ${inputMonthvalue} ${inputYearvalue}`;

        if(!inputFullDate) {
            newYear = newYear;
        }else {
            newYear = inputFullDate;
        }
    }

});



// format time
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}


function newYearCountdown()  {
    const newYearDate = new Date(newYear);
    const currentDate = new Date();

    const daysRemaining = (newYearDate - currentDate) / 1000;
    // return dateRemaining;
        if(daysRemaining <= 0) {
            year++;
            newYear = `1 jan ${year}`
        }

        const days  = Math.floor(daysRemaining / 3600 / 24);
        const hours = Math.floor(daysRemaining / 3600) % 24;
        const minutes = Math.floor(daysRemaining / 60) % 60;
        const seconds  = Math.floor(daysRemaining % 60);

    
        daysEl.innerHTML = days;
        hoursEl.innerHTML = formatTime(hours);
        minsEl.innerHTML = formatTime(minutes);
        secsEl.innerHTML = formatTime(seconds);
   
}

newYearCountdown();

const timerInterval = setInterval(newYearCountdown, 1000);