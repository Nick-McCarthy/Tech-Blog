const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Blog.create({ ...req.body, user_id: req.session.user_id })
        .then(newBlog => { res.json(newBlog) })
        .catch(err => { res.status(500).json(err) })
});

router.put('/:id', withAuth, (req, res) => {
    Blog.update(req.body, { where: { id: req.params.id, user_id: req.session.user_id } })
        .then(blog => {
            if (!blog) {
                res.status(404).json({ message: 'No blog found' });
                return;
            } else {
                res.json(blog)
            }
        })
        .catch(err => { res.status(500).json(err) })
});

router.delete('/:id', withAuth, (req, res) => {
    Blog.destroy({ where: { id: req.params.id, user_id: req.session.user_id } })
        .then(blog => {
            if (!blog) {
                res.status(404).json({ message: 'No blog found' });
                return;
            } else {
                res.json(blog)
            }
        })
        .catch(err => { res.status(500).json(err) })
});

module.exports = router;