const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Comment.create({ ...req.body, user_id: req.session.user_id, })
        .then(newComment => { res.json(newComment) })
        .catch(err => { res.status(500).json(err) })
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update(req.body, { where: { id: req.params.id, user_id: req.session.user_id } })
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: 'No comment found' });
                return;
            } else {
                res.json(comment)
            }
        })
        .catch(err => { res.status(500).json(err) })
});

router.delete('/:id', withAuth, async (req, res) => {
    Comment.destroy({ where: { id: req.params.id, user_id: req.session.user_id } })
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: 'No comment found' });
            } else {
                res.json(comment)
            }
        })
        .catch(err => { res.status(500).json(err) })
});

module.exports = router;