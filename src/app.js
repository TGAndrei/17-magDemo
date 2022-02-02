let loadingScreen = document.querySelector(".loadingScreen");

// Function for loadingScreen if page isn't loaded yet.

function removeLoadingScreen() {
  loadingScreen.parentElement.removeChild(loadingScreen);
}

// Loading products

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
                <p><button class="btn-details"><a href="details.html?id=${product.id}">See details</a></button></p>
                <p><button class="btn-addToCart">Add to Cart</button></p>
            </div>
        </div>
    `
    )
    .join("");
  productContainer.innerHTML = productsCard;
  removeLoadingScreen();
});

// keybind to acces admin.html ( " CTRL " + " ` ")

document.onkeyup = function (e) {
  var evt = window.event || e;
  if (evt.keyCode == 192 && evt.ctrlKey) {
    window.open("admin.html", "_self");
  }
};
