/* jshint esversion: 6 */

//global variables to access elements. 
const paneTicker = document.querySelector('.pane-ticker');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const slideText = document.querySelectorAll('.slide-text');
const mainImages = document.querySelectorAll('.main-images');
const slideToggleButton = document.querySelector('.slide-toggle-button');
const slideEditInactive = document.querySelector('.slide-edit-inactive');
const paneContainer = document.querySelector('.pane-container');
const textContainer = document.querySelector('.text-container');
const pauseActive = document.querySelector('.pause');
const slideAnimations = ['slide-in','fade-in','oval-shrink','crazy'];
const textAnimations = ['center-long','top-right','center-short','top-left'];

//timerOn is for the autoPlay options lower down.
let timerOn;


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

//activates the arrow keys on the keyboard to control manual navigation.
const filterArrows = (event) => {
    if (event.keyCode === 37) {
        previousPane();
    } else if (event.keyCode === 39) {
        nextPane();
    }
};

//Progresses forward through panes when clicking forward button.
const nextPane = () => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = document.querySelectorAll('.pane-tick');
    
    // Special case of last slide moving back to first
    if (panes[activeIndex] === panes[lastIndex]) {
        panes[lastIndex].classList.remove('active-panel');
        panes[lastIndex].classList.add('invisible-panel');
        panes[0].classList.remove('invisible-panel');
        panes[0].classList.add('active-panel');
        slideText[lastIndex].classList.remove(textAnimations[lastIndex]);
        slideText[lastIndex].classList.add('invisible-text');
        slideText[0].classList.remove('invisible-text');
        slideText[0].classList.add(textAnimations[0]);
        paneTick[lastIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[0].setAttribute('src', "images/activePane.svg" );
        mainImages[lastIndex].classList.remove(slideAnimations[lastIndex]);
        mainImages[lastIndex].classList.add('invisible-panel');
        mainImages[0].classList.remove('invisible-panel');
        mainImages[0].classList.add(slideAnimations[0]);

        // all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel');
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex + 1].classList.remove('invisible-panel');
        panes[activeIndex + 1].classList.add('active-panel');
        slideText[activeIndex].classList.add('invisible-text');
        slideText[activeIndex].classList.remove(textAnimations[activeIndex]);
        slideText[activeIndex + 1].classList.remove('invisible-text');
        slideText[activeIndex + 1].classList.add(textAnimations[activeIndex + 1]);
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[activeIndex + 1].setAttribute('src', "images/activePane.svg" );
        mainImages[activeIndex].classList.remove(slideAnimations[activeIndex]);
        mainImages[activeIndex].classList.add('invisible-panel');
        mainImages[activeIndex + 1].classList.remove('invisible-panel');
        mainImages[activeIndex + 1].classList.add(slideAnimations[activeIndex + 1]);
    }
};

//Progresses backward through panes when clicking backward button.
const previousPane = () => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = document.querySelectorAll('.pane-tick');
    
//special case of first slide moving backward to last
    if (panes[activeIndex] === panes[0]) {
        panes[0].classList.remove('active-panel');
        panes[0].classList.add('invisible-panel');
        slideText[0].classList.remove(textAnimations[0]);
        slideText[0].classList.add('invisible-text');
        panes[lastIndex].classList.remove('invisible-panel');
        panes[lastIndex].classList.add('active-panel');
        slideText[lastIndex].classList.remove('invisible-text');
        slideText[lastIndex].classList.add(textAnimations[lastIndex]);
        paneTick[0].setAttribute('src', "images/inactivePane.svg" );
        paneTick[lastIndex].setAttribute('src', "images/activePane.svg");
        mainImages[0].classList.remove(slideAnimations[0]);
        mainImages[0].classList.add('invisible-panel');
        mainImages[lastIndex].classList.remove('invisible-panel');
        mainImages[lastIndex].classList.add(slideAnimations[lastIndex]);
        //all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel');
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex - 1].classList.remove('invisible-panel');
        panes[activeIndex - 1].classList.add('active-panel');
        slideText[activeIndex].classList.remove(textAnimations[activeIndex]);
        slideText[activeIndex].classList.add('invisible-text');
        slideText[activeIndex - 1].classList.remove('invisible-text');
        slideText[activeIndex - 1].classList.add(textAnimations[activeIndex - 1]);
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[activeIndex - 1].setAttribute('src', "images/activePane.svg");
        mainImages[activeIndex].classList.remove(slideAnimations[activeIndex]);
        mainImages[activeIndex].classList.add('invisible-panel');
        mainImages[activeIndex - 1].classList.remove('invisible-panel');
        mainImages[activeIndex - 1].classList.add(slideAnimations[activeIndex - 1]);
    }
};

const autoPlayControl = (event) => {

    if (event === undefined) {
        timerOn = setInterval(nextPane, Number(3000));
    } else if (event.target.getAttribute('src') === 'images/pause.svg') {
        clearInterval(timerOn);
        event.target.setAttribute('src', 'images/play.svg')
    } else if (event.target.getAttribute('src') === 'images/play.svg') {
        timerOn = setInterval(nextPane, Number(3000));
        event.target.setAttribute('src', 'images/pause.svg');
    }

};

paneTickInit();
autoPlayControl();

forward.addEventListener('click', nextPane);
backward.addEventListener('click', previousPane);
document.addEventListener('keydown', filterArrows);
pauseActive.addEventListener('click', autoPlayControl);
    