const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  asset: { type: String, required: true },
  amount: { type: Number, required: true },
  collateralAsset: { type: String, required: true },
  collateralAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  status: { type: String, enum: ['active', 'repaid', 'liquidated'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Loan', loanSchema);
