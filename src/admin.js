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

// Function for delete a product from html (upgrade needed)
let removeButton = document.querySelector("tbody");
console.log(removeButton);
removeButton.addEventListener("click", deleteProduct);
function deleteProduct(event) {
  console.log(event.target.classList);
  if (event.target.classList.contains("fa-trash")) {
    event.target.parentElement.parentElement.parentElement.remove();
  }
}

// Functions for open and close the "add new product" popup
//// After pressing the "Add new product", will display the menu for adding new product, nor for editing the product
function openForm() {
  document.getElementById("myForm").style.display = "block";
  let changeSubmitWithEdit = (document.querySelector(
    "#myForm > div > h1"
  ).innerHTML = "Add product");
  document.querySelector(
    "#myForm > div > div > button:nth-child(1)"
  ).innerHTML = "Submit";
}
//// After pressing "close" the inputs will be eptied
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("imgURL").value = "";
}

// Making a new row after pressing submit, making an object from inputs
let selectedRow = null;
function Product(id, name, price, desc, img) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.desc = desc;
  this.img = img;
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
  // checking if any input is empty for not creating an useless object
  if (
    productId != 0 &&
    productName != 0 &&
    productPrice != 0 &&
    productDesc != 0 &&
    productImg != 0
  ) {
    // create the object wich i will use later for the CREATE (crud)
    let product = new Product(
      `${productId}`,
      `${productName}`,
      `${productPrice}`,
      `${productDesc}`,
      `${productImg}`
    );
    console.log(product);
  }
  // Add the row with the info from inputs
  function insertDataFromProductLabel() {
    let table = document
      .getElementById("storeList")
      .getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.length);
    let cell6 = newRow.insertCell(0);
    cell6.innerHTML = `${productId}`;
    let cell5 = newRow.insertCell(1);
    cell5.innerHTML = `${productName}`;
    let cell4 = newRow.insertCell(2);
    cell4.innerHTML = `${productPrice}`;
    let cell3 = newRow.insertCell(3);
    cell3.innerHTML = `${productDesc}`;
    let cell2 = newRow.insertCell(4);
    cell2.innerHTML = `${productImg}`;
    let cell1 = newRow.insertCell(5);
    cell1.innerHTML = `<p class="visibleOrNot"><i class="far fa-eye-slash"></i></p>
    <p class="edit"><i class="fas fa-pen fa-xs"></i></p>
    <p class="trash"><i class="fas fa-trash fa-xs"></i></p>`;
    cell1.classList.add("actions");
  }
  if (
    productId != 0 &&
    productName != 0 &&
    productPrice != 0 &&
    productDesc != 0 &&
    productImg != 0
  )
    insertDataFromProductLabel();
  else {
    alert("You have to complete all blank spaces");
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
    //
  }
}

// let selectedRow = null;
// function onSubmit(e) {
//   event.preventDefault();
//   let newProductLabel = readFromNewProduct();
//   if (selectedRow === null) {
//     insertDataFromProductLabel(newProductLabel);
//   } else {
//   }
// }
