import lazysizes from 'lazysizes'

let H;
let screenFormat;
let wrapEl;
let headEl;
let introPanelEl;
let widthsArr = [];
let scrollerEl;
let introCaptionEl;
let introTxt;
let introPlayed = false;


function init() {
    document.documentElement.offsetWidth > 979 ? screenFormat = "desktop" : screenFormat = "mobile"; console.log( screenFormat)
    H = 0;
    headEl = document.getElementById("bannerandheader");
    wrapEl = document.querySelector(".gv-wrap-all");
    scrollerEl = document.getElementById("slideScroller")
    introCaptionEl = document.getElementById("introCappy");
    introPanelEl = document.querySelector(".gv-intro-panel");
    introTxt = document.querySelector(".gv-intro-panel-text");
    checkScreenSize();
}


function checkScreenSize() {
    screenFormat == "desktop" ? initDesktop() : initMobile();
}

function initMobile() {
    introPanelEl.classList.add("fade-half");
    console.log("mobile");
    //introCaptionEl.style.bottom = "0px";

    addListenersMobile();
}


function initDesktop() {

    let numSlides = [].slice.apply(document.getElementsByClassName('gv-wrap-all-slides')).length;
    console.log(document.getElementsByClassName('gv-wrap-all-slides'));
    let widthsArr = [];

    // [].slice.apply(document.getElementsByClassName('gv-slide-container')).forEach(slideEl => {

    //     [].slice.apply(slideEl.getElementsByTagName("img")).forEach(imgEl => {
    //         imgEl.onload = function() {  console.log(imgEl)  }
    //         // var event = triggerEvent(imgEl);
    //     })

    // });

    

    addListenersDesktop();

}

function triggerEvent(imgEl){
   //console.log( imgEl.classList['lazyload'] ); 
}

var noTweak = true;

function addListenersDesktop() {

    document.addEventListener("scroll", function() {

        if (notShownY(headEl)) {
            introTxt.classList.remove("fade-back-in");
            introTxt.classList.add("fade-out");
            introPanelEl.classList.remove("fade-half");
            introPanelEl.classList.add("fade-out");
        } else {
            introTxt.classList.remove("fade-out");
            introTxt.classList.add("fade-back-in");
            introPanelEl.classList.remove("fade-out");
            introPanelEl.classList.add("fade-half");
        }

    })

}

function addListenersMobile(){
    console.log("mob")
	document.addEventListener("scroll", function() {
        introPanelEl.classList.remove("fade-half");
        introPanelEl.classList.add("fade-out");
	})

}


function notShownY(el) {
    return (el.offsetHeight * -1) > el.getBoundingClientRect().top;
}

init();





// function scrollSlider(s) {
//     let newX = (0 - s[1]);
//     scrollerEl.style.transform = "translateX(" + (newX - document.documentElement.offsetWidth) + "px)";

//     //}

//     var a = wrapEl.scrollTop;
//     var b = wrapEl.offsetHeight - wrapEl.scrollTop;
//     // var c = a/b; //% of scroll --- https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
//     //console.log(a,b);

//     if ((headEl.getBoundingClientRect().top * -1) > 2000) {
//         introPlayed = false;
//     }
// }

// function scrollIntro(s) {
//     let newY = s[1];
//     let newPos = introCaptionEl.getBoundingClientRect().bottom;
//     newPos += newY;
//     if ((headEl.getBoundingClientRect().top * -1) > 2000) {
//         introPlayed = true;
//     } else {
//         introCaptionEl.style.transform = "translateY(300px)";

//         console.log(newPos)
//     }
// }

///////////////timer example


// wrapAll.addEventListener("scroll", doThisStuffOnScroll);

// var didScroll = false;

// document.onscroll = doThisStuffOnScroll;

// function doThisStuffOnScroll() {
//     didScroll = true;
// }

// setInterval(function() {
//     if(didScroll) {
//         didScroll = false;
//         console.log(wrapAll.scrollHeight - wrapAll.clientHeight);
//     }
// }, 100);