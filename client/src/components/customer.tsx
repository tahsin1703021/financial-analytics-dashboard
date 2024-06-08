import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { getAccountsQuery } from '../queries/accounts';
import { Table, Pagination, Button } from 'antd';

const styles = {
    container: {
      width: '80%', // Adjust width as needed
      margin: 'auto', // Center the table horizontally
      border: '1px solid #ddd', // Add border
      padding: '16px', // Add padding for better appearance
      marginTop: '10%'
    },
};

const CustomerDetails = () => {
  const location = useLocation();
  const { accounts } = location.state || { accounts: [] };

  const {loading, error, data} = useQuery(getAccountsQuery, {
      variables: { account_ids: accounts }
  });
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Ops! Something went wrong {error.message}</p>;
  
  const columns = [
      {
        title: 'Account ID',
        dataIndex: 'account_id',
        key: 'account_id',
      },
    {
      title: 'Limit',
      dataIndex: 'limit',
      key: 'limit',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: string[]) => (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <>
       <h1 style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}>Account Details</h1>
      <div style={styles.container}>
          <Table
            columns={columns}
            dataSource={data?.accounts}
            pagination={false} // Disable pagination if not needed
          />
      </div>
    </>
  );
};
  
export default CustomerDetails;
