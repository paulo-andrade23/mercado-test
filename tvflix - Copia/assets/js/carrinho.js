const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".movie-card");
//cart
let cart = [];

//getting the products




class Products {
    async getProducts(){
        try{
        let result = await fetch("products.json");
        let data = await result.json();
        let products = data.items;
        products = products.map(item =>{
            const {title, price} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title, price, id, image};
        });
        return products;
        }catch(error) {
            console.log(error);
        }
    }
}
//display products
class UI {
    displayProducts(products){
      let result = '';
        products.forEach(products => {
            result += `
            
            <div class="movie-card">
            <figure class="poster-box card-banner">
              <img src=${product.image} class="img-cover">
            </figure>
          <h4 class="title">
                <font style="vertical-align: inherit;">${product.title}</font>
            </h4><br>
            <div class="meta-list">
              <div class="meta-item">
                <span class="span">
                    <font style="vertical-align: inherit;">R$${product.price}</font>
                </span>
              </div><br>
              <div class="card-badge">
                <button class="bag-btn" data-id=${product.id}>
                  <i class="fa fa-cart-arrow-down"></i>
                  <font style="vertical-align: inherit;">+</font>
                </button>
              </div>
              </div>
         
            `; 
        });
        productsDOM.innerHTML = result;
    }
}
//local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

//get all products
products.getProducts().then(products => ui.displayProducts(products))
});
