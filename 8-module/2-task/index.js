import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductsGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');

    for (let product of this.products) {
      product.filterNoNuts = false;
      product.filterVegeterianOnly = false;
      product.filterMaxSpiciness = false;
      product.filterCategory = false;
      product.visibility = true;
    }

    this.createDOM();
  }
  

  createDOM() {    
    this.elem.innerHTML = `
      <div class="products-grid__inner">
        ${this.createProductCardDOM().innerHTML}
      </div>
    `;
  }


  createProductCardDOM() {

    let productCards = document.createElement('div');

    for (let product of this.products) {

      if (product.visibility) {
        let productCard = new ProductCard(product);
        productCards.append(productCard.elem);
      }
    }

    return productCards;
  }

  updateFilter(filters) {
    
    for (let product of this.products) {
      
      for (let filter in filters) {

        if (filter.includes('noNuts') && product.nuts) {

          if (filters[filter]) {
            product.filterNoNuts = true;
          } else {
            product.filterNoNuts = false;
          }
        }

        if (filter.includes('vegeterianOnly') && !product.vegeterian) {

          if (filters[filter]) {
            product.filterVegeterianOnly = true;              
          } else {
            product.filterVegeterianOnly = false;
          }
        }

        if (filter.includes('maxSpiciness')) {

          if (product.spiciness > filters[filter]) {
            product.filterMaxSpiciness = true;
          } else {
            product.filterMaxSpiciness = false;
          }
        }

        if (filter.includes('category')) {

          if (product.category == filters[filter] || filters[filter] == '') {
            product.filterCategory = false;
          } else {
            product.filterCategory = true;
          }
        }
      }

      if (product.filterNoNuts || product.filterVegeterianOnly || 
        product.filterMaxSpiciness || product.filterCategory) {
          product.visibility = false;
      } else {
        product.visibility = true;
      }
    }

    this.createDOM();
  }
}