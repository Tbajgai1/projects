// create an event Listener on the button
// 1. select the button element

var btn = document.querySelector('.hamburger-menu');
var menu = document.querySelector('.menu');

// 2. Add a click event to the btn

btn.addEventListener('click', function() {
    //What happens when the btn is clicked goes here
    document.querySelector(".menu").classList.toggle('active-nav');
    document.querySelector(".hamburger-one").classList.toggle('hamburger-div1');
    document.querySelector(".hamburger-two").classList.toggle('hamburger-div2');
    document.querySelector(".hamburger-three").classList.toggle('hamburger-div3');

   
    }
)
