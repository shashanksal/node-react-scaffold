const log = require('../../lib/Logger')('API');
const express = require('express');

let api_router = express.Router({ mergeParams: true });

// Set default Content-Type to be 'application/json'
api_router.use((req, res, next) => {
	let incoming_content_type = req.headers['content-type'];
	if (!incoming_content_type || incoming_content_type !== 'application/json') {
		log.warn(`Incoming body content to API will be parsed as JSON, but Content-Type header isn't set to 'application/json' (instead is: '${incoming_content_type}')`);
	}
	next();
});
api_router.use(express.json({ type: ['*/*'] }));  // Parse body as JSON, regardless of Content-Type



// API Index route - show directory of resource endpoints
api_router.get('/', (req, res, next) => {
	// Inspired by GitHub's API root, at https://api.github.com
	let api_directory_resource = {

	};

	res.status(200).json(api_directory_resource);  // HTTP 200 - OK
});

// Fall through middleware
api_router.use((req, res, next) => {
	// API Endpoint doesn't exist
	res.status(404).send();
});


module.exports = api_router;
