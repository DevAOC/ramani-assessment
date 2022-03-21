'use strict';

const express = require('express');
const router = express.Router();

const { ping, posts } = require('./models/routes.js');

router.get('/api/ping', ping);
router.get('/api/posts', posts);

module.exports = router;
