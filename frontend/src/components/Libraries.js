import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Page, Card, Table } from 'tabler-react';

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/libraries')
      .then(response => setLibraries(response.data))
      .catch(error => console.error('Error fetching libraries:', error));
  }, []);

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
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {libraries.map(library => (
                <Table.Row key={library.library_id}>
                  <Table.Col>{library.lib_name}</Table.Col>
                  <Table.Col>{library.description}</Table.Col>
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