
    /* jshint esversion: 6 */

    class SlideShow {
        constructor(showNumber) {
            this.slideShow = document.querySelector("."+ showNumber);
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
            this.slideAnimations = ['slide-in','fade-in','oval-shrink','crazy'];
            this.textAnimations = ['center-long','top-right','center-short','top-left'];
            this.panes = document.querySelectorAll('.pane');
            this.timerOn;
            
        }
      
        // Creates the first (green) tick that is active.
        createFirstTick() {
            let newFirstTick = document.createElement('img');
            newFirstTick.className = 'pane-tick';
            newFirstTick.src = 'images/activePane.svg';
            this.paneTicker.appendChild(newFirstTick);
        }
    
        //creates one tick as a helper function to paneTickInit. 
        createTick() {
            let newTick = document.createElement('img');
            newTick.classList.add('pane-tick');
            newTick.src = 'images/inactivePane.svg';
            this.paneTicker.appendChild(newTick);
        }
    
        //Calls either function above for whatever this.panes exist in HTML. 
        paneTickInit() {
           
            this.panes.forEach((pane) => {
                if (pane === this.panes[0]) {
                    this.createFirstTick();
                    pane.classList.add('active-panel');
                } else {
                    this.createTick();
                    pane.classList.add('invisible-panel');
                }
            });
        }
    
        //Progresses forward through this.panes when clicking forward button.
        nextPane() {
            
            this.slideText = this.slideShow.querySelectorAll('.slide-text');
            const activeIndex = [...this.panes].findIndex(pane => pane.classList.value.includes('active-panel'));
            const lastIndex = this.panes.length - 1;
            const paneTick = this.slideShow.querySelectorAll('.pane-tick');
    
            // Special case of last slide moving back to first
            if (this.panes[activeIndex] === this.panes[lastIndex]) {
                this.panes[lastIndex].classList.remove('active-panel');
                this.panes[lastIndex].classList.add('invisible-panel');
                this.panes[0].classList.remove('invisible-panel');
                this.panes[0].classList.add('active-panel');
                this.slideText[lastIndex].classList.remove(this.textAnimations[lastIndex]);
                this.slideText[lastIndex].classList.add('invisible-text');
                this.slideText[0].classList.remove('invisible-text');
                this.slideText[0].classList.add(this.textAnimations[0]);
                paneTick[lastIndex].setAttribute('src', "images/inactivePane.svg");
                paneTick[0].setAttribute('src', "images/activePane.svg");
                this.mainImages[lastIndex].classList.remove(this.slideAnimations[lastIndex]);
                this.mainImages[lastIndex].classList.add('invisible-panel');
                this.mainImages[0].classList.remove('invisible-panel');
                this.mainImages[0].classList.add(this.slideAnimations[0]);
    
                // all other slide movements
            } else {
                this.panes[activeIndex].classList.remove('active-panel');
                this.panes[activeIndex].classList.add('invisible-panel');
                this.panes[activeIndex + 1].classList.remove('invisible-panel');
                this.panes[activeIndex + 1].classList.add('active-panel');
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
        }
    
        //Progresses backward through this.panes when clicking backward button.
        previousPane() {
            this.slideText = this.slideShow.querySelectorAll('.slide-text');
            const activeIndex = [...this.panes].findIndex(pane => pane.classList.value.includes('active-panel'));
            const lastIndex = this.panes.length - 1;
            const paneTick = this.slideShow.querySelectorAll('.pane-tick');
    
            //special case of first slide moving backward to last
            if (this.panes[activeIndex] === this.panes[0]) {
                this.panes[0].classList.remove('active-panel');
                this.panes[0].classList.add('invisible-panel');
                this.slideText[0].classList.remove(this.textAnimations[0]);
                this.slideText[0].classList.add('invisible-text');
                this.panes[lastIndex].classList.remove('invisible-panel');
                this.panes[lastIndex].classList.add('active-panel');
                this.slideText[lastIndex].classList.remove('invisible-text');
                this.slideText[lastIndex].classList.add(this.textAnimations[lastIndex]);
                paneTick[0].setAttribute('src', "images/inactivePane.svg");
                paneTick[lastIndex].setAttribute('src', "images/activePane.svg");
                this.mainImages[0].classList.remove(this.slideAnimations[0]);
                this.mainImages[0].classList.add('invisible-panel');
                this.mainImages[lastIndex].classList.remove('invisible-panel');
                this.mainImages[lastIndex].classList.add(this.slideAnimations[lastIndex]);
                //all other slide movements
            } else {
                this.panes[activeIndex].classList.remove('active-panel');
                this.panes[activeIndex].classList.add('invisible-panel');
                this.panes[activeIndex - 1].classList.remove('invisible-panel');
                this.panes[activeIndex - 1].classList.add('active-panel');
                this.slideText[activeIndex].classList.remove(this.textAnimations[activeIndex]);
                this.slideText[activeIndex].classList.add('invisible-text');
                this.slideText[activeIndex - 1].classList.remove('invisible-text');
                this.slideText[activeIndex - 1].classList.add(this.textAnimations[activeIndex - 1]);
                paneTick[activeIndex].setAttribute('src', "images/inactivePane.svg");
                paneTick[activeIndex - 1].setAttribute('src', "images/activePane.svg");
                this.mainImages[activeIndex].classList.remove(this.slideAnimations[activeIndex]);
                this.mainImages[activeIndex].classList.add('invisible-panel');
                this.mainImages[activeIndex - 1].classList.remove('invisible-panel');
                this.mainImages[activeIndex - 1].classList.add(this.slideAnimations[activeIndex - 1]);
            }
        }
    
    
        autoPlayControl(event) {
            if (event === undefined) {
              this.timerOn = setInterval(() => {this.nextPane()}, Number(3000));
              console.log('this option');
            } else if (event.target.getAttribute('src') === 'images/pause.svg') {
                clearInterval(this.timerOn);
                event.target.setAttribute('src', 'images/play.svg');
                console.log('stopped')
            } else {
                this.timerOn = setInterval(() => {this.nextPane()}, Number(3000));
                event.target.setAttribute('src', 'images/pause.svg');
            }
    
        }
        
    
        initHandlers() {
            
            this.paneTickInit();
            this.autoPlayControl();
            this.forward.onclick = () => this.nextPane();
            this.backward.onclick = () => this.previousPane(event);
            this.pauseActive.onclick = () => this.autoPlayControl(event);
        }
    
    
    
    }
    
    let firstShow = new SlideShow('one');
    firstShow.initHandlers();    
  