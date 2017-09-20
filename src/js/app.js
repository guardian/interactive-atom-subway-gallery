import mainTemplate from '../templates/main.html'
import stationTemplate from '../templates/stationList.html'

import xr from 'xr'
import lazysizes from 'lazysizes'
import Handlebars from 'handlebars/dist/handlebars'

import { share } from './lib/share.js';

Handlebars.registerHelper({
        'getStations': function(opts) {
          var list = this.line_name.split(',');
    	    return list;
    	},
      'if_value': function(a, opts) {
    	    if(a != ""){
    	        return opts.fn(this);
    	    }
    	    return opts.inverse(this);
    	}
    });

Handlebars.registerPartial('stationList', stationTemplate)

var shareFn = share('Going downtown, the New York subway reaches Delhi - in pictures','https://gu.com/p/72vvx');

let screenFormat;
let windowWidth;
let isInApp = false;

if (!window) {
    windowWidth = 970;
    isInApp = true;
} else {
    windowWidth = window.innerWidth;
}
let isMobile = windowWidth < 980 ? true : false;

var isAndroidApp = (window.location.origin === "file://" && /(android)/i.test(navigator.userAgent)) ? true : false;


xr.get('https://interactive.guim.co.uk/docsdata-test/18bWPDl8t49K8iBXY1mdqfXgHxxfQcN9CpiSXnDWReuU.json').then((resp) => {
    let d = resp.data.sheets.Sheet1;
    var newObj = {};
    newObj.objArr = d;
    var compiledHTML = compileHTML(newObj);

    document.querySelector(".gv-interactive-container").innerHTML = compiledHTML;

    addListeners();

    adjustView();

});

function compileHTML(dataObj) {

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


function addListeners() {
    let i = 0;

    [].slice.apply(document.querySelectorAll('.swiper-icon')).forEach(swipeEl => {
        if (i > 0) {
                swipeEl.classList.remove('swiper-icon');
            } else {
                swipeEl.addEventListener('click', function(e) {
                    this.classList.add('fade-out');
                })

                swipeEl.addEventListener('touchstart', function(e) {

                    this.classList.add('fade-out');
                })
            }
        i++;

    });

    window.addEventListener("touchstart", function()  {
        if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {
                window.GuardianJSInterface.registerRelatedCardsTouch(true);
            }
    }, false);

    window.addEventListener("touchend", function()  {
        if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {
                window.GuardianJSInterface.registerRelatedCardsTouch(false);
            }
    }, false);

    [].slice.apply(document.querySelectorAll('.gv-share-container button')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');

        shareEl.addEventListener('click',() => shareFn(network));
    });

}

function adjustView(){
     if (isAndroidApp) { document.getElement(".gv-head-container").style.paddingTop = "60px";}
}


function notShownY(el) {
    return (el.offsetHeight * -1) > el.getBoundingClientRect().top;
}



function updatePageDate() {
    document.querySelector(".time-stamp").innerHTML = " ";

    let pubDate;

    if (window.guardian.config.page.webPublicationDate) { pubDate = new Date(window.guardian.config.page.webPublicationDate)
        var d = new Date(window.guardian.config.page.webPublicationDate)
        var n = d.getTimezoneOffset();
        console.log(n/60)
    let pubDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }; //, timeZone: 'UTC', timeZoneName: 'short'




    let dateStr = pubDate.toLocaleDateString('en-GB', pubDateOptions).split(",").join(" ").split("  ").join(" ");

    dateStr = dateStr+" GMT";

    document.querySelector(".time-stamp").innerHTML = dateStr;
    }


    //console.log(pubDate);
}
