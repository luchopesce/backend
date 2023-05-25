export function operacionCompleja (){
    let result = 0;
    for(let i = 0; i < 5e9; i++){
        result += i;
    }
    return result;
}

process.on('message', (msg) => {
    if(msg === 'start'){
        const resultado = operacionCompleja();
        process.send(resultado);
    }
})