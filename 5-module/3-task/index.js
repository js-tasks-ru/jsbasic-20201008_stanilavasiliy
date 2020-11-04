function initCarousel() {
  let carouselArrowRight = document.querySelectorAll('.carousel__arrow_right')[0];
  let carouselArrowLeft = document.querySelectorAll('.carousel__arrow_left')[0];
  let carouselInnerElement = document.querySelectorAll('.carousel__inner')[0];
  let carouselShiftValue = document.querySelectorAll('.carousel__img')[0].offsetWidth;
  let carouselLength = document.querySelectorAll('.carousel__img').length;
  let carouselCounter = 0;

  carouselArrowLeft.style.display = 'none';

  carouselArrowRight.addEventListener('click', () => {
    carouselCounter++;
    carouselInnerElement.style.transform = `translateX(-${carouselShiftValue * carouselCounter}px)`;

    if (carouselCounter == carouselLength - 1) {
      carouselArrowRight.style.display = 'none';
    }

    carouselArrowLeft.style.display = '';
  });

  carouselArrowLeft.addEventListener('click', () => {
    carouselCounter--;
    carouselInnerElement.style.transform = `translateX(-${carouselShiftValue * carouselCounter}px)`;

    if (carouselCounter == 0) {
      carouselArrowLeft.style.display = 'none';
    }

    carouselArrowRight.style.display = '';
  });
}
