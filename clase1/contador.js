class Contador {
    static cuentaGlobal = 0
    constructor(responsable){
        this.responsable = responsable
        this.cuenta = 0
    }

    getResponsable (){
        return this.responsable
    }

    contarNumero(){
        this.cuenta += 1
        Contador.cuentaGlobal += 1
        console.log(`Contador de: ${this.responsable}
        contador: ${this.cuenta}
        contador Global: ${Contador.cuentaGlobal}`)
    }
}

const contador1 = new Contador("Luciano")
const contador2 = new Contador("Ramiro")

console.log(contador1.getResponsable())
console.log(contador2.getResponsable())

contador1.contarNumero()
contador2.contarNumero()
contador1.contarNumero()