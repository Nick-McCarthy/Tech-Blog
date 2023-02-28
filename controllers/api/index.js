const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;
