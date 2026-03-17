const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    toAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    amount: { type: Number, required: true, min: 0.01 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

transactionSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id.toString();
    ret.fromAccount = ret.fromAccount?.toString?.() ?? ret.fromAccount;
    ret.toAccount = ret.toAccount?.toString?.() ?? ret.toAccount;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

