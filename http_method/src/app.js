import express from "express"

const app = express()
app.use(express.json())
let users = []

app.get("/users", (req,res) =>{
    res.send(users)
})

app.post("/users", (req,res)=>{
    const userData = {
        ...req.body,
        id: users.length
    }

    if(!req.body.username || !req.body.email){
        return res.status(400).send({
            error: "Error de datos"
        })
    }

    users = [...users, userData]

    res.status(201).send(users)
})

app.put("/users/:id", (req,res)=>{
    const userId = Number(req.params.id)
    const updateUser = req.body

    if(!updateUser.username || !updateUser.email){
        return res.status(400).send({
            error: "Error de datos"
        })
    }

    if(!users.find((u) => u.id === userId)){
        return res.status(404).send({
            error: `Usuario con el ID: ${userId} no se encuentra`
        })
    }

    users = users.map((u) =>{
        if(u.id === userId){
            return {
                ...updateUser,
                id:u.id
            }
        }
        return u
    })

    return res.send({
        users,
        message: `El usuario ID: ${userId}, se actualizo correctamente`
    })
})

app.delete("/users/:id", (req,res)=>{
    const userId = Number(req.params.id)
    const userUpdate = users.filter((u) => u.id !== userId)

    if(userUpdate.length === users.length){
        return res.status(404).send({error: `El usuario con el ID: ${userId}, no existe` })
    }
    
    users = userUpdate

    return res.status(200).send(users)
})

app.listen(8080, ()=>{
    console.log("Server listening on port 8080")
})