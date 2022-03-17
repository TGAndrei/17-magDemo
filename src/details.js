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
              <a href="#" data-product-id=${product.id} class="product-add">Add To Cart</a>
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

// ADD TO CART FUCTION
document.querySelector(".product-details").addEventListener("click", addToCart);
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

// Go to cart just if cart isn't empty

const cartBtn = document.querySelector(
  "body > div.header > ul > li:nth-child(2) > a"
);
cartBtn.addEventListener("click", ifCartIsEmpty);
function ifCartIsEmpty() {
  if (
    localStorage.getItem("cart") == null ||
    localStorage.getItem("cart") == "[]"
  ) {
    alert("Add a product in cart first");
  } else {
    window.open("cart.html", "_self");
  }
}
