/**
 * server.js - Set up a server
 * @type {Parsers|*}
 */


const path = require('path');
const express = require('express');
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));



const bodyParser = require('body-parser')
server.use(bodyParser.json())



const helmet = require('helmet')
server.use(helmet())


const logger = require('morgan');
server.use(logger('dev'));


const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://hsadmin:MochiBean421@cluster0.av8kthx.mongodb.net/CareFinder')


// Set up the routes
const apiRoutes = require('./src/routes/api-routes')

server.use('/api', apiRoutes)

// handle errors
const errorHandlers = require('./src/middleware/error-handlers')

server.use(errorHandlers.invalidRoute)
server.use(errorHandlers.validationErrors)
module.exports = server;
