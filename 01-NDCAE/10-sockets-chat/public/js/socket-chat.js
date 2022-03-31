var socket = io();

var params = new URLSearchParams(window.location.search);
if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('enterChat', user, function(resp){
        console.log(resp);
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('createMessage', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('personList', function(data){
    console.log(data);
});

socket.on('privateMessage', function(message){
    console.log("Mensaje privado ", message);
})