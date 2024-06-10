import _ from 'lodash';
import Customer from '../models/customer';
import Account from '../models/account';
import Transaction from '../models/transaction';

import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLBoolean } from 'graphql';

const TierDetailsType = new GraphQLObjectType({
  name: 'TierDetails',
  fields: () => ({
    tier: { type: GraphQLString },
    benefits: { type: new GraphQLList(GraphQLString) },
    active: { type: GraphQLBoolean },
    id: { type: GraphQLString },
  }),
});

// Define the GraphQL type for Customer
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    email: { type: GraphQLString },
    accounts: { type: new GraphQLList(GraphQLInt) },
    tier_and_details: { type: new GraphQLList(TierDetailsType) },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    date: { type: GraphQLString }, // Assuming you will convert Date to ISO string
    amount: { type: GraphQLInt },
    transaction_code: { type: GraphQLString },
    symbol: { type: GraphQLString },
    price: { type: GraphQLFloat }, // Changed to GraphQLFloat for decimal values
    total: { type: GraphQLFloat }, // Changed to GraphQLFloat for decimal values
  }),
});

const TransactionDocumentType = new GraphQLObjectType({
  name: 'TransactionDocument',
  fields: () => ({
    id: { type: GraphQLID },
    account_id: { type: GraphQLInt },
    transaction_count: { type: GraphQLInt },
    bucket_start_date: { type: GraphQLString }, // Assuming you will convert Date to ISO string
    bucket_end_date: { type: GraphQLString }, // Assuming you will convert Date to ISO string
    transactions: { type: new GraphQLList(TransactionType) },
  }),
});

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: { type: GraphQLID },
    limit: { type: GraphQLInt },
    account_id: { type: GraphQLInt },
    products: { type: new GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    account: {
      type: AccountType,
      args: { account_id: { type: GraphQLInt } },
      async resolve(_parent, args) {
        return await Account.findOne({ account_id: args.account_id });
      },
    },
    accounts: {
      type: new GraphQLList(AccountType), // Assuming AccountType is defined elsewhere
      args: {
        account_ids: { type: new GraphQLList(GraphQLInt) },
      },
      async resolve(_parent, { account_ids }) {
        try {
          // Use the $in operator to find accounts with the provided IDs
          const accounts = await Account.find({ account_id: { $in: account_ids } });
          return accounts;
        } catch (error) {
          throw new Error(`Error fetching accounts: ${error.message}`);
        }
      },
    },
    transaction: {
      type: TransactionDocumentType,
      args: { account_id: { type: GraphQLInt } },
      async resolve(_parent, args) {
        return await Transaction.findOne({ account_id: args.account_id });
      },
    },
    transactions: {
      type: TransactionDocumentType,
      async resolve(_parent, _args) {
        return await Transaction.find({});
      },
    },
    customer: {
      type: new GraphQLList(CustomerType),
      args: { _id: { type: GraphQLID } },
      async resolve(_parent, args) {
        const customer = await Customer.findById(args._id);
        return customer ? [customer] : null;
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      args: {
        skip: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(_parent, args) {
        return await Customer.find({}).skip(args.skip).limit(args.limit);
      },
    },
    totalCustomers: {
      type: GraphQLInt,
      async resolve() {
        return await Customer.countDocuments();
      },
    },
  },
});

const initialSchema = new GraphQLSchema({
  query: RootQuery,
});

export default initialSchema;
