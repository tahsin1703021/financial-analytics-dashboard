import { useQuery } from "@apollo/client";
import { getAllCustomers, getTotalCustomers } from "../queries/customers";
import { Table, Pagination, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICustomer } from "../types";


const CustomersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(getAllCustomers, {
        variables: { skip: (currentPage - 1) * pageSize, limit: pageSize },
    });


    const modifiedData = data?.customers?.map((customer: ICustomer) => ({
        ...customer,
        no_of_accounts: customer.accounts.length
    }))

    const response = useQuery(getTotalCustomers);
    const totalCustomers = response?.data?.totalCustomers;

    if (loading) return <p>Loading....</p>;
    if (error) return <p>Ops! Something went wrong {error.message}</p>;


    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'No of Accounts', dataIndex: 'no_of_accounts', key: 'email' },
        {
            title: 'Details',
            key: 'details',
            render: (_text: any, record: { _id: any; accounts: any; }) => (
                <Button onClick={() => navigate(`/customer-details/${record._id}`, { state: { accounts: record.accounts } })}>
                    Details
                </Button>
            )
        },
    ];


    const handleTableChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        },
        tableContainer: {
            width: '80%',
            border: '1px solid #ddd',
            padding: '16px',
            backgroundColor: '#fff',
        },
        pagination: {
            marginTop: '16px',
            textAlign: 'center',
        },
    };
    return (
        <>
            <h1 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>Financial Analytics Dashboard</h1>
            <div style={styles.container}>
                <div style={styles.tableContainer}>
                    <Table
                        columns={columns}
                        dataSource={modifiedData}
                        pagination={false}
                        rowKey="_id"
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalCustomers} // You should fetch and set the total count from your backend
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </>

    );
};


export default CustomersTable;