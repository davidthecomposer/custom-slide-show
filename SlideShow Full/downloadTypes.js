//Everything

const jsBasicCode = 
`
/* jshint esversion: 6 */

//global variables to access elements. 
const paneTicker = document.querySelector('.pane-ticker');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const slideText = document.querySelectorAll('.slide-text');
const cog = document.querySelector('.cog');
const settings = document.querySelector('.settings');
const autoPlayButton = document.querySelector('.auto-play-btn');
const apTimer = document.querySelector('.ap-timer');
const height = document.querySelector('.height');
const width = document.querySelector('.width');
const resizeButton = document.querySelector('.resize');
const errorMessage = document.querySelector('.error-message');
const exit = document.querySelector('.exit');
const mainImages = document.querySelectorAll('.main-images');
const slideOptions = document.querySelector('.slide-options');
const slideText1 = document.querySelector('.slide-text');
const slideColumn = document.querySelector('.slide-column');
const slideToggleButton = document.querySelector('.slide-toggle-button');
const slideEditInactive = document.querySelector('.slide-edit-inactive');
const paneContainer = document.querySelector('.pane-container');
const textContainer = document.querySelector('.text-container');
const pauseActive = document.querySelector('.pause');
const checkBoxes = document.querySelectorAll('.checkbox');
const generate = document.querySelector('.generate');
const HTMLDownload = document.getElementById('html-output');
const CSSDownload = document.getElementById('css-output');
const JSDownload = document.getElementById('js-output');

//timerOn is for the autoPlay options lower down.
let timerOn;

//Add to these to customize animation text effects per slide. Must have one for each slide.
let textAnimations = ['center-long', 'top-right', 'center-short', 'top-left'];

//This is a list of all unique custom animation text effects. For populating the Select element.
let masterTextAnimations = ['center-long', 'top-right', 'center-short', 'top-left'];

//Add to these to customize animation slide effects per slide on init. 
let slideAnimations = ['slide-in', 'fade-in', 'oval-shrink', 'crazy'];

//This is a list of all unique slide animation effects. for populating the appropriate Select element.
let masterSlideAnimations = ['slide-in', 'fade-in', 'oval-shrink', 'crazy'];

// Core Functionality 

// Creates the first (green) tick that is active.
const createFirstTick = () => {
    let newFirstTick = document.createElement('img');
    newFirstTick.className = 'pane-tick';
    newFirstTick.src = 'images/activePane.svg';
    paneTicker.appendChild(newFirstTick);
};

//creates one tick as a helper function to paneTickInit. 
const createTick = () => {
    let newTick = document.createElement('img');
    newTick.classList.add('pane-tick');
    newTick.src = 'images/inactivePane.svg';
    paneTicker.appendChild(newTick);
};

//Calls either function above for whatever panes exist in HTML. 
const paneTickInit = () => {
    const panes = document.querySelectorAll('.pane');
    panes.forEach((pane) => {
        if (pane === panes[0]) {
            createFirstTick();
            pane.classList.add('active-panel');
        } else {
            createTick();
            pane.classList.add('invisible-panel');
        }
    });
};


// this is uesed when the user activates slide Editing.
const activePanelForward = (activeIndex, slideRows) => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const lastIndex = panes.length - 1;
    const mainImages = document.querySelectorAll('.main-images');


    if (panes[activeIndex] === panes[lastIndex]) {
        panes[0].setAttribute('src', slideRows[0].children[1].children[0].value);
        panes[0].style.height = slideRows[0].children[2].children[0].value;
        slideText[0].classList.remove('white', 'black');
        panes[0].style.width = slideRows[0].children[3].children[0].value;
        slideText[0].style.fontSize = slideRows[0].children[4].children[0].value;
        slideText[0].style.color = slideRows[0].children[5].children[0].value;
        slideText[0].classList.add(slideRows[0].children[6].children[0].value);
        slideText[0].innerHTML = slideRows[0].children[8].children[0].value;
        slideText[lastIndex].classList.remove(slideRows[lastIndex].children[6].children[0].value);
        slideText[lastIndex].classList.add('invisible-text');
        mainImages[lastIndex].classList.remove(slideRows[lastIndex].children[7].children[0].value);
        mainImages[0].classList.add(slideRows[0].children[7].children[0].value);

    } else {
        panes[activeIndex + 1].setAttribute('src', slideRows[activeIndex + 1].children[1].children[0].value);
        panes[activeIndex + 1].style.height = slideRows[activeIndex + 1].children[2].children[0].value;
        slideText[activeIndex + 1].classList.remove('white', 'black');
        panes[activeIndex + 1].style.width = slideRows[activeIndex + 1].children[3].children[0].value;
        slideText[activeIndex + 1].innerHTML = slideRows[activeIndex + 1].children[8].children[0].value;
        slideText[activeIndex + 1].style.fontSize = slideRows[activeIndex + 1].children[4].children[0].value;
        slideText[activeIndex + 1].style.color = slideRows[activeIndex + 1].children[5].children[0].value;
        slideText[activeIndex + 1].classList.add(slideRows[activeIndex + 1].children[6].children[0].value);
        slideText[activeIndex].classList.remove(slideRows[activeIndex + 1].children[6].children[0].value);
        slideText[activeIndex].classList.add('invisible-text');
        mainImages[activeIndex].classList.remove(slideRows[activeIndex].children[7].children[0].value);
        mainImages[activeIndex + 1].classList.add(slideRows[activeIndex + 1].children[7].children[0].value);
    }

};
//Progresses forward through panes when clicking forward button.
const nextPane = () => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = document.querySelectorAll('.pane-tick');
    const slideAniLast = slideAnimations[lastIndex];
    const slideAniFirst = slideAnimations[0];
    const slideAniActive = slideAnimations[activeIndex];
    const slideAniNext = slideAnimations[activeIndex + 1];
    const slideRows = document.querySelectorAll('.slide-row');

    if (settings.style.zIndex != '4') {
        settings.style.opacity = '0';
    }
    // Special case of last slide moving back to first
    if (panes[activeIndex] === panes[lastIndex]) {
        panes[lastIndex].classList.remove('active-panel', slideAniLast);
        panes[lastIndex].classList.add('invisible-panel');
        panes[0].classList.remove('invisible-panel');
        panes[0].classList.add('active-panel', slideAniFirst);
        slideText[lastIndex].classList.remove(textAnimations[lastIndex]);
        slideText[lastIndex].classList.add('invisible-text');
        slideText[0].classList.remove('invisible-text');
        slideText[0].classList.add(textAnimations[0]);
        paneTick[lastIndex].outerHTML = '<img class="pane-tick" src="images/inactivePane.svg"></img>';
        paneTick[0].outerHTML = '<img class="pane-tick" src="images/activePane.svg"></img>';
        if (slideToggleButton.src.includes('images/toggleOn.svg')) {
            activePanelForward(activeIndex, slideRows);
        }
        // all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel', slideAniActive);
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex + 1].classList.remove('invisible-panel');
        panes[activeIndex + 1].classList.add('active-panel', slideAniNext);
        slideText[activeIndex].classList.remove(textAnimations[activeIndex]);
        slideText[activeIndex].classList.add('invisible-text');
        slideText[activeIndex + 1].classList.remove('invisible-text');
        slideText[activeIndex + 1].classList.add(textAnimations[activeIndex + 1]);
        paneTick[activeIndex].outerHTML = '<img class="pane-tick" src="images/inactivePane.svg"></img>';
        paneTick[activeIndex + 1].outerHTML = '<img class="pane-tick" src="images/activePane.svg"></img>';
        if (slideToggleButton.src.includes('images/toggleOn.svg')) {
            activePanelForward(activeIndex, slideRows);
        }
    }


};

//Progresses backward through panes when clicking backward button.
const previousPane = () => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = document.querySelectorAll('.pane-tick');
    const slideAniLast = slideAnimations[lastIndex];
    const slideAniFirst = slideAnimations[0];
    const slideAniActive = slideAnimations[activeIndex];
    const slideAniPrev = slideAnimations[activeIndex - 1];
    if (settings.style.zIndex != '4') {
        settings.style.opacity = '0';
    }
    //special case of first slide moving backward to last
    if (panes[activeIndex] === panes[0]) {
        panes[0].classList.remove('active-panel', slideAniFirst);
        panes[0].classList.add('invisible-panel');
        slideText[0].classList.remove(textAnimations[0]);
        slideText[0].classList.add('invisible-text');
        panes[lastIndex].classList.remove('invisible-panel');
        panes[lastIndex].classList.add('active-panel', slideAniLast);
        slideText[lastIndex].classList.remove('invisible-text');
        slideText[lastIndex].classList.add(textAnimations[lastIndex]);
        paneTick[0].setAttribute('src', "images/inactivePane.svg" );
        paneTick[lastIndex].setAttribute('src', "images/activePane.svg");
        //all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel', slideAniActive);
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex - 1].classList.remove('invisible-panel');
        panes[activeIndex - 1].classList.add('active-panel', slideAniPrev);
        slideText[activeIndex].classList.remove(textAnimations[activeIndex]);
        slideText[activeIndex].classList.add('invisible-text');
        slideText[activeIndex - 1].classList.remove('invisible-text');
        slideText[activeIndex - 1].classList.add(textAnimations[activeIndex - 1]);
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[activeIndex - 1].setAttribute('src', "images/activePane.svg");
    }

};
//activates the arrow keys on the keyboard to control manual navigation.
const filterArrows = (event) => {
    if (event.keyCode === 37) {
        previousPane();
    } else if (event.keyCode === 39) {
        nextPane();
    }
};`