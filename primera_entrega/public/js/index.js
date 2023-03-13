console.log("Probando");

const socket = io();

socket.on("new", (data)=>{
  console.log(data)
})

const listProducts = document.getElementById("list-products");
socket.on("list-products", (data) => {
  listProducts.innerHTML = "";

  for (const el of data) {
    const li = document.createElement("li");
    li.innerText = `${el.title}: ${el.price}`;
    listProducts.appendChild(li);
  }
});

const newListProducts = document.getElementById("list-products");
socket.on("new", (data) => {
  newListProducts.innerHTML = "";

  for (const el of data) {
    const li = document.createElement("li");
    li.innerText = `${el.title}: ${el.price}`;
    newListProducts.appendChild(li);
  }
});
