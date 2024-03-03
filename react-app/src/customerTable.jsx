import React, { useState } from 'react';
import data from '../src/customers.json';
import './App.css'; 

const CustomerTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('sno'); // Default sort option is by S.No
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;

  const filteredRecords = data.filter((record) =>
    record.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = filteredRecords.slice().sort((a, b) => {
    if (sortOption === 'date') {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA - dateB;
    } else if (sortOption === 'date_desc') {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    } else if (sortOption === 'time') {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA.getTime() - dateB.getTime();
    } else if (sortOption === 'time_desc') {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    } else if (sortOption === 'sno') {
      return a.sno - b.sno; 
    } else {
      return 0; 
    }
  });

  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredRecords.length / pageSize);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleSortChange = (option) => {
    if (option === sortOption) {
        if (option === 'date') {
          setSortOption('date_desc');
        } else if (option === 'date_desc') {
          setSortOption('date');
        } else if (option === 'time') {
          setSortOption('time_desc');
        } else if (option === 'time_desc') {
          setSortOption('time');
        } else if (option === 'sno') {
          setSortOption('sno_desc');
        } else if (option === 'sno_desc') {
          setSortOption('sno');
        }
      } else {
        setSortOption(option);
      }
    };
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    return (
      <div>
      <div className='bar'>
        <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by customer name or location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="sort-options">
          <button onClick={() => handleSortChange('date')} className={sortOption === 'date' ? 'active' : ''}>Sort by Date</button>
          <button onClick={() => handleSortChange('time')} className={sortOption === 'time' ? 'active' : ''}>Sort by Time</button>
          <button onClick={() => handleSortChange('sno')} className={sortOption === 'sno' ? 'active' : ''}>original</button>
        </div>
        </div>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">S.No</th>
            <th rowSpan="2">Customer Name</th>
            <th rowSpan="2">Age</th>
            <th rowSpan="2">Phone</th>
            <th rowSpan="2">Location</th>
            <th colSpan="2">Created At</th>
          </tr>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.sno}>
              <td>{record.sno}</td>
              <td>{record.customer_name}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{new Date(record.created_at).toLocaleDateString()}</td>
              <td>{new Date(record.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pages'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        </div>
    </div>
  );
};

export default CustomerTable;


  

