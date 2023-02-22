import express from "express"

const app = express()

app.get("/saludo", (req,res) =>{
    res.send("Hola world")
})


app.get("/usuario", (req,res) =>{
    res.json({
        firstName: "Luciano",
        lastName: "Pesce",
        edad: "25",
        sexo: "masculino"
    })
})

app.listen(3000, ()=>{
    console.log("Server listening on port 8080")
})