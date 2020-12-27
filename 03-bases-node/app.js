const argv = require('./config/yargs.js').argv;
const colors = require('colors');
const {crearArchivo, listarTabla} = require('./multiplicar/multiplicar.js');

let comando = argv._[0];

switch(comando){
    case 'listar':
        listarTabla(argv.base, argv.limite);
    break;
    case 'crear':
        crearArchivo(argv.base, argv.limite)
        .then(archivo => console.log(`Archivo creado: ${archivo}`.green))
        .catch(err => console.log(err.red));
    break;
    default:
        console.log("no reconocido");
    break;
}

