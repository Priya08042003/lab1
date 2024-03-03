//import logo from './logo.svg';
import React from 'react';
import './App.css';
import CustomerTable from '../src/customerTable';

function App() {
  return (
    <div className="App">
      <h1>Customer Management</h1>
      <CustomerTable />
    </div>
  );
}

export default App;