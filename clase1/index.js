function mostrarLista(arr) {
    if (arr.length === 0) {
        return "Lista vacia"
    }

    for (const elem of arr) {
        console.log(`Elemento: ${elem}`)
    }

    return arr.length
}

const result1 = mostrarLista([])
console.log(result1)

const result2 = mostrarLista(['Marla', 'Federico', 'Rocio'])
console.log(result2)

const result3 = mostrarLista(10)
console.log(result3)