const fs = require("fs")
const crypto = require("crypto")

class UserManager {
    #path
    constructor(path) {
        this.#path = path
    }

    async createUser(firstName, lastName, username, password) {
        const users = await this.getUser()
        const checkUser = users.find((u) => u.username === username)
        if (checkUser) {
            throw new Error(`El usuario ${username} ya existe, ingrese otro username`)
        }

        const salt = crypto.randomBytes(16).toString("hex")
        const hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512")
            .toString("hex")

        const newUser = {
            id: users.length,
            firstName,
            lastName,
            username,
            password: {
                hash: hashPassword,
                salt,
            }
        }
        const userUpdate = [...users, newUser]
        await fs.promises.writeFile(this.#path, JSON.stringify(userUpdate))
    }

    async validateUser(username, password) {
        const users = await this.getUser()

        const userToValidate = users.find((u) => u.username === username)

        if (!userToValidate) {
            throw new Error(`User with username ${username} doesn't exist`)
        }

        const hashedInputPassword = crypto.pbkdf2Sync(password, userToValidate.password.salt, 1000, 64, "sha512").toString("hex")

        if (userToValidate.password.hash === hashedInputPassword) {
            return `Logueado con exito`
        }
        else {
            throw new Error("Password invalida")
        }
    }

    async getUser() {
        try {
            const users = await fs.promises.readFile(this.#path, "utf8")
            return JSON.parse(users)
        }
        catch (e) {
            return []
        }
    }
}

async function main() {
    const manager = new UserManager("./User.json")

    // const user = await manager.getUser()

    // await manager.createUser("lucho", "pesce", "luche96", "asdasd")

    // console.log(user)

    const validateToUser = await manager.validateUser("luche96", "asdasd")

    console.log(validateToUser)
}

main()


