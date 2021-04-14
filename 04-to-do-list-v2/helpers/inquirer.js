const inquirer = require('inquirer');
const chalk = require('chalk');

const question = [
    {
        type: 'list',
        name: 'answer',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: chalk.green("1. ").concat("Crear tarea")
            },
            {
                value: '2',
                name: chalk.green("2. ").concat("Listar tarea")
            },
            {
                value: '3',
                name: chalk.green("3. ").concat("Listar tarea completadas")
            },
            {
                value: '4',
                name: chalk.green("4. ").concat("Listar tareas pendientes")
            },
            {
                value: '5',
                name: chalk.green("5. ").concat("Completar tareas")
            },
            {
                value: '6',
                name: chalk.green("6. ").concat("Borrar tarea")
            },
            {
                value: '0',
                name: chalk.red("0. ").concat("Salir")
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log(chalk.green("===================="));
    console.log(chalk.green("Seleccione una opción"));
    console.log(chalk.green("===================="));

    const {answer} =  await inquirer.prompt(question);
    return answer;
}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${chalk.green("Enter")} para continuar`
        }
    ]
    await inquirer.prompt(question);
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0) return "Ingrese un valor";
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput
}