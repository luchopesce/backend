const http = require("http")

const server = http.createServer((req, res) =>{
    res.write("asd mundo")
    res.end()
})

server.listen(3000, () =>{
    console.log("Server listening on port 8080")
})