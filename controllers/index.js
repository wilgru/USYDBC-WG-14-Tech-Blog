const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postPagesRoutes');
const commentRoutes = require('./commentPagesRoutes');

const app = express();

app.use('/comment', commentRoutes);
app.use('/post', postRoutes);
app.use('/api', apiRoutes);
app.use('/', homeRoutes);

module.exports = app;
