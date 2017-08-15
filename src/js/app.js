import mainTemplate from '../templates/main.html'

import xr from 'xr'
import lazysizes from 'lazysizes'
import Handlebars from 'handlebars/dist/handlebars'

let screenFormat;

xr.get('https://interactive.guim.co.uk/docsdata-test/18bWPDl8t49K8iBXY1mdqfXgHxxfQcN9CpiSXnDWReuU.json').then((resp) => {
    let d = resp.data.sheets.Sheet1;
    var newObj = {};
    newObj.objArr = d;
    var compiledHTML = compileHTML(newObj);
    
    document.querySelector(".gv-interactive-container").innerHTML = compiledHTML;

    updateView();

});

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


function updateView(){
    let i = 0;
    [].slice.apply(document.querySelectorAll('.swiper-icon')).forEach(swipeEl => {

        if(i > 0){ 
            swipeEl.classList.remove('swiper-icon');            
        }else{
            swipeEl.addEventListener('click', function(e) {
             
                this.classList.add('fade-out');
            })

            swipeEl.addEventListener('touchstart', function(e) {
             
                this.classList.add('fade-out');
            })
        }

        i++;
         //swipeEl.style.backgroundColor = "#"+teamDetailsObj.bgrColor; 
    });
}




function notShownY(el) {
    return (el.offsetHeight * -1) > el.getBoundingClientRect().top;
}


