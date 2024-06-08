import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define a sub-schema for individual transactions
const transactionSchema = new Schema(
  {
    date: Date,
    amount: Number,
    transaction_code: String,
    symbol: String,
    price: Number,
    total: Number,
  },
  { _id: false },
);

// Define the main schema for transactions
const transactionDocumentSchema = new Schema({
  account_id: Number,
  transaction_count: Number,
  bucket_start_date: Date,
  bucket_end_date: Date,
  transactions: [transactionSchema],
});

const Transaction = mongoose.model('Transaction', transactionDocumentSchema);

export default Transaction;
