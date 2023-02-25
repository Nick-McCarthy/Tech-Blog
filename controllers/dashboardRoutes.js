const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
});

router.get('/new', withAuth, (req, res) => {
});

router.get('/edit/:id', withAuth, (req, res) => {
});

module.exports = router;