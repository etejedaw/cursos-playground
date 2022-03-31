const fs = require('fs');

let listarTabla = (base, limite) => {
    for(let i = 0; i < limite; i++){
        console.log(`${base} x ${i+1} = ${base*(i+1)}`);
    }
}

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)){
            reject(`"${base}" no es un número`);
            return;
        }
        let file = `tablas/tabla-base-${base}.txt`;
        let data = "";
        for(let i = 0; i < limite; i++) data += (`${base} x ${i+1} = ${base*(i+1)}\n`);
        fs.writeFile(file, data, (err) => {
            if (err) reject(err);
            else resolve(`tabla-base-${base}.txt`);
        });
    });
};

module.exports = {
    crearArchivo,
    listarTabla
};