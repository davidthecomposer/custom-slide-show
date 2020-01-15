/* jshint esversion: 6 */

class SlideShow {
    constructor(showNumber) {
        this.slideShow = document.querySelector(`.${showNumber}`)
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
        this.slideAnimations = ['slide-in', 'fade-in', 'oval-shrink', 'crazy'];
        this.textAnimations = ['center-long', 'top-right', 'center-short', 'top-left'];
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
    nextPane() {
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
            paneTick[lastIndex].setAttribute('src', "images/inactivePane.svg");
            paneTick[0].setAttribute('src', "images/activePane.svg");
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
            this.slideText[activeIndex].classList.remove(this.textAnimations[activeIndex]);
            this.slideText[activeIndex + 1].classList.remove('invisible-text');
            this.slideText[activeIndex + 1].classList.add(this.textAnimations[activeIndex + 1]);
            paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg");
            paneTick[activeIndex + 1].setAttribute('src', "images/activePane.svg");
            this.mainImages[activeIndex].classList.remove(this.slideAnimations[activeIndex]);
            this.mainImages[activeIndex].classList.add('invisible-panel');
            this.mainImages[activeIndex + 1].classList.remove('invisible-panel');
            this.mainImages[activeIndex + 1].classList.add(this.slideAnimations[activeIndex + 1]);
        }
    };

    //Progresses backward through panes when clicking backward button.
    previousPane() {
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
            paneTick[0].setAttribute('src', "images/inactivePane.svg");
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
            paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg");
            paneTick[activeIndex - 1].setAttribute('src', "images/activePane.svg");
            this.mainImages[activeIndex].classList.remove(slideAnimations[activeIndex]);
            this.mainImages[activeIndex].classList.add('invisible-panel');
            this.mainImages[activeIndex - 1].classList.remove('invisible-panel');
            this.mainImages[activeIndex - 1].classList.add(slideAnimations[activeIndex - 1]);
        }
    };

    autoPlayControl(event) {

        if (event === undefined) {
            this.timerOn = setInterval(this.nextPane, Number(3000));
        } else if (event.target.getAttribute('src') === 'images/pause.svg') {
            clearInterval(this.timerOn);
            event.target.setAttribute('src', 'images/play.svg')
        } else if (event.target.getAttribute('src') === 'images/play.svg') {
            this.timerOn = setInterval(this.nextPane, Number(3000));
            event.target.setAttribute('src', 'images/pause.svg');
        }

    };

    initHandlers() {
        this.paneTickInit();
        this.autoPlayControl();
        console.log(this.slideShow);
        this.forward.onclick = () => this.nextPane(event);
        this.backward.onclick = () => this.previousPane(event);
        this.slideShow.onkeydown = () => this.filterArrows(event);
        this.pauseActive.onclick = () => this.autoPlayControl(event);
    }



}

let firstShow = new SlideShow('one');
firstShow.initHandlers();


//figure out first error
// test thoroughl for other errors.
// start w4bsite design process
