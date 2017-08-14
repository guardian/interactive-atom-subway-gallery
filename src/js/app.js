import mainTemplate from '../templates/main.html'

import xr from 'xr'
import lazysizes from 'lazysizes'
import Handlebars from 'handlebars/dist/handlebars'

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

console.log(mainTemplate)

xr.get('https://interactive.guim.co.uk/docsdata-test/18bWPDl8t49K8iBXY1mdqfXgHxxfQcN9CpiSXnDWReuU.json').then((resp) => {
    let d = resp.data.sheets.Sheet1;

    var newObj = {};
    newObj.objArr = d;

    var compiledHTML = compileHTML(newObj);
    
    document.querySelector(".gv-interactive-container").innerHTML = compiledHTML;

});

function getObjArr(o) {
    o.map((obj) => {
        console.log(obj);
    })

    return o;
};


function compileHTML(dataObj) {

    console.log(dataObj)

    Handlebars.registerHelper('html_decoder', function(text) {
        var str = unescape(text).replace(/&amp;/g, '&');
        return str;
    });

    Handlebars.registerHelper('uppercase', function(options) {  
        return options.fn(this).toUpperCase();
    });


    var content = Handlebars.compile(
        mainTemplate, {
            compat: true
        }
    );

    var newHTML = content(dataObj);

    return newHTML;

}




function initApp() {
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
   //introPanelEl.classList.add("fade-half");
    console.log("mobile");
    //introCaptionEl.style.bottom = "0px";

    //addListenersMobile();
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


