export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.steps = steps;
    this.value = value;

    this.createDOM();
    this.sliderListener();
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
    this.sliderProgress.classList.add('slider__progress');
    this.sliderProgress.style.width = '0%';
    this.sliderSteps.classList.add('slider__steps');

    this.elem.append(this.sliderThumb, this.sliderProgress, this.sliderSteps);
    this.sliderThumb.append(this.sliderValue);
  }


  sliderListener() {
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
}
