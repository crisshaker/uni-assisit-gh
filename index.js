require('dotenv').config();

const http = require('http');
const express = require('express');
const path = require('path');

const db = require('./db');
const { resolve } = require('path');
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

require('./routes')(app);

// 404
app.use((req, res, next) => {
  res.status(404).send({ error: 'Ooppsss.. Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: 'request failed' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
http
  .createServer(app)
  .listen(PORT)
  .on('listening', () => console.log(`Server running on PORT ${PORT}`));
