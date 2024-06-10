import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  limit: Number,
  account_id: Number,
  products: [String],
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
