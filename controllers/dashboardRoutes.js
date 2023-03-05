const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Blog.findAll({ where: { user_id: req.session.user_id } })
        .then(blogData => {
            const blogs = blogData.map((blog) => blog.get({ plain: true }));
            res.render('dashboard', { blogs: blogs, name: req.session.name, logged_in: req.session.logged_in })
        })
        .catch(err => { res.status(500).json(err) })
});
//finish nick
router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newblogpost', { name: req.session.name, user_id: req.session.user_id, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({ where: { id: req.params.id, user_id: req.session.user_id } })
        .then(blogData => {
            const blog = blogData.get({ plain: true });
            res.render('editblogpost', { blog, name: req.session.name, user_id: req.session.user_id, logged_in: req.session.logged_in })
        })
        .catch(err => { res.status(500).json(err) })
});

module.exports = router;