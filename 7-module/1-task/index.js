import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.value = '';

    this.createDOM();
    this.arrowListener();
    this.categorySelect();
  }

  createDOM() {
    this.elem = document.createElement('div');
    let buttonLeft = document.createElement('button');
    let imgButtonLeft = document.createElement('img');
    let navRibbon = document.createElement('nav');
    let buttonRight = document.createElement('button');
    let imgButtonRight = document.createElement('img');

    this.elem.classList.add('ribbon');
    buttonLeft.classList.add('ribbon__arrow', 'ribbon__arrow_left');
    imgButtonLeft.src = '/assets/images/icons/angle-icon.svg';
    imgButtonLeft.alt = 'icon';
    navRibbon.classList.add('ribbon__inner');
    buttonRight.classList.add('ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible');
    imgButtonRight.src = '/assets/images/icons/angle-icon.svg';
    imgButtonRight.alt = 'icon';

    for (let category of this.categories) {
      let ribbonLink = document.createElement('a');

      ribbonLink.href = '#';
      ribbonLink.classList.add('ribbon__item');
      ribbonLink.dataset.id = category.id;
      ribbonLink.innerHTML = category.name;

      if (category.name == 'All') {
        ribbonLink.classList.add('ribbon__item_active')
      }

      navRibbon.append(ribbonLink);
    }

    buttonLeft.append(imgButtonLeft);
    buttonRight.append(imgButtonRight);
    this.elem.append(buttonLeft, navRibbon, buttonRight);
  }

  arrowListener() {
    let arrowLeft = this.elem.querySelectorAll('.ribbon__arrow_left')[0];
    let arrowRight = this.elem.querySelectorAll('.ribbon__arrow_right')[0];
    let navRibbon = this.elem.querySelectorAll('.ribbon__inner')[0];    

    this.elem.addEventListener('click', event => {
      
      if (event.target == arrowLeft) {
        navRibbon.scrollBy(-350, 0);

        arrowRight.classList.add('ribbon__arrow_visible');

        setTimeout( () => {
          let scrollLeft = navRibbon.scrollLeft;
          if (scrollLeft == 0) {
            arrowLeft.classList.remove('ribbon__arrow_visible');
          }
        }, 500); 
      }

      if (event.target == arrowRight) {
        navRibbon.scrollBy(350, 0);

        arrowLeft.classList.add('ribbon__arrow_visible');

        setTimeout( () => {
          let scrollRight = navRibbon.scrollWidth - navRibbon.scrollLeft - navRibbon.clientWidth;
          if (scrollRight < 1) {
            arrowRight.classList.remove('ribbon__arrow_visible');
          }
        }, 500);  
      }
    });
  }

  categorySelect() {

    this.elem.addEventListener('click', event => {
      
      if (event.target.classList.contains('ribbon__item')) {

        event.preventDefault();

        let previousActiveItem = this.elem.querySelectorAll('.ribbon__item_active')[0];
        previousActiveItem.classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        }));
      }
    });
  }
}
