import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  
  constructor(product) {
    this.product = product;

    this.createCardElement();
    this.cardEventListener();
  }

  createCardElement() {
    this.elem = document.createElement('div');
    let divCardTop = document.createElement('div');;
    let divCardBody = document.createElement('div');
    let divCardTitle = document.createElement('div');
    let imgProduct = document.createElement('img');
    let imgPlusIcon = document.createElement('img');
    let span = document.createElement('span');
    let button = document.createElement('button');
    let imgDir = '/assets/images/products/';
    

    this.elem.classList.add('card');
    divCardTop.classList.add('card__top');
    divCardBody.classList.add('card__body');
    
    divCardTitle.classList.add('card__title');
    divCardTitle.innerHTML = this.product.name;
    
    imgProduct.classList.add('card__image');
    imgProduct.alt = 'product';
    imgProduct.src = `${imgDir}${this.product.image}`;
    
    imgPlusIcon.alt = 'icon';
    imgPlusIcon.src = '/assets/images/icons/plus-icon.svg';
    
    span.classList.add('card__price');
    span.innerHTML = `€${this.product.price.toFixed(2)}`;

    button.type = 'button';
    button.classList.add('card__button');

    
    divCardTop.append(imgProduct, span);

    button.append(imgPlusIcon);
    divCardBody.append(divCardTitle, button);

    this.elem.append(divCardTop, divCardBody);
  }

  cardEventListener () {
    let addProduct = this.elem.querySelectorAll('.card__button')[0];

    addProduct.addEventListener('click', () => {
      addProduct.dispatchEvent(new CustomEvent ('product-add', {
        detail: this.product.id,
        bubbles: true,
      }))
    }); 
  }
}
