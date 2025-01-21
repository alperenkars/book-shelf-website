import React, { useEffect, useState } from 'react';
import { Page, Card, Table, Alert } from 'tabler-react';
import { Link } from 'react-router-dom';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/active-users');
      if (!response.ok) {
        throw new Error('Failed to fetch active users');
      }
      const data = await response.json();
      setActiveUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <Card.Title>Active Users</Card.Title>
        </Card.Header>
        <Card.Body>
          {error && <Alert type="danger">{error}</Alert>}
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
                <Table.ColHeader>Books Borrowed</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(activeUsers) && activeUsers.map((user, index) => (
                <Table.Row key={index}>
                  <Table.Col>
                    <Link to={`/users/${user.user_id}`}>{user.user_name}</Link>
                  </Table.Col>
                  <Table.Col>{user.email}</Table.Col>
                  <Table.Col>{user.books_borrowed}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </Page.Content>
  );
};

export default ActiveUsers;