//import Ui from "./displayProducts.mjs";
import Products from "./getproducts.mjs";
import Storage from "./localStorage.mjs";

//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartButton = document.querySelector(".close-cart");
const clearCartButton = document.querySelector(".clear-cart");
const cartNavBtn = document.querySelector(".nav-icon-cart");

//cart nodes from the dom
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");

const productsInTheDOM = document.querySelector(".products-area");
const cartIterms = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
//const cartContent = document.querySelector(".cart-content");
//
let cart = [];

//
let buttonsInTheDOM = [];
//generate Ui
class UI {
  displayProducts(stock) {
    let result = "";
    stock.forEach((product) => {
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
    productsInTheDOM.innerHTML = result;
  }

  getBtnsBag() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsInTheDOM = buttons;
    //console.log(buttons);
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inTheCart = cart.find((item) => item.id === id);
      if (inTheCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        //get product from the stock or products from local storage and store it in a object
        let cartItem = { ...Storage.getProduct(id), units: 1 };

        //add item or product clicked or chosen to the cartarray
        cart = [...cart, cartItem];

        //save stored cart to the local storage
        Storage.saveCurrentCart(cart);
        //set cartvalues =>cart array
        this.updateSetCartValues(cart);
        //diplay cart item
        this.addCartItem(cartItem);

        //show cart
        this.showCaseCart();
      });
    });
  }

  updateSetCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.units;
      itemsTotal += item.units;
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
                <h5>R ${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>
        remove
                </span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.units}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>`;
    //console.log(cartDom)
    cartContent.appendChild(div);

    //cartDom.appendChild(cartContent);
    //cartOverlay.appendChild(cartDom);
    //console.log(cartDom)
  }

  showCaseCart() {
    cartOverlay.classList.add("transparentCover");
    cartDom.classList.add("showCaseCart");
  }

  setUpApplication() {
    cart = Storage.getCartFromLocalStorage();
    this.updateSetCartValues(cart);
    this.fillupCart(cart);
    cartBtn.addEventListener("click", this.showCaseCart);
    closeCartButton.addEventListener("click", this.hideCart);
  }

  fillupCart(cart) {
    cart.forEach((item) => {
      this.addCartItem(item);
    });
  }

  hideCart() {
    cartOverlay.classList.remove("transparentCover");
    cartDom.classList.remove("showCaseCart");
  }

  cartFunctionality() {
    //this is for cart clear button
    clearCartButton.addEventListener("click", () => {
      this.clearCart();
    });

    //inside cart logic
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        //store the item in a variable
        let removeThisItem = event.target;
        let itemId = removeThisItem.dataset.id;

        // this line below is for removing from the dom
        cartContent.removeChild(removeThisItem.parentElement.parentElement);
        //this one below is for removing from cart array
        this.removeThisItem(parseInt(itemId));
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addunits = event.target;
        let itemId = addunits.dataset.id;
        let temperalItem = cart.find((item) => item.id === parseInt(itemId));
        temperalItem.units = temperalItem.units + 1;
        Storage.saveCurrentCart(cart);
        this.updateSetCartValues(cart);
        addunits.nextElementSibling.innerText = temperalItem.units;

      } else if (event.target.classList.contains("fa-chevron-down")) {
        let subtractunits = event.target;
        let itemId = subtractunits.dataset.id;
        let temperalItem = cart.find((item) => item.id === parseInt(itemId));
        temperalItem.units = temperalItem.units - 1;
        if (temperalItem.units > 0) {
          Storage.saveCurrentCart(cart);
          this.updateSetCartValues(cart);
          subtractunits.previousElementSibling.innerText = temperalItem.units;

        } else {
          cartContent.removeChild(subtractunits.parentElement.parentElement);
          this.removeThisItem(parseInt(itemId));
        }
       
        
      }
    });
  }

  clearCart() {
    // Remove all items from the cart array
    cart = [];
    this.updateSetCartValues(cart);
    Storage.saveCurrentCart(cart);

    // Remove all items from the cart DOM
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }

    // Enable all add to cart buttons
    buttonsInTheDOM.forEach((button) => {
      button.disabled = false;
      button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    });

    this.hideCart();
  }

  removeThisItem(id) {
    console.log(id);
    cart = cart.filter((cartItem) => cartItem.id !== id);
    console.log(cart);
    //console.log(cart);
    this.updateSetCartValues(cart);
    //save cart in local storage
    Storage.saveCurrentCart(cart);
    let button = this.getSingleBtn(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }

  getSingleBtn(id) {
    return buttonsInTheDOM.find((button) => button.dataset.id === id);
  }
} // end of UI  class

//storage

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // set up application
  ui.setUpApplication();
  //get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);

      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBtnsBag();
      ui.cartFunctionality();
    });
});
//console.log("Hello ");
