let loadingScreen = document.querySelector(".loadingScreen");
function removeLoadingScreen() {
  loadingScreen.parentElement.removeChild(loadingScreen);
}
window.addEventListener("load", async () => {
  const productsURL = "https://61e071bb63f8fc00176187aa.mockapi.io/products";
  const result = await fetch(productsURL);
  const products = await result.json();
  console.log(products);
  const productContainer = document.querySelector(".productsList");
  const productsCard = products
    .map(
      (product) =>
        `   <div class="card"> 
            <img src="${product.img}">
            <h2 class="productName">${product.name}</h2>
            <p class="price">${product.price} RON</p>
            <div class="flexButton">
                <p><button class="btn-details">See details</button></p>
                <p><button class="btn-addToCart">Add to Cart</button></p>
            </div>
        </div>
    `
    )
    .join("");
  productContainer.innerHTML = productsCard;
  removeLoadingScreen();
});
