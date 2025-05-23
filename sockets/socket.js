
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Latin'));
bands.addBand(new Band('Wolves'));
bands.addBand(new Band('Tigers'));
bands.addBand(new Band('ChoneAsesinos'));

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
    console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Nombre Esperado:', payload);
        io.emit('mensaje', {admin: 'Es un Nuevo Emit'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);

        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    // client.on('emitir-mensaje', (payload) => {
    //     // io.emit('nuevo-mensaje', payload); //emite a todos el mensaje
    //     client.broadcast.emit('nuevo-mensaje', payload); //emite a todos el mensaje menos al que lo emitio
    // });
});
