import { gql } from '@apollo/client';

export const getAccountsQuery = gql`
  query GetAccounts($account_ids: [Int!]!) {
    accounts(account_ids: $account_ids) {
      products
      limit
      account_id
    }
  }
`;