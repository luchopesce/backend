let count = 0
let myObj = {}

while (count < 10000) {
    count++
    let myNumber = Math.random() * 20
    myNumber = Math.ceil(myNumber)

    if(myObj[myNumber]){
        myObj[myNumber]++
    }
    else{
        myObj[myNumber] = 1
    }
}

console.log(myObj)