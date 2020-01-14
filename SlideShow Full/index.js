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
const slideColumn = document.querySelector('.slide-column');
const slideToggleButton = document.querySelector('.slide-toggle-button');
const slideEditInactive = document.querySelector('.slide-edit-inactive');
const paneContainer = document.querySelector('.pane-container');
const textContainer = document.querySelector('.text-container');
const pauseActive = document.querySelector('.pause');
const generate = document.querySelector('.generate');
let moveUp = document.querySelectorAll('.move-up');
let moveDown = document.querySelectorAll('.move-down');
const tooltipToggle = document.querySelector('.tooltip-toggle-button');
const codeContainers = document.querySelector('.code-containers');

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


// this is the default use case for any forward movement (manual arrow or autoplay)
const activePanelForward = () => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const lastIndex = panes.length - 1;
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const paneTick = document.querySelectorAll('.pane-tick');
    const slideRows = document.querySelectorAll('.slide-row');

    if (settings.style.zIndex != '4') {
        settings.style.opacity = '0';
    }

    if (panes[activeIndex] === panes[lastIndex]) {
        panes[lastIndex].classList.remove('active-panel');
        panes[lastIndex].classList.add('invisible-panel');
        panes[0].classList.remove('invisible-panel');
        panes[0].classList.add('active-panel');
        panes[0].setAttribute('src', slideRows[0].children[2].children[0].value);
        panes[0].style.height = slideRows[0].children[3].children[0].value;
        panes[0].style.width = slideRows[0].children[4].children[0].value;
        slideText[lastIndex].classList.remove(slideRows[lastIndex].children[7].children[0].value);
        slideText[lastIndex].classList.add('invisible-text');
        slideText[0].classList.remove('invisible-text');
        slideText[0].classList.add(slideRows[0].children[7].children[0].value);
        slideText[0].style.fontSize = slideRows[0].children[5].children[0].value;
        slideText[0].style.color = slideRows[0].children[6].children[0].value;
        slideText[0].innerHTML = slideRows[0].children[9].children[0].value;
        paneTick[lastIndex].setAttribute('src', "images/inactivePane.svg");
        paneTick[0].setAttribute('src', "images/activePane.svg");
        panes[lastIndex].classList.remove(slideRows[lastIndex].children[8].children[0].value);
        panes[lastIndex].classList.add('invisible-panel');
        panes[0].classList.remove('invisible-panel');
        panes[0].classList.add(slideRows[0].children[8].children[0].value);

    } else {
        panes[activeIndex].classList.remove('active-panel');
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex + 1].classList.remove('invisible-panel');
        panes[activeIndex + 1].classList.add('active-panel');
        panes[activeIndex + 1].setAttribute('src', slideRows[activeIndex + 1].children[2].children[0].value);
        panes[activeIndex + 1].style.height = slideRows[activeIndex + 1].children[3].children[0].value;
        panes[activeIndex + 1].style.width = slideRows[activeIndex + 1].children[4].children[0].value;
        slideText[activeIndex].classList.remove(slideRows[activeIndex].children[7].children[0].value);
        slideText[activeIndex].classList.add('invisible-text');
        slideText[activeIndex + 1].classList.remove('invisible-text');
        slideText[activeIndex + 1].classList.add(slideRows[activeIndex + 1].children[7].children[0].value);
        slideText[activeIndex + 1].style.fontSize = slideRows[activeIndex + 1].children[5].children[0].value;
        slideText[activeIndex + 1].style.color = slideRows[activeIndex + 1].children[6].children[0].value;
        slideText[activeIndex + 1].innerHTML = slideRows[activeIndex + 1].children[9].children[0].value;
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg");
        paneTick[activeIndex + 1].setAttribute('src', "images/activePane.svg");
        panes[activeIndex].classList.remove(slideRows[activeIndex].children[8].children[0].value);
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex + 1].classList.remove('invisible-panel');
        panes[activeIndex + 1].classList.add(slideRows[activeIndex + 1].children[8].children[0].value);
    }

};

//Progresses backward through panes when clicking backward button.
const previousPane = () => {
    const panes = document.querySelectorAll('.pane');
    const slideText = document.querySelectorAll('.slide-text');
    const slideRows = document.querySelectorAll('.slide-row');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = document.querySelectorAll('.pane-tick');

    if (settings.style.zIndex != '4') {
        settings.style.opacity = '0';
    }
    //special case of first slide moving backward to last
    if (panes[activeIndex] === panes[0]) {
        panes[0].classList.remove('active-panel');
        panes[0].classList.add('invisible-panel');
        panes[lastIndex].classList.remove('invisible-panel');
        panes[lastIndex].classList.add('active-panel');
        panes[lastIndex].setAttribute('src', slideRows[lastIndex].children[2].children[0].value);
        panes[lastIndex].style.height = slideRows[lastIndex].children[3].children[0].value;
        panes[lastIndex].style.width = slideRows[lastIndex].children[4].children[0].value;
        slideText[0].classList.remove(slideRows[0].children[7].children[0].value);
        slideText[0].classList.add('invisible-text');
        slideText[lastIndex].classList.remove('invisible-text');
        slideText[lastIndex].classList.add(slideRows[lastIndex].children[7].children[0].value);
        slideText[lastIndex].style.fontSize = slideRows[lastIndex].children[5].children[0].value;
        slideText[lastIndex].style.color = slideRows[lastIndex].children[6].children[0].value;
        slideText[lastIndex].innerHTML = slideRows[lastIndex].children[9].children[0].value;
        paneTick[0].setAttribute('src', "images/inactivePane.svg");
        paneTick[lastIndex].setAttribute('src', "images/activePane.svg");
        panes[0].classList.remove(slideRows[0].children[8].children[0].value);
        panes[0].classList.add('invisible-panel');
        panes[lastIndex].classList.remove('invisible-panel');
        panes[lastIndex].classList.add(slideRows[lastIndex].children[8].children[0].value);
        //all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel');
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex - 1].classList.remove('invisible-panel');
        panes[activeIndex - 1].classList.add('active-panel');
        panes[activeIndex - 1].setAttribute('src', slideRows[activeIndex - 1].children[2].children[0].value);
        panes[activeIndex - 1].style.height = slideRows[activeIndex - 1].children[3].children[0].value;
        panes[activeIndex - 1].style.width = slideRows[activeIndex - 1].children[4].children[0].value;
        slideText[activeIndex].classList.remove(slideRows[activeIndex].children[7].children[0].value);
        slideText[activeIndex].classList.add('invisible-text');
        slideText[activeIndex - 1].classList.remove('invisible-text');
        slideText[activeIndex - 1].classList.add(slideRows[activeIndex - 1].children[7].children[0].value);
        slideText[activeIndex - 1].style.fontSize = slideRows[activeIndex - 1].children[5].children[0].value;
        slideText[activeIndex - 1].style.color = slideRows[activeIndex - 1].children[6].children[0].value;
        slideText[activeIndex - 1].innerHTML = slideRows[activeIndex - 1].children[9].children[0].value;
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg");
        paneTick[activeIndex - 1].setAttribute('src', "images/activePane.svg");
        panes[activeIndex].classList.remove(slideRows[activeIndex].children[8].children[0].value);
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex - 1].classList.remove('invisible-panel');
        panes[activeIndex - 1].classList.add(slideRows[activeIndex - 1].children[8].children[0].value);
    }

};
//activates the arrow keys on the keyboard to control manual navigation.
const keyboardNavigation = (event) => {
    if (event.keyCode === 37) {
        previousPane();
    } else if (event.keyCode === 39) {
        activePanelForward();
    }
};

//This is used when the user clicks on the cog, or the X to close the settings window.
const optionsInit = () => {

    settings.style.opacity = '0.95';
    if (settings.style.zIndex === '4') {
        settings.style.zIndex = '0';
        settings.style.opacity = '0';
    } else {
        settings.style.zIndex = '4';
        settings.style.opacity = '0.95';
    }

};

// Logic for starting the autoplay. Includes error message handling. 
const autoPlayStart = () => {
    const onlyNumbers = /([0-9]{1,7})/g;
    if (apTimer.value !== '' && apTimer.value.match(onlyNumbers) && apTimer.value.match(onlyNumbers)[0].length === apTimer.value.length) {
        timerOn = setInterval(activePanelForward, Number(apTimer.value));
    } else if (apTimer.value === '') {
        timerOn = setInterval(activePanelForward, 3000);
        apTimer.value = '3000';
        errorMessage.innerHTML = 'Using default interval';
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 3000);
    } else {
        timerOn = setInterval(activePanelForward, 3000);
        apTimer.value = '3000';
        errorMessage.innerHTML = 'digits only please. Using default interval';
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 3000);

    }


};

// helper function to stop autoplay
const autoPlayStop = () => {
    clearInterval(timerOn);
};


// Sets up and takes down the auto-play and play/pause functionality. Needs to be called. 
const autoPlay = () => {
    if (autoPlayButton.src.includes('images/toggleOff.svg')) {
        autoPlayStart();
        autoPlayButton.src = 'images/toggleOn.svg';
        pauseActive.setAttribute('src', 'images/pause.svg')
    } else {
        autoPlayStop();
        autoPlayButton.src = 'images/toggleOff.svg';
        pauseActive.setAttribute('src', 'images/play.svg');
    }
};

// Clears the ticks when re-counting after updating cog settings
const clearTicks = () => {
    const paneTick = document.querySelectorAll('.pane-tick');
    paneTick.forEach((tick) => {
        tick.remove();
    });
};

//This logic changes the carousel size and enforces valid entries by the user.
const changeMasterSize = () => {
    const carousel = document.querySelector('.carousel');
    const validSize = /([0-9]{1,4}).?([0-9]{1,3})?(px|rem|%|em)/gi;
    if (height.value.match(validSize) && width.value.match(validSize)) {

        carousel.style.width = width.value;
        carousel.style.height = height.value;

    } else if (height.value.match(validSize)) {
        errorMessage.innerHTML = 'please input a valid unit for width';
        width.value = '';
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 3000);
    } else if (width.value.match(validSize)) {
        errorMessage.innerHTML = 'please input a valid unit for height';
        height.value = '';
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 3000);
    } else {
        errorMessage.innerHTML = 'please input a valid unit of measurement';
        height.value = '';
        width.value = '';
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 3000);
    }

};

// Logic used within initInputChecks to validate entries in those 3 types of elements.
const slideRowValidation = (event) => {
    const validSize = /([0-9]{1,4}).?([0-9]{1,3})?(px|rem|%|em)/gi;

    if (!event.target.value.match(validSize)) {
        event.target.focus();
        errorMessage.style.color = 'red';
        errorMessage.innerHTML = 'Valid units of measurement only, please';
    }
};

// sets up the event handlers. Needs to be called at certain points to be updated as rows are added/changed.
const initInputChecks = () => {
    const inputChecks = document.querySelectorAll('.image-height, .image-width, .font-size');

    inputChecks.forEach((check) => {
        check.addEventListener('blur', slideRowValidation);
    });
};

// turns the tooltips on or off depending on what the user toggles.
const handleTTToggle = () => {

    return tooltipToggle.getAttribute('src') === 'images/toggleOn.svg' ?
        tooltipToggle.setAttribute('src', 'images/toggleOff.svg') :
        tooltipToggle.setAttribute('src', 'images/toggleOn.svg');
};

//This handles the logic of assigning the hints. All hints display as the errorMessage element.
const handleHints = (event) => {
    errorMessage.style.color = 'rgb(45, 255, 38)';
    let classValue = event.target.classList.value;

    if (tooltipToggle.getAttribute('src') === 'images/toggleOn.svg') {
        if (classValue === 'move-up') {
            errorMessage.innerHTML = 'Moves the row up one slot';
        } else if (classValue === 'move-down') {
            errorMessage.innerHTML = 'Moves the row down one slot';
        } else if (classValue === 'add-row') {
            errorMessage.innerHTML = 'Adds a row beneath the current one';
        } else if (classValue === 'subtract-row') {
            errorMessage.innerHTML = 'Deletes the current row';
        } else if (classValue === 'image-src') {
            errorMessage.innerHTML = 'Use local or http source';
        } else if (classValue === 'font-size' || classValue.match('height') || classValue.match('width')) {
            errorMessage.innerHTML = '%, px, em, rem';
        } else {
            errorMessage.innerHTML = 'Use Numbers only';
        }
        // This specifies that if the element is exited via mouse, the tooltip is set to blank. 
        if (event.type === "mouseout") {
            errorMessage.innerHTML = '';
            errorMessage.style.color = 'red';
        }
    }

};

//  This populates users text animation options according to the master Array
const textAnimationOptions = () => {

    return masterTextAnimations.map((ani) => `<option value="${ani}">${ani}</option>`).join('');
};

//  This populates users slide animation options according to the master Array
const slideAnimationOptions = () => {

    return masterSlideAnimations.map((ani) => `<option value="${ani}">${ani}</option>`).join('');
};

//  Changes thedefault rgb color code to Hhexidecimal.
const rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};

// This finds the live (computed) color for an element
const getCompColorStyle = (el) => {
    let rgb = window.getComputedStyle(el).color;
    return rgb2hex(rgb);
};

// Builds the slide rows that are already loaded in HTML etc.
const makeSlideRow = (image) => {
    const panes = document.querySelectorAll('.pane');
    let indexNumber = [...mainImages].indexOf(image);
    let newSlideRow = document.createElement('div');
    newSlideRow.classList.add('slide-row');
    slideText[indexNumber].style.fontSize = "3rem";
    let hexColor = getCompColorStyle(slideText[indexNumber]);
    let imageName = image.src.match(/(images)\/(\S+).(\S+)/gi)[0];


    newSlideRow.innerHTML = `
                <div class="edit-tools-row">
                <div class="drag-n-drop"> 
                <div class="move-up"> </div>
                <div class="move-down"> </div>
                   </div>
                <img class="add-row" src="images/addRow.svg" alt="">
                <img class="subtract-row" src="images/subtractRow.svg" alt="">
                </div>
                   <p class="slide-num">${indexNumber + 1}</p>
                   <div class="inner-row-div source">
                   <input class="image-src"  type ="text" size="18" value = "${imageName}"></input>
                </div>
                <div class="inner-row-div i-height">
                   <input class="image-height"  type="text" size="8" value = "${Math.round((image.height / [...panes][indexNumber].clientHeight) * 100)}%"></input>
                </div>
                <div class="inner-row-div i-width">
                   <input class="image-width"  type="text" size="8" value = "${Math.round((image.width / [...panes][indexNumber].clientWidth) * 100)}%"></input>
                </div>
                <div class="inner-row-div font-size-div">
                   <input class='font-size'  type="text" size="8" value = "${slideText[indexNumber].style.fontSize}"></input>
                </div>
                <div class="inner-row-div font-color">
                <input type="color" class="input-color" value="${hexColor}"></input>
                </div>
                <div class="inner-row-div2 text-animation">
                   <select class="text-animation-styles" value="${textAnimations[indexNumber]}">
                    ${textAnimationOptions()}
                   </select>
                </div>
                <div class="inner-row-div2 slide-animation" >
                   <select  class="slide-animation-styles" value="${slideAnimations[indexNumber]}">
                   ${slideAnimationOptions()}
                </select>
                </div>
                <div class="inner-row-div2 text-content">
                <input class="text" type="text" size="8" value = "${slideText[indexNumber].innerHTML}"></input>
             </div>
           
`;
    slideOptions.appendChild(newSlideRow);
    let textAnimationStyles = document.querySelectorAll('.text-animation-styles');
    let slideAnimationStyles = document.querySelectorAll('.slide-animation-styles');
    textAnimationStyles[indexNumber].value = textAnimations[indexNumber];
    slideAnimationStyles[indexNumber].value = slideAnimations[indexNumber];
    initInputChecks();

};

// populates the first set of slide rows based on how many images are loaded into HTML
const slideRowInit = () => {
    mainImages.forEach((image) => {

        makeSlideRow(image);
    });
    handlefirstLast();

};

//resets the order of the slide# column any time a change is made.
const orderHelper = () => {
    const order = document.querySelectorAll('.slide-num');
    order.forEach((num) => {
        num.innerHTML = [...order].indexOf(num) + 1;
    });
};

/*This logic deletes the move up arrow and move down arrow respectively for first and last. So user 
can't cause an error.*/
const handlefirstLast = () => {
    moveUp = document.querySelectorAll('.move-up');
    moveDown = document.querySelectorAll('.move-down');
    const slideRows = document.querySelectorAll('.slide-row');
    if (slideRows.length > 0) {
        moveUp.forEach((arrow) => {
            arrow.style.visibility = 'visible';
        });
        moveDown.forEach((arrow) => {
            arrow.style.visibility = 'visible';
        });
        [...slideRows][0].children[0].children[0].children[0].style.visibility = 'hidden';
        [...slideRows][slideRows.length - 1].children[0].children[0].children[1].style.visibility = 'hidden';
    }
};

// This covers what happens when the user click the "plus" to add a new row. 
const addNewRow = (event) => {
    const slideRow = document.querySelectorAll('.slide-row');
    let lastIndex = slideRow.length;
    let newSlideRow = document.createElement('div');
    newSlideRow.classList.add('slide-row');
    let newPane = document.createElement('img');
    newPane.classList.add('main-images', 'pane', 'invisible-panel');
    let newText = document.createElement('p');
    newText.classList.add('slide-text', 'invisible-text');
    newText.innerHTML = 'New Slide Text';


    newSlideRow.innerHTML = `
                   <div class="edit-tools-row">
                    <div class="drag-n-drop"> 
                      <div class="move-up"> </div>
                      <div class="move-down"> </div>
                    </div>
                    <img class="add-row" src="images/addRow.svg" alt="">
                   <img class="subtract-row" src="images/subtractRow.svg" alt="">
                   </div>
                   <p class="slide-num">${lastIndex + 1}</p>
                   <div class="inner-row-div source">
                   <input class="image-src"  type ="text" size="8" value = "images/"></input>
                </div>
                <div class="inner-row-div i-height">
                   <input class="image-height"  type="text" size="8" value = "100%"></input>
                </div>
                <div class="inner-row-div i-width">
                   <input class="image-width"  type="text" size="8" value = "100%"></input>
                </div>
                <div class="inner-row-div font-size-div">
                   <input class='font-size'  type="text" size="8" value = "3rem"></input>
                </div>
                <div class="inner-row-div font-color">
                <input type="color" class="input-color" value="#000000"></input>
                </div>
                <div class="inner-row-div2 text-animation">
                   <select class="text-animation-styles" value="">
                    ${textAnimationOptions()}
                   </select>
                </div>
                <div class="inner-row-div2 slide-animation">
                   <select  class="slide-animation-styles" value="">
                   ${slideAnimationOptions()}
                </select>
                </div>
                <div class="inner-row-div2 text-content">
                   <input class="text" type="text" size="8" value = "New Slide Text"></input>
                </div>
            
`;
    if (slideRow.length === 0) {
        slideOptions.appendChild(newSlideRow);
        paneContainer.appendChild(newPane);
        textContainer.appendChild(newText);
    } else {
        event.target.parentElement.parentElement.after(newSlideRow);
        orderHelper();
        let parent = event.target.parentElement.parentElement;
        let index = [...slideOptions.children].indexOf(parent);
        [...paneContainer.children][index].after(newPane);
        [...textContainer.children][index].after(newText);

    }
    newSlideRow.querySelector('.move-up').addEventListener('click', moveRow);
    newSlideRow.children[0].children[0].children[1].addEventListener('click', moveRow);
    newSlideRow.children[0].children[1].addEventListener('click', addNewRow);
    newSlideRow.children[0].children[2].addEventListener('click', deleteSlideRow);
    newSlideRow.querySelectorAll('.move-up, .move-down, .add-row, .subtract-row, .image-src, .image-height, .image-width, .font-size').forEach((item) => {
        item.addEventListener('mouseover', handleHints);
        item.addEventListener('mouseout', handleHints);
    });

    clearTicks();
    paneTickInit();
    handlefirstLast();
    initInputChecks();
};

// This handles what happens when the user clicks the delete (minus) button.
const deleteSlideRow = (event) => {
    const slideRow = document.querySelectorAll('.slide-row');
    let parent = event.target.parentElement.parentElement;
    let index = [...slideOptions.children].indexOf(parent);
    if (slideRow.length === 1) {
        event.target.parentElement.parentElement.remove();
        [...paneContainer.children][index].remove();
        [...textContainer.children][index].remove();
        addNewRow();
    } else {
        event.target.parentElement.parentElement.remove();
        orderHelper();
        [...paneContainer.children][index].remove();
        [...textContainer.children][index].remove();
    }
    handlefirstLast();
};

// This handles what happens when a user clicks one of the arrows to move a row up or down.
const moveRow = (event) => {
    let moveRowParent = event.target.parentElement.parentElement.parentElement;
    let index = [...slideOptions.children].indexOf(moveRowParent);
    let paneToMove = [...paneContainer.children][index];
    let textToMove = [...textContainer.children][index];
    if (event.target.classList.value === 'move-up') {
        [...slideOptions.children][index - 1].insertAdjacentElement('beforebegin', moveRowParent);
        [...paneContainer.children][index - 1].insertAdjacentElement('beforebegin', paneToMove);
        [...textContainer.children][index - 1].insertAdjacentElement('beforebegin', textToMove);
    } else if (event.target.classList.value === 'move-down') {
        [...slideOptions.children][index + 1].insertAdjacentElement('afterend', moveRowParent);
        [...paneContainer.children][index + 1].insertAdjacentElement('afterend', paneToMove);
        [...textContainer.children][index + 1].insertAdjacentElement('afterend', textToMove);
    }
    orderHelper();
    handlefirstLast();
    clearTicks();
    paneTickInit();
};

// control for slide edit toggle
const slideEditInit = () => {
    if (slideToggleButton.src.includes('images/toggleOff.svg')) {
        slideEditInactive.style.zIndex = '-1';
        slideEditInactive.style.opacity = '0';
        slideOptions.style.opacity = '1';
        slideToggleButton.src = 'images/toggleOn.svg';
    } else {
        slideToggleButton.src = 'images/toggleOff.svg';
        slideEditInactive.style.zIndex = '10';
        slideEditInactive.style.opacity = '1';
        slideOptions.style.opacity = '.2';
    }
};

//This creates the user code download. It reads from the slide rows and simplifies the code to be more streamlined.
const createCodeDownload = () => {
    const panes = [...document.querySelectorAll('.pane')];
    const slideRows = document.querySelectorAll('.slide-row');
    const slideText = document.querySelectorAll('.slide-text');
    const HTMLDownload = document.getElementById('html-output');
    const CSSDownload = document.getElementById('css-output');
    const JSDownload = document.getElementById('js-output');

    const imageHeights = [...document.querySelectorAll('.image-height')].map((img) => {
        return img.getAttribute('value');
    });
    const imageWidths = [...document.querySelectorAll('.image-width')].map((img) => {
        return img.getAttribute('value');
    });
    const fontSizes = [...document.querySelectorAll('.font-size')].map((img) => {
        return img.getAttribute('value');
    });
    const fontColors = [...document.querySelectorAll('.input-color')].map((img) => {
        return img.getAttribute('value');
    });
    const textAnis = [...document.querySelectorAll('.text-animation-styles')].map((img) => {
        return `'${img.getAttribute('value')}'`;
    });
    const slideAnis = [...document.querySelectorAll('.slide-animation-styles')].map((img) => {
        return `'${img.getAttribute('value')}'`;
    });

    const paneFiller = () => {

        return [...panes].map((pane) => pane.outerHTML).join('\n');

    };

    const slideTextFiller = () => {

        return [...slideText].map((text) => text.outerHTML).join('\n');

    };

    const paneCSSFiller = () => {

        return [...slideRows].map((row) => {
            let indexNum = row.firstElementChild.innerText - 1;
            return `
.pane-${row.firstElementChild.innerText} {
        position: absolute;
        height: ${imageHeights[indexNum]};
        width: ${imageWidths[indexNum]};
        font-size: ${fontSizes[indexNum]};
        color: ${fontColors[indexNum]};
    }`;
        }).join('\n');

    };


    // HTML Code Snippets
    const htmlCode = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="styles.css">
    <title>SlideShow</title>
</head>

<body>
    <!-- Main Carousel -->

    <div class="carousel">
        <div class="manual-navigation">
            <img class="navigate backward hidden" src="images/backPanel.svg" alt="">
            <div class="pane-ticker">
            </div>
            <img class="navigate forward hidden" src="images/forwardPanel.svg" alt="">
            <img class="pause hidden" src="images/pause.svg" alt="">
        </div>
        <!-- Add pane images here. First one needs to have active-panel class -->
        <div class="pane-container">
        ${paneFiller()}
        </div>
        <!-- Add slide text here. First one needs to have an animation class -->
        <div class="text-container">
        ${slideTextFiller()}
        </div>
    </div>

    <script src="index.js"></script>
</body>

</html>
`;

    // CSS Code Snippets
    const cssCode = `
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

/* carousel related */

.carousel {
    position: absolute;
    width: ${width.value};
    height: ${height.value};
    top: 10%;
    left: 10%;
    border: solid 2px rgba(0, 0, 0, 0.178);
    overflow: hidden;
    background-image: linear-gradient(white, rgb(219, 219, 219), rgb(238, 222, 222));
}

${paneCSSFiller()}

.main-images {
    width: 100%;
    height: 100%;
}

.slide-text {
    font-family: Georgia, 'Times New Roman', Times, serif;
    position: absolute;
    font-size: 3rem;
}

.carousel:hover .hidden {
    opacity: .5;
}

.pane {
    position: absolute;
    width: 100%;
    height: 100%;
}

.pause {
    height: 2rem;
    z-index: 2;
    bottom: 0%;
    right: 0%;
    opacity: 0;
    cursor: pointer;
}

.pause-active {
    z-index: 2;
    opacity: 0;  
}

.pane-ticker {
   
    height: 2rem;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    z-index: 5;
    
}

.pane-tick {
    height:  1rem;;
    width: 8%;
    border: none;
    padding: .5rem 0;
}

.invisible-panel {
    opacity: 0;
}

.invisible-text {
    opacity: 0;
}
.active-panel {
    opacity: 1;
}

.manual-navigation {
    position: absolute;
   width: 20%;
    height: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 3;
    bottom: 5%;
    right: 5%;
}

.forward {
    opacity: 0;
}

.backward {
    opacity: 0;
}

.forward:hover {
    animation: pulse 1s linear infinite;
    opacity: .75;
    background-color: rgba(255, 255, 255, 0.507);
    border-radius: 100%;
}

.backward:hover {
    animation: pulse 1s linear infinite;
    opacity: .75;
    background-color: rgba(255, 255, 255, 0.507);
    background-size: 50%;
    border-radius: 100%;
}

.navigate {
    height: 2rem;
}


/* Slide animations */

.slide-in {
    animation: slideIn .5s linear 1 forwards;
}

.fade-in {
    animation: fadeIn .5s linear 1 forwards;
}

.oval-shrink {
    animation: oval-shrink 1.5s linear 1 forwards;
}

.crazy {
    animation: crazy 1.5s linear 1 forwards;
}

/* Slide Animations */

@keyframes slideIn {
    from {
        right: 100%;
        opacity: 0;
    }

    to {
        right: 0%;
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes oval-shrink {
    from {
        border: none;
        width: 100%;
        height: 100%;
        border-radius: 0%;
        left: 0%;
        top: 0%;
    }

    to {
      
       width: 80%;
       height: 80%;
       border-radius: 50%;
       left: 10%;
       top: 10%;
    }
}

@keyframes crazy {
    0% {
        border-right: 0%;
        border-left: 0%;
        border-top: 0%;
        border-bottom: 0%;
    }
    20% {

    }
    40% {

    }
    60%{

    }
    80% {

    }
    100% {
        border-right: 40%;
        border-left: 40%;
        border-top: 40%;
        border-bottom: 40%;

    }
}


/* Text animations */

.top-left {
    animation: top-left 1s 1 forwards linear;
}

.top-right {
    animation: top-right 1s 1 forwards linear;
}

.center-short {
    animation: center-short 1s 1 forwards linear;
}

.center-long {
    animation: center-long 1s 1 forwards linear;
}

/* Text Animations */

@keyframes slideUp {
    0% {
        top: 20%;
        right: -20%;
        width: 30%;
        text-align: center;

    }

    100% {
        top: 5%;
        right: 5%;
        width: 30%;
        text-align: center;


    }
}

@keyframes top-right {
    0% {
        opacity: 0;
        top: 5%;
        right: 4%;
        width: 30%;
        text-align: center;
    }

    50% {
        opacity: .2;
        right: 3%;
    }

    100% {
        opacity: 1;
        top: 5%;
        right: 1%;
        width: 30%;
        text-align: center;
    }
}

@keyframes top-left {
    0% {
        opacity: 0;
        top: 5%;
        left: 4%;
        width: 30%;
        text-align: center;
    }

    50% {
        opacity: .2;
        left: 3%;
    }

    100% {
        opacity: 1;
        top: 5%;
        left: 1%;
        width: 30%;
        text-align: center;
    }
}

@keyframes center-long {
    0% {
        opacity: 0;
        top: 2%;
        width: 100%;
        text-align: center;
    }

    50% {
        opacity: .2;
        top: 3%;
    }

    100% {
        opacity: 1;
        top: 5%;
        width: 100%;
        text-align: center;
    }
}

@keyframes center-short {
    0% {
        opacity: 0;
        top: 5%;
        width: 50%;
        left: 25%;
        text-align: center;
    }

    50% {
        opacity: .2;
        top: 3%;
    }

    100% {
        opacity: 1;
        top: 2%;
        width: 50%;
        left: 25%;
        text-align: center;
    }
}
`;

    const jsCode = `
/* jshint esversion: 6 */

class slideShow {
    constructor(showNumber) {
        this.slideShow = document.querySelector(`${showNumber}`)
        this.paneTicker = this.slideShow.querySelector('.pane-ticker');
        this.forward = this.slideShow.querySelector('.forward');
        this.backward = this.slideShow.querySelector('.backward');
        this.slideText = this.slideShow.querySelectorAll('.slide-text');
        this.mainImages = this.slideShow.querySelectorAll('.main-images');
        this.slideToggleButton = this.slideShow.querySelector('.slide-toggle-button');
        this.slideEditInactive = this.slideShow.querySelector('.slide-edit-inactive');
        this.paneContainer = this.slideShow.querySelector('.pane-container');
        this.textContainer = this.slideShow.querySelector('.text-container');
        this.pauseActive = this.slideShow.querySelector('.pause');
        this.slideAnimations = [${[...slideAnis]}];
        this.textAnimations = [${[...textAnis]}];
        this.timerOn;
    }

// Creates the first (green) tick that is active.
createFirstTick() {
    let newFirstTick = document.createElement('img');
    newFirstTick.className = 'pane-tick';
    newFirstTick.src = 'images/activePane.svg';
    this.paneTicker.appendChild(newFirstTick);
};

//creates one tick as a helper function to paneTickInit. 
createTick() {
    let newTick = document.createElement('img');
    newTick.classList.add('pane-tick');
    newTick.src = 'images/inactivePane.svg';
    this.paneTicker.appendChild(newTick);
}

//Calls either function above for whatever panes exist in HTML. 
paneTickInit() {
    const panes = document.querySelectorAll('.pane');
    panes.forEach((pane) => {
        if (pane === panes[0]) {
            this.createFirstTick();
            pane.classList.add('active-panel');
        } else {
            this.createTick();
            pane.classList.add('invisible-panel');
        }
    });
};

//activates the arrow keys on the keyboard to control manual navigation.
filterArrows(event) {
    if (event.keyCode === 37) {
        this.previousPane();
    } else if (event.keyCode === 39) {
        this.nextPane();
    }
};

//Progresses forward through panes when clicking forward button.
nextPane(){
    const panes = this.slideShow.querySelectorAll('.pane');
    this.slideText = this.slideShow.querySelectorAll('.slide-text');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = this.slideShow.querySelectorAll('.pane-tick');
    
    // Special case of last slide moving back to first
    if (panes[activeIndex] === panes[lastIndex]) {
        panes[lastIndex].classList.remove('active-panel');
        panes[lastIndex].classList.add('invisible-panel');
        panes[0].classList.remove('invisible-panel');
        panes[0].classList.add('active-panel');
        this.slideText[lastIndex].classList.remove(textAnimations[lastIndex]);
        this.slideText[lastIndex].classList.add('invisible-text');
        this.slideText[0].classList.remove('invisible-text');
        this.slideText[0].classList.add(textAnimations[0]);
        paneTick[lastIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[0].setAttribute('src', "images/activePane.svg" );
        this.mainImages[lastIndex].classList.remove(slideAnimations[lastIndex]);
        this.mainImages[lastIndex].classList.add('invisible-panel');
        this.mainImages[0].classList.remove('invisible-panel');
        this.mainImages[0].classList.add(slideAnimations[0]);

        // all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel');
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex + 1].classList.remove('invisible-panel');
        panes[activeIndex + 1].classList.add('active-panel');
        this.slideText[activeIndex].classList.add('invisible-text');
        this.slideText[activeIndex].classList.remove(textAnimations[activeIndex]);
        this.slideText[activeIndex + 1].classList.remove('invisible-text');
        this.slideText[activeIndex + 1].classList.add(textAnimations[activeIndex + 1]);
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[activeIndex + 1].setAttribute('src', "images/activePane.svg" );
        this.mainImages[activeIndex].classList.remove(slideAnimations[activeIndex]);
        this.mainImages[activeIndex].classList.add('invisible-panel');
        this.mainImages[activeIndex + 1].classList.remove('invisible-panel');
        this.mainImages[activeIndex + 1].classList.add(slideAnimations[activeIndex + 1]);
    }
};

//Progresses backward through panes when clicking backward button.
previousPane(){
    const panes = this.slideShow.querySelectorAll('.pane');
    this.slideText = this.slideShow.querySelectorAll('.slide-text');
    const activeIndex = [...panes].findIndex(pane => pane.classList.value.includes('active-panel'));
    const lastIndex = panes.length - 1;
    const paneTick = this.slideShow.querySelectorAll('.pane-tick');
    
//special case of first slide moving backward to last
    if (panes[activeIndex] === panes[0]) {
        panes[0].classList.remove('active-panel');
        panes[0].classList.add('invisible-panel');
        this.slideText[0].classList.remove(textAnimations[0]);
        this.slideText[0].classList.add('invisible-text');
        panes[lastIndex].classList.remove('invisible-panel');
        panes[lastIndex].classList.add('active-panel');
        this.slideText[lastIndex].classList.remove('invisible-text');
        this.slideText[lastIndex].classList.add(textAnimations[lastIndex]);
        paneTick[0].setAttribute('src', "images/inactivePane.svg" );
        paneTick[lastIndex].setAttribute('src', "images/activePane.svg");
        this.mainImages[0].classList.remove(slideAnimations[0]);
        this.mainImages[0].classList.add('invisible-panel');
        this.mainImages[lastIndex].classList.remove('invisible-panel');
        this.mainImages[lastIndex].classList.add(slideAnimations[lastIndex]);
        //all other slide movements
    } else {
        panes[activeIndex].classList.remove('active-panel');
        panes[activeIndex].classList.add('invisible-panel');
        panes[activeIndex - 1].classList.remove('invisible-panel');
        panes[activeIndex - 1].classList.add('active-panel');
        this.slideText[activeIndex].classList.remove(textAnimations[activeIndex]);
        this.slideText[activeIndex].classList.add('invisible-text');
        this.slideText[activeIndex - 1].classList.remove('invisible-text');
        this.slideText[activeIndex - 1].classList.add(textAnimations[activeIndex - 1]);
        paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg" );
        paneTick[activeIndex - 1].setAttribute('src', "images/activePane.svg");
        this.mainImages[activeIndex].classList.remove(slideAnimations[activeIndex]);
        this.mainImages[activeIndex].classList.add('invisible-panel');
        this.mainImages[activeIndex - 1].classList.remove('invisible-panel');
        this.mainImages[activeIndex - 1].classList.add(slideAnimations[activeIndex - 1]);
    }
};

autoPlayControl(event){

    if (event === undefined) {
        this.timerOn = setInterval(this.nextPane, Number(${apTimer.value}));
    } else if (event.target.getAttribute('src') === 'images/pause.svg') {
        clearInterval(this.timerOn);
        event.target.setAttribute('src', 'images/play.svg')
    } else if (event.target.getAttribute('src') === 'images/play.svg') {
        this.timerOn = setInterval(this.nextPane, Number(${apTimer.value}));
        event.target.setAttribute('src', 'images/pause.svg');
    }

};

initHandlers() {
    this.paneTickInit();
    this.autoPlayControl();
    
    this.forward.onclick = () => this.nextPane();
    this.backward.onclick = () => this.previousPane();
    this.slideShow.onkeydown = () => this.filterArrows();
    this.pauseActive.onclick = () => this.autoPlayControl();
}



    }
    `   
;
    codeContainers.style.opacity = '1';
    HTMLDownload.value = htmlCode;
    CSSDownload.value = cssCode;
    JSDownload.value = jsCode;

};

//the initial paneTick call and slideInit call on page load. 
paneTickInit();
slideRowInit();

//must be read after slideRowInit or will be empty
const dragNDrops = document.querySelectorAll('.drag-n-drop');
const addRowButtons = document.querySelectorAll('.add-row');
const subtractRowButtons = document.querySelectorAll('.subtract-row');
const hints = document.querySelectorAll('.height, .width, .ap-timer, .move-up, .move-down, .add-row, .subtract-row, .image-src, .image-height, .image-width, .font-size');




//Event Listeners: 
forward.addEventListener('click', activePanelForward);
backward.addEventListener('click', previousPane);
document.addEventListener('keydown', keyboardNavigation);
cog.addEventListener('click', optionsInit);
autoPlayButton.addEventListener('click', autoPlay);
resizeButton.addEventListener('click', changeMasterSize);
exit.addEventListener('click', optionsInit);
slideToggleButton.addEventListener('click', slideEditInit);
pauseActive.addEventListener('click', autoPlay);
generate.addEventListener('click', createCodeDownload);
moveUp.forEach((up) => {
    up.addEventListener('click', moveRow);
});
moveDown.forEach((down) => {
    down.addEventListener('click', moveRow);
});
addRowButtons.forEach((button) => {
    button.addEventListener('click', addNewRow);
});
subtractRowButtons.forEach((button) => {
    button.addEventListener('click', deleteSlideRow);
});
hints.forEach((item) => {
    item.addEventListener('mouseover', handleHints);
    item.addEventListener('mouseout', handleHints);
});
tooltipToggle.addEventListener('click', handleTTToggle);

/*
To-Do

for future expansion:
update animation styles maybe try to have 8 each?
change fonts. include different font options?
skins?
update code download if needed
Features:

*/

