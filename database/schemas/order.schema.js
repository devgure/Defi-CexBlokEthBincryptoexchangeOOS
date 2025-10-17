const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  side: { type: String, enum: ['buy', 'sell'], required: true },
  type: { type: String, enum: ['limit', 'market'], default: 'limit' },
  quantity: { type: Number, required: true },
  price: { type: Number },
  status: { type: String, enum: ['open', 'filled', 'cancelled'], default: 'open' },
  filledQuantity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
