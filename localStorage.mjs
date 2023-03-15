//local storage
// establish a function that takes an array and stringfy it 
/*
when you access the localStorage there is many functions available to you this time use the setItem
 then pass the first argument is a key that will be matched with an array of the products passed as an argument 

*/
export default class saveProductsToLocalStorage{
    saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
}