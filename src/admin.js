// Loading products from API
window.addEventListener("load", async () => {
  const productsURL = "https://61e071bb63f8fc00176187aa.mockapi.io/products";
  const result = await fetch(productsURL);
  const products = await result.json();
  console.log(products);
  const productContainer = document.querySelector("tbody");
  const productsCard = products
    .map(
      (product) =>
        `   <tr class="here">
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.desc}</td>
          <td>${product.img}</td>
          <td class="actions">
          <p class="visibleOrNot"><i class="far fa-eye-slash"></i></p>
          <p class="edit"><i class="fas fa-pen fa-xs"></i></p>
          <p class="trash"><i class="fas fa-trash fa-xs"></i></p>
          </td>
        </tr>
      `
    )
    .join("");
  productContainer.innerHTML = productsCard;
});

// Function for delete a product from API
let removeButton = document.querySelector("tbody");
removeButton.addEventListener("click", deleteProduct);
function deleteProduct(event) {
  if (event.target.classList.contains("fa-trash")) {
    let targetId =
      event.target.parentElement.parentElement.parentElement.firstElementChild
        .textContent;
    console.log(targetId);
    async function deleteProductOnApi() {
      let newProduct = await fetch(
        `https://61e071bb63f8fc00176187aa.mockapi.io/products/${targetId}`,
        {
          method: "DELETE",
        }
      );
    }
    deleteProductOnApi();
    loadProducts();
  }
}

// Functions for open and close the "add new product"/"edit product" popup
/*After pressing the "Add new product", will display the menu for adding new product, nor for editing the product.
  If you press "Add new product" when pop-up for "Edit product" it's already there, empty the inputs and delete the "editButton" id */
function openForm() {
  if (document.getElementById("editButton")) {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("imgURL").value = "";
    document
      .querySelector("#myForm > div > div > button:nth-child(1)")
      .removeAttribute("id");
  }
  document.getElementById("myForm").style.display = "block";
  document.querySelector("#myForm > div > h1").innerHTML = "Add product";
  document.querySelector(
    "#myForm > div > div > button:nth-child(1)"
  ).innerHTML = "Submit";
}
//// After pressing "close" the inputs will be emptied
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("imgURL").value = "";
  document
    .querySelector("#myForm > div > div > button:nth-child(1)")
    .removeAttribute("id");
}

let submitButton = document.querySelector(
  "#myForm > div > div > button:nth-child(1)"
);
submitButton.addEventListener("click", showNewProduct);
function showNewProduct() {
  // Get the values from input
  let productId = document.getElementById("productId").value;
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;
  let productDesc = document.getElementById("productDesc").value;
  let productImg = document.getElementById("imgURL").value;
  // checking if any input is empty for not creating an useless CRUD command
  if (
    productId != 0 &&
    productName != 0 &&
    productPrice != 0 &&
    productDesc != 0 &&
    productImg != 0
  ) {
    // Command for PUT to api (Edit product)
    if (document.getElementById("editButton")) {
      async function editProductOnApi() {
        let newProduct = await fetch(
          `https://61e071bb63f8fc00176187aa.mockapi.io/products/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: `${productId}`,
              name: `${productName}`,
              price: `${productPrice}`,
              desc: `${productDesc}`,
              img: `${productImg}`,
            }),
          }
        );
      }
      editProductOnApi();
    }
    // Command for POST to api (Add new)
    else {
      async function addNewProductOnApi() {
        let newProduct = await fetch(
          "https://61e071bb63f8fc00176187aa.mockapi.io/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: `${productId}`,
              name: `${productName}`,
              price: `${productPrice}`,
              desc: `${productDesc}`,
              img: `${productImg}`,
            }),
          }
        );
      }
      addNewProductOnApi();
    }
  }
}

// Edit the data
let editButton = document.querySelector("tbody");
editButton.addEventListener("click", editProduct);
function editProduct(event) {
  if (event.target.classList.contains("fa-pen")) {
    // get the product where i press edit button and put the info in popup
    document.getElementById("productId").value =
      event.target.parentElement.parentElement.parentElement.cells[0].innerHTML;
    document.getElementById("productName").value =
      event.target.parentElement.parentElement.parentElement.cells[1].innerHTML;
    document.getElementById("productPrice").value =
      event.target.parentElement.parentElement.parentElement.cells[2].innerHTML;
    document.getElementById("productDesc").value =
      event.target.parentElement.parentElement.parentElement.cells[3].innerHTML;
    document.getElementById("imgURL").value =
      event.target.parentElement.parentElement.parentElement.cells[4].innerHTML;
    openForm();
    // edit the popup to be for editing, not for add new product
    document.querySelector("#myForm > div > h1").innerHTML = "Edit product";
    document.querySelector(
      "#myForm > div > div > button:nth-child(1)"
    ).innerHTML = "Edit";
    document
      .querySelector("#myForm > div > div > button:nth-child(1)")
      .setAttribute("id", "editButton");
  }
}

// DE PUS GO UP PAGE CAND APESI PE EDIT
