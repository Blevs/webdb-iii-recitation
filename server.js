const express = require('express');

const server = express();

server.use(express.json());

const ownersRouter = require('./owners/owners-router.js');
server.use('/owners', ownersRouter);

const petsRouter = require('./pets/pets-router.js');
server.use('/pets', petsRouter);

module.exports = server;
