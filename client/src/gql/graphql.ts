/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  account_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Customer = {
  __typename?: 'Customer';
  _id?: Maybe<Scalars['ID']['output']>;
  accounts?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  address?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tier_and_details?: Maybe<Array<Maybe<TierDetails>>>;
  username?: Maybe<Scalars['String']['output']>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  account?: Maybe<Account>;
  accounts?: Maybe<Array<Maybe<Account>>>;
  customer?: Maybe<Array<Maybe<Customer>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  totalCustomers?: Maybe<Scalars['Int']['output']>;
  transaction?: Maybe<TransactionDocument>;
  transactions?: Maybe<TransactionDocument>;
};


export type RootQueryTypeAccountArgs = {
  account_id?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryTypeAccountsArgs = {
  account_ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type RootQueryTypeCustomerArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryTypeCustomersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryTypeTransactionArgs = {
  account_id?: InputMaybe<Scalars['Int']['input']>;
};

export type TierDetails = {
  __typename?: 'TierDetails';
  active?: Maybe<Scalars['Boolean']['output']>;
  benefits?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['String']['output']>;
  tier?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transaction_code?: Maybe<Scalars['String']['output']>;
};

export type TransactionDocument = {
  __typename?: 'TransactionDocument';
  account_id?: Maybe<Scalars['Int']['output']>;
  bucket_end_date?: Maybe<Scalars['String']['output']>;
  bucket_start_date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  transaction_count?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type GetAccountsQueryVariables = Exact<{
  account_ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetAccountsQuery = { __typename?: 'RootQueryType', accounts?: Array<{ __typename?: 'Account', products?: Array<string | null> | null, limit?: number | null, account_id?: number | null } | null> | null };

export type GetCustomersQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetCustomersQuery = { __typename?: 'RootQueryType', customers?: Array<{ __typename?: 'Customer', username?: string | null, name?: string | null, address?: string | null, birthdate?: string | null, email?: string | null, accounts?: Array<number | null> | null, tier_and_details?: Array<{ __typename?: 'TierDetails', tier?: string | null, benefits?: Array<string | null> | null, active?: boolean | null, id?: string | null } | null> | null } | null> | null };


export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account_ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"account_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account_ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"account_id"}}]}}]}}]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"}},{"kind":"Field","name":{"kind":"Name","value":"tier_and_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tier"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomersQuery, GetCustomersQueryVariables>;