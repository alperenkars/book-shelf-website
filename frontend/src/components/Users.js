import React, { useEffect, useState } from 'react';
import { Page, Card, Table, Form, Button, Grid, Alert } from 'tabler-react';
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
  const [errors, setErrors] = useState({});
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = '') => {
    try {
      const response = await fetch(`http://localhost:5001/api/users${query}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch active users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching active users:', error);
    }
  };

  const fetchUsersByFavoriteGenre = async (genre) => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/favorite-genre?genre=${genre}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users by favorite genre');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users by favorite genre:', error);
    }
  };
  
  const handleFavoriteGenreChange = (e) => {
    const genre = e.target.value;
    setFilters({
      ...filters,
      favoriteGenre: genre
    });
    fetchUsersByFavoriteGenre(genre);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const validateFilters = () => {
    const newErrors = {};
    if (filters.minFollowers && isNaN(filters.minFollowers)) {
      newErrors.minFollowers = 'Min Followers must be a number';
    }
    if (filters.maxFollowers && isNaN(filters.maxFollowers)) {
      newErrors.maxFollowers = 'Max Followers must be a number';
    }
    return newErrors;
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFilters();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const params = [];
    if (filters.name) params.push(`name=${encodeURIComponent(filters.name)}`);
    if (filters.minFollowers) params.push(`minFollowers=${encodeURIComponent(filters.minFollowers)}`);
    if (filters.maxFollowers) params.push(`maxFollowers=${encodeURIComponent(filters.maxFollowers)}`);
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    fetchUsers(query);
    setIsFilterOpen(false); // Close the filter menu after submitting
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    if (option === 'most-active') {
      fetchActiveUsers();
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    if (sortOption === 'most-active') {
      fetchActiveUsers();
    } else {
      fetchUsers();
    }
  }, [sortOption]);

  return (
    <Page.Content>
      <Card>
        <Card.Header className="card-header">
          <Card.Title>Users</Card.Title>
          <Button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            {isFilterOpen ? 'Close Filter' : 'Open Filter'}
          </Button>
          <Form.Select onChange={handleSortChange} value={sortOption} className="sort-select">
            <option value="">Sort</option>
            <option value="most-active">Most Active</option>
            <option value="default">Default</option>
          </Form.Select>
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
                    {errors.minFollowers && <Alert type="danger">{errors.minFollowers}</Alert>}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Max Followers">
                    <Form.Input
                      name="maxFollowers"
                      value={filters.maxFollowers}
                      onChange={handleInputChange}
                    />
                    {errors.maxFollowers && <Alert type="danger">{errors.maxFollowers}</Alert>}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
          <Form.Group label="Favorite Genre">
            <Form.Select onChange={handleFavoriteGenreChange} value={filters.favoriteGenre} className="genre-select">
              <option value="">Favorite Genre</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </Form.Select>
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
                <Table.ColHeader>Books Borrowed</Table.ColHeader>
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

export default Users;