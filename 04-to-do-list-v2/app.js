const {inquirerMenu, pause, readInput} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const {saveDB, readDB} = require('./helpers/saveFile');

const main = async() => {
    console.clear();
    let answer = '';
    const tasks = new Tasks();
    const taskDB = readDB();
    if(taskDB) tasks.loadTaskFromArray(taskDB);
    do{
        answer = await inquirerMenu();
        switch (answer){
            case '1':
                const desc = await readInput('Descripción: ');
                tasks.newTask(desc);
                break;
            case '2':
                console.log(tasks.arrayList);
                break;
            case '3':
                tasks.listAll();
            case '4':
                tasks.listPendingTask();
            case '5':
                tasks.listPendingTask(false);
        }
        saveDB(tasks.arrayList);
        await pause();
    }while(answer !== "0");
}

main().then();