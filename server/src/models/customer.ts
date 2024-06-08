import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the sub-schema for tier_and_details
const tierDetailsSchema = new Schema(
  {
    tier: String,
    benefits: [String],
    active: Boolean,
    id: String,
  },
  { _id: false },
);

// Define the main schema
const customerSchema = new Schema({
  username: String,
  name: String,
  address: String,
  birthdate: Date,
  email: String,
  accounts: [Number],
  tier_and_details: {
    type: Map,
    of: tierDetailsSchema,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
