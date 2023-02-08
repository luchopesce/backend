class Person {
    static especie = "Humano"
    constructor(name) {
        this.name = name
    }

    saludar() {
        console.log(`Mi nombre es: ${this.name}`)
    }
}

const person = new Person("Luciano")

person.saludar()


console.log(Person.especie)