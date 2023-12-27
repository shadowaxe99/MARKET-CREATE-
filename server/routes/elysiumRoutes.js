const express = require('express');
const elysiumController = require('../controllers/elysiumController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/register', elysiumController.registerUser);
router.post('/login', elysiumController.loginUser);
router.post('/logout', authMiddleware, elysiumController.logoutUser);

// Asset routes
router.post('/assets/create', authMiddleware, elysiumController.createAsset);
router.get('/assets', elysiumController.getAssets);
router.get('/assets/:id', elysiumController.getAssetById);

// Transaction routes
router.post('/transactions/execute', authMiddleware, elysiumController.executeTransaction);
router.get('/transactions', authMiddleware, elysiumController.getTransactions);
router.get('/transactions/:id', authMiddleware, elysiumController.getTransactionById);

// AI Integration routes
router.post('/ai/moderate-content', authMiddleware, elysiumController.moderateContent);
router.post('/ai/personalize-content', authMiddleware, elysiumController.personalizeContent);
router.post('/ai/voice-to-text', authMiddleware, elysiumController.convertVoiceToText);

// Analytics routes
router.get('/analytics', authMiddleware, elysiumController.fetchAnalytics);

module.exports = router;