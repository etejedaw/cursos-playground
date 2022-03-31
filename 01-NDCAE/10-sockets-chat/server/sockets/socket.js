const {io} = require('../server');
const {User} = require('../classes/user');
const {createMessage} = require('../utils/utils');
const users = new User();

io.on('connection', client => {
    client.on('enterChat', (data, callback) => {
        if(!data.name || !data.room) return callback({
            ok: false,
            message: "El nombre y sala son necesarios"
        });
        client.join(data.room);
        let people = users.addPeople(client.id, data.name, data.room);
        client.broadcast.emit('personList', users.getRoomPeople());
        callback(users.getRoomPeople(data.room));
    });
    
    client.on('createMessage', data => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
    });

    client.on('disconnect', () => {
        let delPerson = users.delPerson(client.id);
        client.broadcast.to(delPerson.room).emit('createMessage', createMessage("Admin", `${delPerson.name} has left`));
        client.broadcast.to(delPerson.room).emit('showPeople', users.getRoomPeople());
    });

    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createMessage(person.name, data.message));
    });

});