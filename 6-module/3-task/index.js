import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.createCaruselElement();

    this.initCarusel();
    this.addProduct();
  }

  
  createCaruselElement() {
    //create elements
    this.elem = document.createElement('div');

    let caruselArrowRight = document.createElement('div');
    let imgCaruselArrowRight = document.createElement('img');
    let caruselArrowLeft = document.createElement('div');
    let imgCaruselArrowLeft = document.createElement('img');

    let caruselInner = document.createElement('div');

    //assignment css
    this.elem.classList.add('carousel');

    caruselArrowRight.classList.add('carousel__arrow', 'carousel__arrow_right');
    imgCaruselArrowRight.src = '/assets/images/icons/angle-icon.svg';
    imgCaruselArrowRight.alt = 'icon';
    caruselArrowLeft.classList.add('carousel__arrow', 'carousel__arrow_left');
    imgCaruselArrowLeft.src = '/assets/images/icons/angle-left-icon.svg';
    imgCaruselArrowLeft.alt = 'icon';

    caruselInner.classList.add('carousel__inner');
    for (let slide of this.slides) {
      //create inner carusel's elements
      let caruselSlide = document.createElement('div');
      let imgCarusel = document.createElement('img');
      let caruselCaption = document.createElement('div');
      let spanCaruselPrice = document.createElement('span');
      let caruselTitle = document.createElement('div');
      let buttonCarusel = document.createElement('button');
      let imgButtonCarusel = document.createElement('img');

      //assignmet inner carusel's elements css
      caruselSlide.classList.add('carousel__slide');
      caruselSlide.dataset.id = slide.id;
      imgCarusel.src = `/assets/images/carousel/${slide.image}`;
      imgCarusel.classList.add('carousel__img');
      imgCarusel.alt = 'slide';
      caruselCaption.classList.add('carousel__caption');
      spanCaruselPrice.classList.add('carousel__price');
      spanCaruselPrice.innerHTML = `€${slide.price.toFixed(2)}`;
      caruselTitle.classList.add('carousel__title');
      caruselTitle.innerHTML = slide.name;
      buttonCarusel.type = 'button';
      buttonCarusel.classList.add('carousel__button');
      imgButtonCarusel.src = '/assets/images/icons/plus-icon.svg';
      imgButtonCarusel.alt = 'icon';

      //assembling inner carusel's elements
      caruselInner.append(caruselSlide);
      caruselSlide.append(imgCarusel, caruselCaption);
      caruselCaption.append(spanCaruselPrice, caruselTitle, buttonCarusel);
      buttonCarusel.append(imgButtonCarusel);
    }

    //assembling elements
    caruselArrowRight.append(imgCaruselArrowRight);
    caruselArrowLeft.append(imgCaruselArrowLeft);
    this.elem.append(caruselArrowRight, caruselArrowLeft, caruselInner);   
    
  }


  initCarusel() {
    let carouselArrowRight = this.elem.querySelectorAll('.carousel__arrow_right')[0];
    let carouselArrowLeft = this.elem.querySelectorAll('.carousel__arrow_left')[0];
    let carouselInnerElement = this.elem.querySelectorAll('.carousel__inner')[0];
    let carouselImg = this.elem.querySelectorAll('.carousel__img')[0];
    let carouselLength = this.elem.querySelectorAll('.carousel__img').length;
    let carouselCounter = 0;
  
    carouselArrowLeft.style.display = 'none';
  
    carouselArrowRight.addEventListener('click', () => {
      carouselCounter++;
      carouselInnerElement.style.transform = `translateX(-${carouselImg.offsetWidth * carouselCounter}px)`;
  
      if (carouselCounter == carouselLength - 1) {
        carouselArrowRight.style.display = 'none';
      }
  
      carouselArrowLeft.style.display = '';
    });
  
    carouselArrowLeft.addEventListener('click', () => {
      carouselCounter--;
      carouselInnerElement.style.transform = `translateX(-${carouselImg.offsetWidth * carouselCounter}px)`;
  
      if (carouselCounter == 0) {
        carouselArrowLeft.style.display = 'none';
      }
  
      carouselArrowRight.style.display = '';
    });
  }


  addProduct() {
    this.elem.addEventListener('click', (event) => {

      if (event.target.classList.contains('carousel__button')) {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true,
        }));
      }

    });
  }

}
