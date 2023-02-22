import express from "express"

const app = express()

const users = [
    { id: "1", name: "lucho" },
    { id: "2", name: "matias" },
    { id: "3", name: "pesce" }
]

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    const { id } = req.params

    const user = users.find((u) => u.id === id)

    if (!user) {
        return res
            .status(404)
            .send({ error: `No existe el usuario con el ID ${req.params.id}` })
    }
    res.json(user)
})

app.listen(3000, () => {
    console.log("Server listening")
})