//import local storage where we are getting the items added to the cart
// display the products

const productDom = document.querySelector(".products-center");

export default class Ui {
  constructor(cart){
    this.cart =  cart;
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
  getBagButtons() {
    //get all the button turn them into an array using three dots
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach(button=>{
      let id =button.dataset.id;
      let inCart = this.cart.find(item=> item.id===id);
      if(inCart){
        button.innerText = "In Cart";
        button.disabled=true;
      }
        button.addEventListener('click',(event)=>{
          event.target.innerText= "IN Cart";
          event.target.disabled= true;
          //get product from the produts and 
          //add product to the cart
          //save cart in local storage
          //set cart values
          //diplay cart item
          //show cart
        }
        )
      
    });
  }
}
