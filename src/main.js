//import Ui from "./displayProducts.mjs";
import Products from "./getproducts.mjs";
import Storage from "./localStorage.mjs";

//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCart = document.querySelector(".clear-cart");

//cart nodes from the dom
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");

const productsDOM = document.querySelector(".products-center");
const cartIterms = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

//
let cart = [];

//
let buttonsDOM = [];
//generate Ui
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `<article class="product">
            <div class="img-container">
              <img src=${product.image} alt="" class="product-img" />
              <button class="bag-btn" data-id=${product.id}>
                <i class="fas fa-shopping-cart"></i>
                add to bag
              </button>
            </div>
            <h3>${product.title}</h3>
            <P>popularity ${product.rating.rate}</p>
            <h4>R ${product.price}</h4>
          </article>`;
    });
    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    //console.log(buttons);
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        //get product from the produts and
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        console.log(cartItem);
        //add product to the cart
        cart = [...cart, cartItem];

        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values//
        this.setCartValues(cart);
        //diplay cart item
        this.addCartItem(cartItem);

        //show cart
        this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartIterms.innerText = itemsTotal;
  }
/*The problem is that when i click add item it is added to cart but then not injected into the dom*/
  //this function creates a templateand inserts items that has been selected
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
            <img src=${item.image} alt=${item.title}>
            <div>
                <h4>${item.title}</h4>
                <h5>$ ${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>
        remove
                </span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>`;
    cartContent.appendChild(div);
   
    console.log(cartContent);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDom.classList.add("showCart");
  }
} // end of UI  class

//storage

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);

      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
console.log("Hello ");
