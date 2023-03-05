const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
    Blog.findAll({ order: [['date_created', 'DESC']], include: [{ model: User, attributes: ['name'] }] })
        .then(blogData => {
            const blogs = blogData.map((blog) => blog.get({ plain: true }));
            res.render('homepage', { blogs: blogs, name: req.session.name, logged_in: req.session.logged_in })
        })
        .catch(err => { res.status(500).json(err) })
});

router.get('/blogs/:id', (req, res) => {
    Blog.findOne({
        where: { id: req.params.id },
        attributes: [
            'id',
            'title',
            'description',
            'date_created'
        ],
        include: [{
            model: Comment,
        },
        {
            model: User,
            attributes: ['name']
        }
        ]
    })
        .then(blogData => {
            if (!blogData) {
                res.status(404).json({ message: 'No Match For Id' });
                return;
            }
            const blog = blogData.get({ plain: true });
            console.log('---------------------------', blog)
            res.render('viewblogpost', { blog: blog, logged_in: req.session.logged_in });

        })
        .catch(err => { res.status(500).json(err.message) })
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;