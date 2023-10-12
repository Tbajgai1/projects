const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('secs');

// grab date input 

inputDays = document.querySelector('#day');
inputMonth = document.querySelector('#months');
inputYear = document.querySelector("#year")
submitBtn = document.getElementById('submitBtn');

let tihar = '15 oct 2023';


    // Event listner

    submitBtn.addEventListener('click', function(e) {
   
        e.preventDefault();

        const inputDaysvalue = inputDays.value;
        const inputMonthvalue = inputMonth.value;
        const inputYearvalue = inputYear.value;


        inputFullDate = `${inputDaysvalue} ${inputMonthvalue} ${inputYearvalue}`;
        
        // console.log(inputFullDate); 
        // console.log(inputDaysvalue, inputMonthvalue, inputYearvalue);


        if(!inputFullDate) {
            tihar = tihar;
        }else {
            tihar = inputFullDate;
        }

    });



// format time
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;

    // also same as
        // if (time < 10) {
        //     time = (`0${time}`);
        //     return time;
        // } else {
        //     return time;
        // }
}


function tiharCountdown()  {
    const tiharDate = new Date(tihar);
    const currentDate = new Date();

    const daysRemaining = (tiharDate - currentDate) / 1000;
    // return dateRemaining;
    
    const days  = Math.floor(daysRemaining / 3600 / 24);
    const hours = Math.floor(daysRemaining / 3600) % 24;
    const minutes = Math.floor(daysRemaining / 60) % 60;
    const seconds  = Math.floor(daysRemaining % 60);

    // console.log(days, hours, minutes, seconds);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(minutes);
    secsEl.innerHTML = formatTime(seconds);

}

tiharCountdown();

setInterval(tiharCountdown, 1000);




// // Saving on local storage so doesnt change on refresh
//     if(localStorage.getItem('daysElm')) {
//         inputDays.value = localStorage.getItem('daysElm')
//     }

//     if(localStorage.getItem('yearElm')) {
//         inputYear.value = localStorage.getItem('yearElm')
//     }
//     if(localStorage.getItem('monthsElm')) {
//         inputMonth.value = localStorage.getItem('monthsElm')
//     }

// // event listner
//     inputDays.addEventListener('change', function () {
//         localStorage.setItem('daysElm', inputDays.value);
//     });


//     inputYear.addEventListener('change', function () {
//         localStorage.setItem('yearElm', inputYear.value);
//     });

//     inputMonth.addEventListener('change', function () {
//         localStorage.setItem('monthsElm', inputMonth.value);
//     });
  


