const person = {name:"Luciano", lastname: "Pesce"}

const personInfo = {rol: "tutor"}

const fullPerson = {
    ...person,
    ...personInfo
}

//{ name: 'Luciano', lastname: 'Pesce', rol: 'tutor' }
//console.log(fullPerson)


const {rol, ...resto} = fullPerson

console.log(rol, resto)

