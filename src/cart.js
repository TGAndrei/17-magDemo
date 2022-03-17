window.addEventListener("load", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  let total = 0;
  if (cart) {
    cart.forEach((product) => {
      total = total + Number(product.price) * product.noOfProducts;
    });

    const productCards = cart
      .map(
        (product) =>
          `
        <div class="Cart-Items">
            <div class="image-box">
              <img src="${product.img}" />
            </div>
            <div class="about">
              <h1 class="title">${product.name}</h1>
            </div>
            <div class="counter">
              <div data-product-id=${product.id} class="decrement btn">-</div>
              <div class="no-of-products">${product.noOfProducts}</div>
              <div data-product-id=${product.id} class="increment btn">+</div>
            </div>
            <div class="prices">
              <div class="amount">${product.price}</div>
              <div class="save"><a href="details.html?id=${product.id}">Product details</a></div>
              <div data-product-id=${product.id} class="delete">Remove</div>
            </div>
          </div>`
      )
      .join("");

    let totalPriceCard = `${total} RON`;
    document.querySelector(".allProducts").innerHTML = productCards;
    document.querySelector(".total-amount").innerHTML = totalPriceCard;
  }
});

const cartContainer = document.querySelector(".container");
cartContainer.addEventListener("click", handleCartActions);

function handleCartActions(event) {
  const targetButton = event.target;
  let cart = JSON.parse(localStorage.getItem("cart"));
  const productInCart = cart.find(
    (productFromCart) =>
      productFromCart.id == targetButton.getAttribute("data-product-id")
  );
  let quantityParagraph = targetButton.parentNode;

  if (targetButton.classList.contains("increment")) {
    productInCart.noOfProducts++;
  } else if (targetButton.classList.contains("decrement")) {
    if (productInCart.noOfProducts > 1) productInCart.noOfProducts--;
  } else if (targetButton.classList.contains("delete")) {
    productInCart.noOfProducts = 0;
    cart = cart.filter((product) => product.id != productInCart.id);
    targetButton.parentNode.parentNode.remove();
    ifCartIsEmpty();
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (productInCart) {
    let quantityForTotal = targetButton.parentNode.parentNode;
    quantityForTotal.querySelector(".no-of-products").innerHTML =
      productInCart.noOfProducts;

    let total = 0;
    cart.forEach((product) => {
      total = total + Number(product.price) * product.noOfProducts;
    });
    let totalPriceCard = `${total} RON`;
    document.querySelector(".total-amount").innerHTML = totalPriceCard;
  }
}

// If cart is empty, go back to main page

function ifCartIsEmpty() {
  let carthere = JSON.parse(localStorage.getItem("cart"));
  console.log(carthere);
  if (carthere.length == 1) {
    window.location.replace("homepage.html");
  }
}
