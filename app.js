const express = require('express');
const morgan = require('morgan');

const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', noteRoutes);

module.exports = app;
