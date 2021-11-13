const express = require('express')
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3001;
const frontUrl =  'http://localhost:3000';
const server = require('http').createServer(app);


const io = require('socket.io')(server, {
  cors: {
    origin: frontUrl,
    methods: ['GET','POST']
  }
});

const socket = require('./sockets/votesSocket');
socket(io);


var corsOptions = {
  origin: frontUrl,
};

app.use(cors(corsOptions));

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))