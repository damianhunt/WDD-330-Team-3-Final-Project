let url = "https://fakestoreapi.com/products";
//getting the products from API

export default class Products {
  async getProducts() {
    try {
      let result = await fetch(url);
      if (result.ok) {
        let data = await result.json();
       //console.log(data);
        return data;
        
      }
    } catch (error) {
      return console.log(error);
    }
  }
}
