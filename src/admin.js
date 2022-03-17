const productTableBody = document.getElementById("addNewRow");
const addNewProductSubmitBtn = document.querySelector(".submit");
const productsURL = "https://61e071bb63f8fc00176187aa.mockapi.io/products";
const updateProductBtn = document.querySelector(".edit");

// Loading products from API
window.addEventListener("load", loadAllProducts);
async function loadAllProducts() {
  const result = await fetch(productsURL);
  const products = await result.json();
  const tableRows = products
    .map(
      (product) =>
        `   <tr class="here">
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.desc}</td>
          <td>${product.img}</td>
          <td class="actions">
          <p class="editBtn"><i data-product-id="${product.id}" class="fas fa-pen fa-xs edit"></i></p>
          <p class="trash"><i data-product-id="${product.id}" class="fas fa-trash fa-xs delete"></i></p>
          </td>
        </tr>
      `
    )
    .join("");
  productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener("click", handleProducts);
async function handleProducts(event) {
  const productId = event.target.getAttribute("data-product-id");
  if (event.target.classList.contains("delete")) {
    let response = await fetch(`${productsURL}/${productId}`, {
      method: "DELETE",
    });
    loadAllProducts();
  } else if (event.target.classList.contains("edit")) {
    openFormEdit();
    console.log("edit", productId);
    editProduct(productId);
    window.scrollTo(0, 0);
  }
}
// Add new product function
addNewProductSubmitBtn.addEventListener("click", addNewProduct);
async function addNewProduct(event) {
  event.preventDefault();
  const producNname = document.getElementById("name").value;
  const productPrice = document.getElementById("price").value;
  const productDesc = document.getElementById("desc").value;
  const productImgURL = document.getElementById("imgURL").value;
  let response = await fetch(productsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: producNname,
      price: productPrice,
      desc: productDesc,
      img: productImgURL,
    }),
  });
  let product = await response.json();

  let newProductTableRow = `  
  <tr class="here">
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.desc}</td>
    <td>${product.img}</td>
    <td class="actions">
    <p class="editBtn"><i data-product-id="${product.id}" class="fas fa-pen fa-xs edit"></i></p>
    <p class="trash"><i data-product-id="${product.id}" class="fas fa-trash fa-xs delete"></i></p>
    </td>
  </tr>`;

  productTableBody.innerHTML += newProductTableRow;

  // empty the inputs
  document.getElementById("productId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("imgURL").value = "";
}
// Edit product function
updateProductBtn.addEventListener("click", updateProduct);

async function updateProduct(event) {
  event.preventDefault();

  const productName = document.getElementById("name").value;
  const productPrice = document.getElementById("price").value;
  const productDesc = document.getElementById("desc").value;
  const productImgURL = document.getElementById("imgURL").value;
  // value from hidden input
  const productId = document.getElementById("productId").value;

  let response = await fetch(`${productsURL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: productId,
      name: productName,
      price: productPrice,
      desc: productDesc,
      img: productImgURL,
    }),
  });

  let data = await response.json();
  console.log(data);
  loadAllProducts();

  // empty the inputs
  document.getElementById("productId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("imgURL").value = "";
}

// Put values in input from the edit button row
async function editProduct(productId) {
  const producNname = document.getElementById("name");
  const productPrice = document.getElementById("price");
  const productDesc = document.getElementById("desc");
  const productImgURL = document.getElementById("imgURL");
  const productIdHiddenElement = document.getElementById("productId");

  let response = await fetch(`${productsURL}/${productId}`);
  let product = await response.json();

  producNname.value = product.name;
  productPrice.value = product.price;
  productDesc.value = product.desc;
  productImgURL.value = product.img;
  productIdHiddenElement.value = product.id;
}

// open and close popup functions
const openPopupAdd = document.querySelector(
  "body > div > div.topButtons > button"
);
const closePopup = document.querySelector(
  "#myForm > div > div > button.btn.cancel"
);
closePopup.addEventListener("click", closeForm);
openPopupAdd.addEventListener("click", openFormAdd);

function openFormAdd() {
  document.getElementById("myForm").style.display = "block";
  document.querySelector(
    "#myForm > div > div > button.btn.edit"
  ).style.display = "none";
  document.querySelector(
    "#myForm > div > div > button.btn.submit"
  ).style.display = "block";
  document.querySelector("#myForm > div > h1").innerHTML = "Add new product";
  // empty the inputs
  document.getElementById("productId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("imgURL").value = "";
}
function openFormEdit() {
  document.getElementById("myForm").style.display = "block";
  document.querySelector(
    "#myForm > div > div > button.btn.submit"
  ).style.display = "none";
  document.querySelector(
    "#myForm > div > div > button.btn.edit"
  ).style.display = "block";
  document.querySelector("#myForm > div > h1").innerHTML = "Edit product";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  // empty the inputs
  document.getElementById("productId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("imgURL").value = "";
}
