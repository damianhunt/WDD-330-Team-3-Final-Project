import Ui from "./displayProducts.mjs";
import getProducts from "./getproducts.mjs";
import Storage from "./localStorage.mjs";

//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCart = document.querySelector(".clear-cart");




// cart

let cart = [];
//buttons
let buttonsDom = 0

document.addEventListener("DOMContentLoaded", () => {
  //instantiate new objects
  const ui = new Ui(cart);
  //cart=ui.setCartValues()
  const products = new getProducts();
  
  //get all products
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    ui.getBagButtons(buttonsDom);
    Storage.saveProducts(products);
  }).then(()=>{
    //this getBagButtons functions is getting in the dataset ids of each product
    ui.getBagButtons();
  });
});
