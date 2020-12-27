const fs = require('fs');

let toDoList = [];

const generateId = () => (Math.random().toString(36).substring(7)).substring(0,5);

const loadDB = () => {
    try {
        toDoList = require("../db/data.json");
    }
    catch{
        toDoList = [];
    }
}

const saveDB = () => {
    let data = JSON.stringify(toDoList);
    fs.writeFile("./db/data.json", data, (err) => {
        if(err) reject(err);
    });
}

const newTask = (description) => {
    loadDB();
    let toDo = {
        id: generateId(),
        description,
        status: false
    };
    toDoList.push(toDo);
    saveDB();
}

const getList = () => {
    loadDB();
    if(toDoList == '') console.log("Empty Task");
    for (let task of toDoList){
        console.log(`ID: ${task.id}`);
        console.log(`Task: ${task.description}`);
        console.log(`Status: ${task.status}\n`);   
    }
}

const updateTask = (id, status) => {
    loadDB();
    let index = toDoList.findIndex(task => task.id === id);
    if(index != -1) {
        toDoList[index].status = status;
        saveDB();
        console.log(`The task "${toDoList[index].description}" has been update`);
    }
    else console.log(`Cannot find a task with ID: ${id}`);
}

const deleteTask = (id) => {
    loadDB();
    let index = toDoList.findIndex(task => task.id === id);
    if(index != -1){
        console.log(`The task "${toDoList[index].description}" has been delete`);
        toDoList.splice(index,1);
        saveDB();
    }
    else console.log(`Cannot find a task with ID: ${id}`);
}

module.exports = {
    newTask,
    getList,
    updateTask,
    deleteTask
}