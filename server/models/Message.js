const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    image: { type: String }, // Cloudinary URL
    isRead: { type: Boolean, default: false },

    // Deal Proposal
    isDealProposal: { type: Boolean, default: false },
    dealProposal: {
      cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
      pricePerQuintal: Number,
      quantity: Number,
      totalAmount: Number,
      deliveryTerms: String,
      paymentTerms: String,
      validity: Date,
      status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Countered', 'Rejected'],
        default: 'Pending',
      },
    },
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
    status: {
      type: String,
      enum: ['Active', 'Deal Done', 'Cancelled'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = { Message, Conversation };
