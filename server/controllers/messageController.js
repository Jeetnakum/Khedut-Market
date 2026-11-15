const { Message, Conversation } = require('../models/Message');

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name profilePhoto role isVerified')
      .populate('crop', 'title photos pricePerQuintal')
      .sort({ lastMessageAt: -1 });
    res.json({ success: true, conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createConversation = async (req, res) => {
  try {
    const { recipientId, cropId } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] },
      crop: cropId,
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, recipientId],
        crop: cropId,
      });
    }
    res.json({ success: true, conversation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.id })
      .populate('sender', 'name profilePhoto')
      .sort({ createdAt: 1 });
    // Mark as read
    await Message.updateMany({ conversation: req.params.id, sender: { $ne: req.user._id }, isRead: false }, { isRead: true });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, image, isDealProposal, dealProposal } = req.body;
    const message = await Message.create({
      conversation: req.params.id,
      sender: req.user._id,
      text,
      image,
      isDealProposal,
      dealProposal,
    });
    await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage: text || (isDealProposal ? '📋 Deal Proposal Sent' : '📷 Image'),
      lastMessageAt: new Date(),
    });
    const populated = await message.populate('sender', 'name profilePhoto');
    res.status(201).json({ success: true, message: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
