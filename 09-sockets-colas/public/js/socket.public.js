var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket1 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblEscritorio1');
var lblDesktop2 = $('#lblEscritorio2');
var lblDesktop3 = $('#lblEscritorio3');
var lblDesktop4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('estadoActual', function(data){
    data.lastFour.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text("Ticket " + element.number);
        $(`#lblEscritorio${index+1}`).text("Escritorio " + element.desktop);
    }); 
});

socket.on('lastFour', function(data){
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;
    data.lastFour.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text("Ticket " + element.number);
        $(`#lblEscritorio${index+1}`).text("Escritorio " + element.desktop);
    });
});