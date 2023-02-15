const fs = require("fs")

class ProductManager {
    #path = "./Productos.json"

    async getProducts() {
        try {
            const product = await fs.promises.readFile(this.#path, "utf-8")
            return JSON.parse(product)
        }
        catch (err) {
            return []
        }

    }

    async getProductById(productId) {
        const readProducts = await this.getProducts()
        const productoExist = readProducts.find((product) => product.id === productId)
        if (productoExist) {
            return JSON.stringify(productoExist)
        }
        else {
            throw new Error(`El id: ${productId}, no existe`)
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        const readProducts = await this.getProducts()

        if (title, description, price, thumbnail, code, stock === undefined || null) {
            throw new Error(`Debe completar los campos obligatorios`)
        }

        const checkCode = readProducts.find((product) => product.code === code)
        if (checkCode){
            throw new Error(`El code ${code}, ya existe ingrese otro`)
        }

        const newProduct = {
            id: readProducts.length,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const updateProduct = [...readProducts, newProduct]

        await fs.promises.writeFile(this.#path, JSON.stringify(updateProduct))
    }

}

async function main (){
    const productos = new ProductManager()

    // await productos.addProduct("Iphone", "Celular iphone", 150, "./img/algo", 22400, 20)

    let products = await productos.getProductById(1)

    console.log(products)
}

main()



// console.log(productos.getProducts())
// productos.addProduct("Samsung", "Celular smartphone", 200, "/img/samsungs20.jpg", 20230, 300)
// console.log(productos.getProducts())
// productos.addProduct("Iphone", "Celular iphone", 500, "/img/iphone.jpg", 20230, 100)
// console.log(productos.getProducts())
// const productExiste = productos.getProductById(1)
// console.log(`Producto encontrado: ${productExiste}`)
// const productNoExiste = productos.getProductById(3)

