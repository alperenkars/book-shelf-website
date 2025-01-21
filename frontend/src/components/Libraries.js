import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Card, Table } from 'tabler-react';
import './Libraries.css'; // Import the CSS file for additional styling

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [searchId, setSearchId] = useState(''); // Add searchId state

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async (library_id) => { // Modify fetchLibraries to use :library_id endpoint
    try {
      let url = 'http://localhost:5001/api/libraries';
      if (library_id) {
        url += `/${library_id}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched libraries data:', data); // Add this line to debug the libraries data
      setLibraries(library_id ? [data] : data); // Ensure libraries is always an array
    } catch (error) {
      console.error('Error fetching libraries:', error);
    }
  };

  const handleSearch = () => { // Update handleSearch to use the new endpoint
    if (searchId.trim() === '') {
      fetchLibraries();
    } else {
      fetchLibraries(searchId);
    }
  };

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <div className="header-container"> {/* Add a flex container */}
            <Card.Title>Libraries</Card.Title>
            <div className="search-container"> {/* Move search-container inside header-container */}
              <input 
                type="text" 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
                placeholder="Enter Library ID" 
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Description</Table.ColHeader>
                <Table.ColHeader>Create Date</Table.ColHeader>
                <Table.ColHeader>Built By</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(libraries) && libraries.map((library, index) => (
                <Table.Row key={index}>
                  <Table.Col>
                    <Link to={`/libraries/${library.library_id}`}>{library.lib_name}</Link>
                  </Table.Col>
                  <Table.Col>{library.description}</Table.Col>
                  <Table.Col>{library.create_date}</Table.Col>
                  <Table.Col>{library.built_by_name}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </Page.Content>
  );
};

export default Libraries;