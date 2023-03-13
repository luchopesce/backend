console.log("Probando");

const socket = io();

const listProducts = document.getElementById("list-products");
socket.on("list-products", (data) => {
  listProducts.innerHTML = "";

  for (const el of data) {
    const li = document.createElement("li");
    li.innerText = `${el.title}: ${el.price}`;
    listProducts.appendChild(li);
  }
});
