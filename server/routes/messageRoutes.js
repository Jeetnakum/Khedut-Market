const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getConversations, getMessages, sendMessage, createConversation } = require('../controllers/messageController');

router.get('/conversations', protect, getConversations);
router.post('/conversations', protect, createConversation);
router.get('/conversations/:id/messages', protect, getMessages);
router.post('/conversations/:id/send', protect, sendMessage);

module.exports = router;
