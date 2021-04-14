const chalk = require('chalk');

const showMenu = () => {
    return new Promise(resolve => {
        console.clear();

        console.log(chalk.green("===================="));
        console.log(chalk.green("Seleccione una opción"));
        console.log(chalk.green("===================="));

        console.log(`${chalk.green("1.")} Crear Tarea`);
        console.log(`${chalk.green("2.")} Listar Tareas`);
        console.log(`${chalk.green("3.")} Tareas Completadas`);
        console.log(`${chalk.green("4.")} Tareas Pendientes`);
        console.log(`${chalk.green("5.")} Completar Tareas`);
        console.log(`${chalk.green("6.")} Borrar Tarea`);
        console.log(`${chalk.green("0.")} Salir`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Seleccione una opción ", answer => {
            readline.close();
            resolve(answer);
        });
    });
}

const pause = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Presione ${chalk.green('ENTER')} para continuar`, answer => {
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    showMenu,
    pause
}