import Storage from "./localStorage.mjs";
// display the products
//let localStorage = new saveProductsToLocalStorage();
const productDom = document.querySelector(".products-center");

const cartIterms = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

//local storage class*/

export default class Ui {
  constructor(cart,) {
    this.cart = cart;
    //this.cartIterms=cartIterms;
    //this.cartTotal=cartTotal;
    this.buttonsDom = buttonsDom;
  }

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
    productDom.innerHTML = result;
  }

  getBagButtons(buttonsDom) {
    //get all the button turn them into an array using three dots
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;

      let inCart = this.cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        //get product from the produts and
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        //add product to the cart
        this.cart = [...this.cart, cartItem];

        //save cart in local storage
        Storage.saveCart(this.cart);
        //set cart values
        this.setCartValues(this.cart);
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

  //this function creates a template of the item that has been selected and add it to the cart content
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
    <img src=${item.image}>
    <div>
        <h4>${item.title}</h4>
        <h5>$ ${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>

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
    const cartDom = document.querySelector(".cart");
    const cartOverlay = document.querySelector(".cart-items");

    cartOverlay.classList.add('transparentBcg');
    cartDom.classList.add('showCart');
  }
}
