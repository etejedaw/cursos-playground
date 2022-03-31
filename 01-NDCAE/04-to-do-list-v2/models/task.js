const {v4: uuidv4} = require('uuid');
class Task{
    id = '';
    desc = '';
    finishIn = null;
    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
    }
}

module.exports = Task;