import Ui from "./displayProducts.mjs";
import getProducts from "./getproducts.mjs";
import saveProductsToLocalStorage from "./localStorage.mjs";

//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCart = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-items");
const cartIterms = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

// cart
let cart = [];


document.addEventListener("DOMContentLoaded", () => {
  //instantiate new objects
  const ui = new Ui(cart);
  const products = new getProducts();
  const Storage = new saveProductsToLocalStorage();
  //get all products
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(()=>{
    //this getBagButtons functions is getting in the dataset ids of each product
    ui.getBagButtons();
  });
});

// hamburger
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");

}

const x = document.getElementById('hamburgerBtn')
x.onclick = toggleMenu;
