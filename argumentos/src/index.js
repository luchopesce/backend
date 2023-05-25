import { Command } from "commander";
import { config } from "./config/config.js";

// console.log(process.memoryUsage())

// console.log(process.argv.slice(0,2))

const program = new Command()

program.option('-d', 'variable de debug', false)
.option('-p <port>', 'puerto de conexion', 8080)
.option('-l <language>', 'idioma de la aplicacion', "es")
.requiredOption('-u, <user>', 'usuario de conexion', "no se recibio un usuario")

program.parse()

console.log("args: ", program.opts())
console.log("otros argumentos: ", program.args)

console.log(config)