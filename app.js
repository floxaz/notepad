const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', noteRoutes);

module.exports = app;
