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
let removeButton = document.querySelector("tbody");
console.log(removeButton);
removeButton.addEventListener("click", deleteProduct);

function deleteProduct(event) {
  console.log(event.target.classList);
  if (event.target.classList.contains("fa-trash")) {
    event.target.parentElement.parentElement.parentElement.remove();
  }
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
