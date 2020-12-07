import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {    
  }

  async render() {
    this.carousel = new Carousel(slides);
    let dataCarouselHolder = document.querySelector('[data-carousel-holder]');
    dataCarouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    dataRibbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps: 5, value: 3});
    let dataSliderHolder = document.querySelector('[data-slider-holder]');
    dataSliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let dataCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    dataCartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch('products.json');
    this.products = await response.json();
    
    this.productsGrid = new ProductsGrid(this.products);
    let dataProductsGridHolder = document.querySelector('[data-products-grid-holder]');
    dataProductsGridHolder.innerHTML = '';
    dataProductsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', event => this.productAddHandler(event));

    document.body.addEventListener('slider-change', event => this.sliderChangeHandler(event));

    document.body.addEventListener('ribbon-select', event => this.ribbonSelectHandler(event));

    let nutsCheckbox = document.querySelector('#nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => this.nutsCheckboxHandler(nutsCheckbox.checked));

    let vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => this.vegeterianCheckboxHandler(vegeterianCheckbox.checked));
  }

  productAddHandler(event) {
    for (let product of this.products) {
      if (product.id === event.detail) {
        this.cart.addProduct(product);
      }
    }
  }

  sliderChangeHandler(event) {
    this.productsGrid.updateFilter({maxSpiciness: event.detail});
  }

  ribbonSelectHandler(event) {
    this.productsGrid.updateFilter({category: event.detail});
  }

  nutsCheckboxHandler(value) {
    this.productsGrid.updateFilter({noNuts: value});
  }

  vegeterianCheckboxHandler(value) {
    this.productsGrid.updateFilter({vegeterianOnly: value});
  }
}


