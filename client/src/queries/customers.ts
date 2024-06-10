import { gql } from '@apollo/client';

export const getAllCustomers = gql`
  query GetCustomers($skip: Int!, $limit: Int!) {
    customers(skip: $skip, limit: $limit) {
      name
      address
      email
      accounts
    }
  }
`;
export const getTotalCustomers = gql`
  query {
    totalCustomers
  }
`