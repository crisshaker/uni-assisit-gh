require('dotenv').config();

const http = require('http');
const express = require('express');

const db = require('./db');
db.sequelize
  .authenticate()
  .then(async () => {
    console.log('SUCCESS: Database connection');
    await db.sequelize.sync();
    console.log('SUCCESS: Database sync');
  })
  .catch((err) => console.log('ERROR: Database connection', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

const PORT = process.env.PORT || 4000;
http
  .createServer(app)
  .listen(PORT)
  .on('listening', () => console.log(`Server running on PORT ${PORT}`));
