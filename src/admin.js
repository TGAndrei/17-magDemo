window.addEventListener("load", async () => {
  const productsURL = "https://61e071bb63f8fc00176187aa.mockapi.io/products";
  const result = await fetch(productsURL);
  const products = await result.json();
  console.log(products);
  const productContainer = document.querySelector("tbody");
  const productsCard = products
    .map(
      (product) =>
        `   <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.desc}</td>
          <td>${product.img}</td>
          <td class="actions">
            <a href="#" class="visibleOrNot"
              ><i class="far fa-eye-slash"></i
            ></a>
            <a href="#" class="edit"><i class="fas fa-pen fa-xs"></i></a>
            <a href="" class="trash"><i class="fas fa-trash fa-xs"></i></a>
          </td>
        </tr>
      `
    )
    .join("");
  productContainer.innerHTML = productsCard;
});
