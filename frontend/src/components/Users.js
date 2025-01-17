import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Page, Card, Table } from 'tabler-react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <Card.Title>Users</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Username</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(user => (
                <Table.Row key={user.user_id}>
                  <Table.Col>{user.user_name}</Table.Col>
                  <Table.Col>{user.email}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </Page.Content>
  );
};

export default Users;