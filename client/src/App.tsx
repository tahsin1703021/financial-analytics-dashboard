import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import CustomerDetails from './components/customer';
import CustomersTable from './components/customers.table';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomersTable />} />
          <Route path="/customer-details/:id" element={<CustomerDetails />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
