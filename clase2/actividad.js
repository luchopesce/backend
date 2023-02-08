const productos = [
    {
        manzanas: 5,
        pera: 2,
        carne: 4,
        sandia: 3,
    },
    {
        manzanas: 5,
        pera: 2,
        pan: 2,
        mandarinas: 5
    },
]

const tiposProductos = Object.keys({...productos[0], ...productos[1]})

console.log(tiposProductos)


let cantidadTotal = 0

for (const elem of productos){
    cantidadTotal += Object.values(elem).reduce((acc, currentAcc) =>{
        return acc += currentAcc
    }, 0)
}

console.log(cantidadTotal)