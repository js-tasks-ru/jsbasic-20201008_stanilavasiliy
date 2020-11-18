export default class StepSlider {

  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.steps = steps;
    this.value = value;

    this.createDOM();
    this.sliderClickListener();
    this.sliderMoveListener();
  }


  createDOM() {
    this.sliderThumb = document.createElement('div');
    this.sliderValue = document.createElement('span');
    this.sliderProgress = document.createElement('div');
    this.sliderSteps = document.createElement('div');

    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');

      if (i == 0) {
        span.classList.add('slider__step-active');
      }

      this.sliderSteps.append(span);
    }

    this.elem.classList.add('slider');
    this.sliderThumb.classList.add('slider__thumb');
    this.sliderValue.classList.add('slider__value');
    this.sliderValue.innerHTML = 0;
    this.sliderProgress.classList.add('slider__progress');
    this.sliderProgress.style.width = '0%';
    this.sliderSteps.classList.add('slider__steps');

    this.elem.append(this.sliderThumb, this.sliderProgress, this.sliderSteps);
    this.sliderThumb.append(this.sliderValue);
  }


  sliderClickListener() {
    let step = null;
    let previousStep = null;
    
    this.elem.addEventListener('click', event => {
      let sliderWidth = this.elem.getBoundingClientRect().width;
      let clickValue = event.offsetX;
      let stepValue = sliderWidth / (this.steps - 1);
      let previousValue = 0;
      let presentValue = 0;
      previousStep = step;

      if (event.target.classList.contains('slider__thumb')) {
        return;
      }

      for (let i = 1; i <= this.steps; i++) {
        presentValue = i * stepValue;

        if (previousValue < clickValue && presentValue > clickValue) {

          if (previousValue + stepValue / 2 >= clickValue) {
            step = --i;
          }
          step = i;
        }
        
        previousValue = presentValue;
      }

      this.sliderValue.innerHTML = step;
      if (this.sliderSteps.querySelectorAll('.slider__step-active')[0]) {
        this.sliderSteps.querySelectorAll('.slider__step-active')[0].classList.remove('slider__step-active');
      }
      this.sliderSteps.querySelectorAll('span')[step].classList.add('slider__step-active');
      this.sliderThumb.style.left = 100 / (this.steps - 1) * step + '%';
      this.sliderProgress.style.width = 100 / (this.steps - 1) * step + '%';

      if (step != previousStep) {
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: step,
          bubbles: true
        }));
      }
    });
  }


  sliderMoveListener() {
    let thumb = this.sliderThumb;
    let slider = this.elem;
    let sliderProgress = this.sliderProgress;
    let sliderValue = this.sliderValue;
    let sliderSteps = this.sliderSteps;
    let sliderThumb = this.sliderThumb;
    let steps = this.steps;
    let compareSliderValue = this.sliderValue.innerHTML;

    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', event => {
      let stepValue = slider.getBoundingClientRect().width / (steps - 1);
      slider.classList.add('slider_dragging');
      thumb.style.position = 'absolute';
      thumb.zIndex = 1000;

      moveAt(event.pageX);

      function moveAt(pageX) {
        if (pageX > slider.getBoundingClientRect().right) {
          thumb.style.left = slider.getBoundingClientRect().width + 'px';
          return;
        }
        if (pageX < slider.getBoundingClientRect().left) {
          thumb.style.left = '0px';
          return;
        }

        thumb.style.left = (pageX - slider.getBoundingClientRect().left) / slider.getBoundingClientRect().width * 100 + '%';

        let thumbPosition = thumb.getBoundingClientRect().left + thumb.getBoundingClientRect().width / 2 - slider.getBoundingClientRect().left;

        sliderProgress.style.width = thumbPosition / slider.getBoundingClientRect().width * 100 + '%';

        sliderValue.innerHTML = Math.round(thumbPosition / stepValue);
      }

      function onPointerMove(event) {
        moveAt(event.pageX);
      }

      document.addEventListener('pointermove', onPointerMove);

      document.onpointerup = function() {
        document.removeEventListener('pointermove', onPointerMove);
        slider.classList.remove('slider_dragging');

        if (sliderSteps.querySelectorAll('.slider__step-active')[0]) {
          sliderSteps.querySelectorAll('.slider__step-active')[0].classList.remove('slider__step-active');
        }
        sliderSteps.querySelectorAll('span')[sliderValue.innerHTML].classList.add('slider__step-active');
        sliderThumb.style.left = 100 / (steps - 1) * sliderValue.innerHTML + '%';
        sliderProgress.style.width = 100 / (steps - 1) * sliderValue.innerHTML + '%';
  
        if (+sliderValue.innerHTML != compareSliderValue) {
          slider.dispatchEvent(new CustomEvent('slider-change', {
            detail: +sliderValue.innerHTML,
            bubbles: true
          }));
          
          compareSliderValue = +sliderValue.innerHTML;
        }

        document.onpointerup = null;
      };
    });
  }
}