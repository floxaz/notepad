const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const noteRoutes = require('./routes/noteRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  // always respond with index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

app.all('*', (req, res, next) => {
  res.status(404);
  res.json({
    status: 'failire',
    message: `Can't find ${req.originalUrl} on this server!`
  });
  next();
})

module.exports = app;
