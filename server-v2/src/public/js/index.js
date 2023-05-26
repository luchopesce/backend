

const listCart = document.getElementById("list-carts");
const listProducts = document.getElementById("list-products");
const pageList = document.getElementById("list-page");
const logoutBtn = document.getElementById("logout");

if (listCart || listProducts) {
  var socket = io();
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    fetch("api/auth/logout", {
      method: "post"
    })
      .then((res) => res.json())
      .then(() => window.location.href="/login")
  });
}

if (listProducts) {
  socket.on("list-products", (data) => {
    listProducts.innerHTML = "";
    if (data) {
      for (const el of data.docs) {
        const li = document.createElement("li");
        const cartButton = document.createElement("button");
        cartButton.innerText = "Agregar al carrito";
        li.innerText = `${el.title}: ${el.price}, _id: ${el._id}, CODE: ${el.code}, STATUS:${el.status}, STOCK:${el.stock}`;
        li.appendChild(cartButton);
        listProducts.appendChild(li);
      }
      if (pageList) {
        pageList.innerHTML = "";
        if (data.hasPrevPage) {
          const buttonPrev = document.createElement("button");
          buttonPrev.innerText = "Anterior";
          buttonPrev.addEventListener("click", (evt) => {
            evt.preventDefault();
            socket.emit("page", data.prevPage);
          });
          pageList.appendChild(buttonPrev);
        }
        if (data.hasNextPage) {
          const buttonNext = document.createElement("button");
          buttonNext.innerText = "Siguiente";
          buttonNext.addEventListener("click", (evt) => {
            evt.preventDefault();
            socket.emit("page", data.nextPage);
          });
          pageList.appendChild(buttonNext);
        }
        const spanPage = document.createElement("span");
        spanPage.innerHTML = `Pagina ${data.page} de ${data.totalPages}`;
        pageList.appendChild(spanPage);
      }
    }
  });
}