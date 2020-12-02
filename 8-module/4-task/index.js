import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {

    for (let cartItem of this.cartItems) {

      if (cartItem.product.id === product.id) {
        cartItem.count++;
        this.onProductUpdate(cartItem);
        return;
      }
    }

    let newCartItem = {
      product,
      count: 1,
    };

    this.cartItems.push(newCartItem);

    this.onProductUpdate(newCartItem);
  }

  updateProductCount(productId, amount) {
    
    for (let cartItem of this.cartItems) {
      
      if (cartItem.product.id === productId && amount === 1) {
        cartItem.count++;
        this.onProductUpdate(cartItem);
      }

      if (cartItem.product.id === productId && amount === -1) {

        cartItem.count--;

        if (cartItem.count === 0) {
          this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        }

        this.onProductUpdate(cartItem);
      }
    }

  }

  isEmpty() {

    for (let cartItem of this.cartItems) {
      return false;
    }

    return true;
  }

  getTotalCount() {
    let count = 0;

    for (let cartItem of this.cartItems) {
      count += cartItem.count;
    }

    return count;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modalWindow = new Modal();

    this.modalWindow.open();
    
    this.modalWindow.setTitle('Your order');

    let items = document.createElement('div');

    for (let item of this.cartItems) {
      items.append(this.renderProduct(item.product, item.count));
    }

    items.append(this.renderOrderForm());

    this.modalWindow.setBody(items);

    this.modalWindow.modal.addEventListener('click', () => this.modalHandler());

    let form = items.querySelector('.cart-form');
    
    form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  modalHandler() {
    if (event.target.closest('.cart-counter__button_plus')) {
      let productId = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(productId, 1);
    }

    if (event.target.closest('.cart-counter__button_minus')) {
      let productId = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(productId, -1);
    }
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productItems = document.querySelectorAll('.cart-product');
      let totalPriceElement = document.querySelector('.cart-buttons__info-price');

      for (let productItem of productItems) {
        
        if (productItem.dataset.productId === cartItem.product.id) {
          productItem.querySelector('.cart-counter__count').innerHTML = cartItem.count;
          productItem.querySelector('.cart-product__price').innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
        }
      }

      totalPriceElement.innerHTML = '€' + this.getTotalPrice().toFixed(2);

      if (this.isEmpty()) {
        this.modalWindow.close();
      }
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    let buttomSubmit = document.querySelector('.cart-buttons__button');
    buttomSubmit.classList.add('is-loading');

    let form = document.querySelector('.cart-form');
    let url = 'https://httpbin.org/post';

    let promise = fetch(url, {
      method: 'POST',
      body: new FormData(form),
    });

    promise.then(result => {
        this.modalWindow.setTitle('Success!');
        this.cartItems = [];
        
        let newBody = document.createElement('div');
        newBody.innerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
          `;
        this.modalWindow.setBody(newBody);
      },
    );
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

