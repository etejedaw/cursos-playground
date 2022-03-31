const argv = require('yargs')
.options({
    city: {
        alias: 'c',
        demand: true
    }
})
.argv;

module.exports = {
    argv
}