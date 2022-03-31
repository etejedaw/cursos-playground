const status = {
    default: true,
    alias: 'c'
}
const id = {
    demand: true,
    alias: 'i'
}
const description = {
    demand: true,
    alias: 'd'
}

const argv = require('yargs')
.command("new", "Create a new task", {
    description
})
.command("update", "Update the state of a task", {
    id,
    status
})
.command("delete", "Delete a task by ID", {
    id
})
.help()
.argv;

module.exports = {
    argv
};