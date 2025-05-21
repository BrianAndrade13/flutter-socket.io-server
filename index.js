const express = require('express');
const path = require('path');
require('dotenv').config()

const app = express();

//App de Express
const port = process.env.PORT

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

const publicPath = path.resolve( __dirname, 'public');
app.use(express.static(publicPath));

server.listen(port, (err) => {
    if(err) throw new Error(err);

    console.log('Servido Corriendo en el Puerto', port);
});