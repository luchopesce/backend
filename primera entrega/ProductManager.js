class ProductManager {
    products = []

    getProducts() {
        return this.products
    }

    getProductById(productId) {
        const productoExist = this.products.find((product) => product.id === productId)
        if (productoExist) {
            return JSON.stringify(productoExist)
        }
        else {
            throw new Error(`El id: ${productId}, no existe`)
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (title, description, price, thumbnail, code, stock === undefined || null) {
            throw new Error(`Debe completar los campos obligatorios`)
        }

        const productoExist = this.products.find((item) => item.code === code)
        if (productoExist) {
            throw new Error(`El codigo unico ${code}, ya existe, ingrese otro valor`)
        }

        const newProduct = {
            id: this.products.length,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products = [...this.products, newProduct]
    }
}

const productos = new ProductManager()

console.log(productos.getProducts())
productos.addProduct("Samsung", "Celular smartphone", 200, "/img/samsungs20.jpg", 20230, 300)
console.log(productos.getProducts())
productos.addProduct("Iphone", "Celular iphone", 500, "/img/iphone.jpg", 20230, 100)
console.log(productos.getProducts())
const productExiste = productos.getProductById(1)
console.log(`Producto encontrado: ${productExiste}`)
const productNoExiste = productos.getProductById(3)

