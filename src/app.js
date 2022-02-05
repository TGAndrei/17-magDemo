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
                <p><button data-product-id=${product.id} class="btn-addToCart">Add to Cart</button></p>
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
// ADD TO CART FUCTION
document.querySelector(".productsList").addEventListener("click", addToCart);
async function addToCart(event) {
  const addToCartBtn = event.target;
  let productId = addToCartBtn.getAttribute("data-product-id");
  console.log(productId);
  const productURL = `https://61e071bb63f8fc00176187aa.mockapi.io/products/${productId}`;
  const result = await fetch(productURL);
  const product = await result.json();

  let cart = [];
  if (localStorage.getItem("cart") == null) {
    cart.push({ ...product, noOfProducts: 1 });
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.find(
      (productFromCart) => productFromCart.id == product.id
    );
    if (productInCart != undefined) {
      productInCart.noOfProducts++;
      console.log("Produsul exista in cos");
    } else {
      const productToBeAddedInCart = { ...product, noOfProducts: 1 };
      cart.push(productToBeAddedInCart);
      console.log("Produsul a fost adaugat prima oara in cos");
    }
  }

  console.log(cart);
  if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
}
