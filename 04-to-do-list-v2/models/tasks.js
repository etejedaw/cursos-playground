const Task = require('./task');
class Tasks{
    _list = {};
    get arrayList(){
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }
    loadTaskFromArray(tasks = []){
        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }
    newTask(desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listAll(){
        this.arrayList.forEach((task, i) => {
            const {desc, finishIn} = task;
            const state = (finishIn) ? "Completado" : "Pendiente";
            console.log(`${i+1} ${desc} :: ${state}`);
        })
    }

    listPendingTask(complete = true){
        this.arrayList.forEach((task) => {
            const {desc, finishIn} = task;
            const state = (finishIn) ? "Completado" : "Pendiente";
            if(finishIn) console.log(`${desc} :: ${state}`);
            else console.log(`${desc} :: ${state}`)
        })
    }
}

module.exports = Tasks;