import { config } from "./config/config.js";

// process.on("exit" , () => {
//     console.log("La aplicacion termino")
// })

// process.on("uncaughtException" , (err , origen) => {
//     console.log(`Hubo un error no controlado: ${err.message} , origen: ${origen}`)
// })

// funcionQueNoExiste()

console.log(config)

process.on("exit", (code) => {
  if (code === -4) {
    return console.log("Hubo un error");
  }
  console.log("La aplicacion termino");
});

const listNumbers = (...numbers) => {
  console.log(numbers);

  let error = "";

  numbers.forEach((number) => {
    if (isNaN(parseInt(number))) {
      error = "Invalid parameters";
    }
  });
  console.log({
    error,
    data: numbers.map((number) => typeof number),
  });

  if (error) {
    process.exit(-4);
  }
};

listNumbers(1, 2, 3, "a", true);
