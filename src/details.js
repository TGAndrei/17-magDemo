let loadingScreen = document.querySelector(".loadingScreen");

// Function for loadingScreen if page isn't loaded yet.

function removeLoadingScreen() {
  loadingScreen.parentElement.removeChild(loadingScreen);
}
// Loading product
window.addEventListener("load", async () => {
  let searchParamString = window.location.search;
  const searchParam = new URLSearchParams(searchParamString);
  const productId = searchParam.get("id");

  const productsURL = `https://61e071bb63f8fc00176187aa.mockapi.io/products/${productId}`;
  const result = await fetch(productsURL);
  const product = await result.json();
  console.log(product);

  const productCard = `
  <div class="card">
          <div class="product-left">
            <div class="titleProduct">
              <h1>${product.name}</h1>
            </div>
            <div class="product-main">
              <p> ${product.desc} </p>
            </div>      
            <div class="product-details">
              <div class="product-total">
                <p>Pret: ${product.price} RON</p>
              </div>
            </div>
            <div class="product-btns">
              <a href="#" class="product-add">Add To Cart</a>
            </div>
          </div>
          <div class="product-right">
            <img
              src="${product.img}"
              alt=""
            />
          </div>
        </div>
  `;
  document.querySelector(".product-details").innerHTML = productCard;
  removeLoadingScreen();
});
