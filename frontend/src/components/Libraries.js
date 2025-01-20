import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Card, Table } from 'tabler-react';
import './Libraries.css'; // Import the CSS file for additional styling

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/libraries');
      const data = await response.json();
      console.log('Fetched libraries data:', data); // Add this line to debug the libraries data
      setLibraries(data);
    } catch (error) {
      console.error('Error fetching libraries:', error);
    }
  };

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <Card.Title>Libraries</Card.Title>
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