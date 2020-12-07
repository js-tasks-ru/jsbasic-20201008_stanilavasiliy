export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

