
var w = window;

var curScroll = prevScroll = w.requestAnimationFrame || function(callback){window.setTimeout(callback, 1000/60)};
var curDirection = prevDirection = "none";


var checkScroll = function () {
    curScroll = w.scrollY;
    if (curScroll < prevScroll){
        curDirection = "up";
    } else {
        curDirection = "down";

    }
    prevScroll = curScroll;
    prevDirection = curDirection;

    toggleNav();

};

var toggleNav = function () {

    const nav = document.getElementById("navigation");
    console.log(curDirection)

    if (curDirection == "up"){
        nav.classList.add('showing')
    } else {
        nav.classList.remove('showing')
    }
}

window.addEventListener('scroll', checkScroll)