const inventarioProductos = {
    manzanas: 10,
    banana: 15,
    sandia: 2
}

console.log(Object.keys(inventarioProductos))
console.log(Object.values(inventarioProductos))
console.log(Object.entries(inventarioProductos))

let suma = 0
for (const elem of Object.values(inventarioProductos)) {
    suma += elem
}

console.log(suma)

const invetarioValues = Object.values(inventarioProductos)

const resultSuma = invetarioValues.reduce((acc, currentAcc) => {
    return acc += currentAcc
}, 0)

console.log(resultSuma)

