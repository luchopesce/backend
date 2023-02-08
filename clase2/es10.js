const str = "      Hola       "
const str1 = "      Hola"


console.log(str.trim())
console.log(str.trimStart())
console.log(str.trimEnd())

const arr = [
    [1, 2], [2, 5], [2, [3], 5]
]

console.log(arr)
console.log(arr.flat(2))

const arr2 = ["Hello world", "My name is luciano"]

const result = arr2.flatMap((el) => {
    return el.split(" ")
})


console.log(result)