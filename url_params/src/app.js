import express from "express"

const app = express()

const users = [
    { id: "1", name: "lucho", edad: "22" },
    { id: "2", name: "matias", edad: "27" },
    { id: "3", name: "pesce", edad: "2" }
]

app.get("/users", async (req, res) => {
    const { id, edad, name } = req.query

    if (edad) {
        return res.send(users.filter((u) => u.edad === edad))
    }
    else {
        res.send(users)
    }

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