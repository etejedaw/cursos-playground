const argv = require('./config/yargs').argv;
const toDo = require('./to-do/to-do');

let comando = argv._[0];
 
switch(comando){
    case 'new':
        toDo.newTask(argv.description);
        console.log("Added Task");
    break;
    case 'show':
        toDo.getList();
    break;
    case 'update':
        toDo.updateTask(argv.id, argv.status);
    break;
    case 'delete':
        toDo.deleteTask(argv.id);
    break;
    default:
        console.log(`ERROR: command "${comando}" not found.`);
    break;
};