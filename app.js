const log = require('./lib/Logger')('App');
const config = require('./config');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


let app = express();

log.info(`Configuring middleware and routes`);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// Body parsers are mounted in the top-level routers (API, Pages, etc)
//app.use(express.json({ type: ['*/*'] }));  // treat all bodies as JSON
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if (config.server.cors.enabled) {
	log.warn(`Enabling CORS headers middleware`);
	app.use(cors());
}

// Routes
app.use('/api/v1', require('./routes/api'));  // important to load first, so that API calls don't pass through Page middlewares (particuarly its body parsers)
app.use('/', require('./routes/pages'));


module.exports = app;
