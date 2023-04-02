//local storage
// establish a function that takes an array and stringfy it
/*
when you access the localStorage there is many functions available to you this time use the setItem
 then pass the first argument is a key that will be matched with an array of the products passed as an argument 

*/
export default class Storage {
  //this saves the products catalogue to the local storage
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  //this one gets the product we have selected based on product id from the localstorage
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id == id);
  }

  //this saves the products selected to the local storage under cart
  static saveCurrentCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  //get cart from local storage
  static getCartFromLocalStorage() {
    let cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData !== null) {
      return  cartData;
    } else {
      let cart = [];
      return  cart;
    }
  }
}
