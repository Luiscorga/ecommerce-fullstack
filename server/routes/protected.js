const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const protectedController = require('../controllers/protectedController');

router.get('/profile', authMiddleware, protectedController.getProfile);
router.get('/admin', authMiddleware, roleMiddleware('admin'), protectedController.getAdminDashboard);

module.exports = router;