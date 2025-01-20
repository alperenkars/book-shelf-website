import React, { useEffect, useState } from 'react';
import { Page, Card, Table, Form, Button, Grid } from 'tabler-react';
import { Link } from 'react-router-dom';
import './Users.css'; // Import the CSS file for additional styling

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    minFollowers: '',
    maxFollowers: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = '') => {
    try {
      const response = await fetch(`http://localhost:5001/api/users${query}`);
      const data = await response.json();
      console.log('Fetched users data:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = [];
    if (filters.name) params.push(`name=${encodeURIComponent(filters.name)}`);
    if (filters.minFollowers) params.push(`minFollowers=${encodeURIComponent(filters.minFollowers)}`);
    if (filters.maxFollowers) params.push(`maxFollowers=${encodeURIComponent(filters.maxFollowers)}`);
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    fetchUsers(query);
    setIsFilterOpen(false); // Close the filter menu after submitting
  };

  return (
    <Page.Content>
      <Card>
        <Card.Header className="card-header">
          <Card.Title>Users</Card.Title>
          <Button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            {isFilterOpen ? 'Close Filter' : 'Open Filter'}
          </Button>
        </Card.Header>
        {isFilterOpen && (
          <Card.Body className="filter-menu">
            <Form onSubmit={handleFilterSubmit}>
              <Grid.Row>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Name">
                    <Form.Input
                      name="name"
                      value={filters.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Min Followers">
                    <Form.Input
                      name="minFollowers"
                      value={filters.minFollowers}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Max Followers">
                    <Form.Input
                      name="maxFollowers"
                      value={filters.maxFollowers}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
              <Button type="submit" color="primary">Filter</Button>
            </Form>
          </Card.Body>
        )}
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
                <Table.ColHeader>Followers</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(users) && users.map((user, index) => (
                <Table.Row key={index}>
                  <Table.Col>
                    <Link to={`/users/${user.user_id}`}>{user.user_name}</Link>
                  </Table.Col>
                  <Table.Col>{user.email}</Table.Col>
                  <Table.Col>{user.followers_count}</Table.Col>
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