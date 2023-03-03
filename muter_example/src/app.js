import express, { urlencoded } from "express";
import uploader from "./file-upload.js";

const app = express()
app.use(express.static("public"))
app.use(urlencoded({ extended: true }))

let users = []

app.get("/api/users", (req, res) => {
    res.send(users)
})

app.post("/api/users", uploader.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("File required")
    }

    const newUser = {
        ...req.body,
        profilePicture: req.file.path
    }

    users = [...users, newUser]

    res.status(201).send(newUser)
})

app.listen(8080, () => {
    console.log("Server listening on port 8080")
})