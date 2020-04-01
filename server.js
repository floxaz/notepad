const mongoose = require('mongoose');
const dotenv = require('dotenv').config({
  path: `${__dirname}/config.env`
});
const app = require('./app');

const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => {})
.catch(err => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});
