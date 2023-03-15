

//getting the products from API

export default class getProducts{
    async getProducts(){
       try{
           let result = await fetch("https://fakestoreapi.com/products")
           let data = await result.json();
           
           return data;
           console.log(data);
       }catch(error){
           return console.log(error);
       }
     
     
    }
   }
