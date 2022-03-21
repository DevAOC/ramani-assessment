'use strict';

const express = require('express');
const server = express();

const routes = require('./router.js');

server.use(express.json());

server.use('/', routes);

module.exports = {
  server,
  start: (port) => {
    server.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  },
};
