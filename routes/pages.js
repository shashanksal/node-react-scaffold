const express = require('express');

let router = express.Router({ mergeParams: true });

// Body parser middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
	res.sendFile('index.html');
});

router.get('/test', (req, res, next) => {
	res.render('index', { title: 'Test page' });
});


module.exports = router;
