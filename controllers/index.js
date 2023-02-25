const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;