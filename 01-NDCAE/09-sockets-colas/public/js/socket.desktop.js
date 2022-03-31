var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error("escritorio es necesario");
}
var desktop = searchParams.get('escritorio');
var label = $('small');
$('h1').text("Escritorio " + desktop);

$('button').on('click', function(){
    socket.emit('attendTicket', {desktop}, function(resp){
        if(resp === 'No hay tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket '+ resp.number);
    });
});