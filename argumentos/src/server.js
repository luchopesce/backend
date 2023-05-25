import express from 'express';
import { config } from "./config/config.js";
import { fork } from 'child_process';
import { operacionCompleja } from './process/childProcess.js';
import { __dirname } from './utils.js';

const app = express();
const port = config.server.port

app.listen(port, () => {console.log(`Server running on port ${port}`)});

app.get('/suma-b', (req, res) => {
    const resultado = operacionCompleja()
    res.json(`resultado de la suma: ${resultado}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/suma', (req, res) => {
    const childProcess = fork(__dirname + '/process/childProcess.js');
    childProcess.send('start');
    childProcess.on('message', (resultado) => {
        res.json(`resultado de la suma: ${resultado}`)
    })
})
