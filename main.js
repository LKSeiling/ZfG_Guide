
var w = window;
var d = document;

var curHeight = prevHeight = w.outerHeight;;
var curScroll = prevScroll = w.requestAnimationFrame || function(callback){window.setTimeout(callback, 1000/60)};
var curDirection = prevDirection = "none";
var curPos = newPos = 0;
var navScroll = false;

var headings_all = d.getElementsByClassName("nav-section");
const headings = []

var calcHeadings = function () {

    var bodytop = document.body.getBoundingClientRect().top;

    for (i = 0; i < headings_all.length; i++) {
        let level = headings_all[i].classList[1];
        let elemId = headings_all[i].id;
        let topPos = headings_all[i].getBoundingClientRect().top - bodytop;
        let botPos = headings_all[i].getBoundingClientRect().bottom - bodytop;
        headings.push({i, elemId, level,topPos,botPos});
    }
};



calcHeadings();


var nav_nxtChptr = d.getElementById("nav-next");
var nav_prvChptr = d.getElementById("nav-prev");
var nav_nxtHeading = d.getElementById("nav-forward");
var nav_prvHeading = d.getElementById("nav-rewind");
var nav_index = d.getElementById("nav-list");

var checkScroll = function () {
    curScroll = w.scrollY;
    curHeight = w.outerHeight;

    if (curHeight != prevHeight){
        prevHeight = curHeight;
    } 

    if (!navScroll){
        // update menu visibility based on scroll
        if (curScroll < prevScroll){
            curDirection = "up";
        } else {
            curDirection = "down";

        }
        prevScroll = curScroll;
        prevDirection = curDirection;
        toggleNav();
    } else {
        navScroll = !navScroll;
    };
    

    // update menu links based on scroll

    trackPosition();

};

var toggleNav = function () {

    const nav = document.getElementById("navigation");

    if (curDirection == "up"){
        nav.classList.add('showing');
    } else {
        nav.classList.remove('showing');
    };
}

var trackPosition = function () {
    calcHeadings();
    possPositions = checkPosition();
    newPos = possPositions[possPositions.length -1].i;
    if (newPos !== curPos){
        curPos = newPos;
    }
}

var checkPosition = function () {
    let view_bottom = curScroll + curHeight;
    let possObjects = headings.filter(heading => (heading.topPos <= view_bottom) && (heading.botPos >= curScroll));

    return possObjects;   
}

var navigate = function(navDirection){
    if (navDirection != 0){

        if (navDirection === 2){
            var nextHeadings = headings.filter(heading => (heading.level === "level1") && (heading.topPos > curScroll+5));
        } else if (navDirection === 1) {
            var nextHeadings = headings.filter(heading => (heading.topPos > curScroll+5));
        } else  if (navDirection === -1){
            var nextHeadings = headings.filter(heading => (heading.topPos < curScroll-5));
        } else if (navDirection === -2) {
            var nextHeadings = headings.filter(heading => (heading.level === "level1") && (heading.topPos < curScroll-5));
        }

        if (nextHeadings.length > 0 && navDirection > 0) {
            var idNext = nextHeadings[0].i;
        } else if (nextHeadings.length > 0 && navDirection < 0) { 
            var idNext = nextHeadings[nextHeadings.length -1].i;
        } 
        
        if (nextHeadings.length > 0) {
            let nextNavSec = headings.filter(heading => (heading.i === idNext));
            window.scrollTo(0, nextNavSec[0].topPos);
        } else {
        // do nothing
        }
    } else {
        let nextNavSec = headings.filter(heading => (heading.i === 1));
        window.scrollTo(0, nextNavSec[0].topPos);
    } 
    navScroll = true;
}     


window.addEventListener('scroll', checkScroll);

nav_prvChptr.addEventListener('click', function(){navigate(-2)});
nav_prvHeading.addEventListener('click', function(){navigate(-1)});
nav_index.addEventListener('click', function(){navigate(0)});
nav_nxtHeading.addEventListener('click', function(){navigate(1)});
nav_nxtChptr.addEventListener('click', function(){navigate(2)});
