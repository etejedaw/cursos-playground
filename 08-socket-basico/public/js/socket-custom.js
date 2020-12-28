var socket = io();

socket.on('connect', function(){
    console.log("Conectado al servidor");
});

socket.on('disconnect', function(){
    console.log("Conexion perdida con el servidor");
});

socket.emit('enviarMensaje', {
    user: "Prici",
    message: "Hello World"
}, function(resp){
    console.log(resp);
});

socket.on('enviarMensaje', function(data){
    console.log(data);
});