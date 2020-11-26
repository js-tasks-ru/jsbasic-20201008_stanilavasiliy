import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();

    this.cartIconPosition = true;
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth) {

      if (document.documentElement.clientWidth <= 767) {
        return;
      }

      if (this.cartIconPosition) {
        this.elemTop = window.pageYOffset + this.elem.getBoundingClientRect().top;
        this.elemLeft = this.elem.getBoundingClientRect().left;
        this.cartIconPosition = false;
      }

      if (this.elemTop > window.pageYOffset) {

        this.elem.style.position = 'fixed';
        this.elem.style.left = this.elemLeft + 'px';
        this.elem.style.top = this.elemTop + 'px';
        console.log(this.elemLeft);

      } else {

        let firstContainerElementRight = document.querySelectorAll('.container')[0]
                                        .firstElementChild.getBoundingClientRect().right;
        let coordElem = document.documentElement.clientWidth - this.elem.getBoundingClientRect().width;
        
        this.elem.style.position = 'fixed';
        this.elem.style.zIndex = 1000;

        if (firstContainerElementRight + 20 > coordElem - 10) {
          this.elem.style.left = coordElem - 10 + 'px';
        } else {
          this.elem.style.left = firstContainerElementRight + 20 + 'px';
        }

        if (this.elem.getBoundingClientRect().top < 50) {
          this.elem.style.top = '50px';
        }
      }
    }
  }
}
