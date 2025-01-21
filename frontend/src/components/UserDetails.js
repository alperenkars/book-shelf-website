import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Card, Table, Grid, Text, Button, Alert, Avatar } from 'tabler-react'; // Import Avatar component
import './UserDetails.css'; // Import the CSS file for additional styling

const UserDetails = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [mostCommonGenre, setMostCommonGenre] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, [user_id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${user_id}`);
      const data = await response.json();
      console.log('Fetched user data:', data); // Add this line to debug the user data
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${user_id}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchMostCommonGenre = async () => {
    console.log('Button clicked'); // Add this line to debug button click
    try {
      const response = await fetch(`http://localhost:5001/api/users/${user_id}/most-common-genre`);
      if (!response.ok) {
        throw new Error('Failed to fetch most common borrowed genre');
      }
      const data = await response.json();
      console.log('Fetched most common genre data:', data); // Add this line to debug the response data
      setMostCommonGenre(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Page.Content>
      <Card className="profile-banner">
        <Card.Body>
          <Text className="profile-username">{user.user_name}</Text>
          <Grid.Row>
            <Grid.Col sm={4}>
              <Card className="profile-card">
                <Card.Body>
                  <Text className="profile-card-title">Followers</Text>
                  <Text className="profile-card-number">{user.followers.length}</Text>
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col sm={4}>
              <Card className="profile-card">
                <Card.Body>
                  <Text className="profile-card-title">Following</Text>
                  <Text className="profile-card-number">{user.following.length}</Text>
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col sm={4}>
              <Card className="profile-card">
                <Card.Body>
                  <Text className="profile-card-title">Books Borrowed</Text>
                  <Text className="profile-card-number">{books.length}</Text>
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
          <Button color="primary" onClick={fetchMostCommonGenre} className="mt-3">See Most Borrowed Genre</Button>
          {mostCommonGenre && (
            <Alert type="info" className="mt-3">
              Most Borrowed Genre: {mostCommonGenre.genre} ({mostCommonGenre.borrow_count} times)
            </Alert>
          )}
          {error && (
            <Alert type="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>{user.user_name}'s Borrowed Books</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Title</Table.ColHeader>
                <Table.ColHeader>Author</Table.ColHeader>
                <Table.ColHeader>Genre</Table.ColHeader>
                <Table.ColHeader>Year</Table.ColHeader>
                <Table.ColHeader>ISBN</Table.ColHeader>
                <Table.ColHeader>Publisher</Table.ColHeader>
                <Table.ColHeader>Pages</Table.ColHeader>
                <Table.ColHeader>Status</Table.ColHeader>
                <Table.ColHeader>Borrow Date</Table.ColHeader>
                <Table.ColHeader>Return Date</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(books) && books.map((book, index) => (
                <Table.Row key={index}>
                  <Table.Col>{book.title}</Table.Col>
                  <Table.Col>{book.author}</Table.Col>
                  <Table.Col>{book.genre}</Table.Col>
                  <Table.Col>{book.year}</Table.Col>
                  <Table.Col>{book.isbn}</Table.Col>
                  <Table.Col>{book.publisher}</Table.Col>
                  <Table.Col>{book.pages}</Table.Col>
                  <Table.Col>{book.status}</Table.Col>
                  <Table.Col>{book.borrow_date}</Table.Col>
                  <Table.Col>{book.return_date}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>{user.user_name}'s Followers</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(user.followers) && user.followers.map((follower, index) => (
                <Table.Row key={index}>
                  <Table.Col>{follower.user_name}</Table.Col>
                  <Table.Col>{follower.email}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>{user.user_name} is Following</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(user.following) && user.following.map((following, index) => (
                <Table.Row key={index}>
                  <Table.Col>{following.user_name}</Table.Col>
                  <Table.Col>{following.email}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </Page.Content>
  );
};

export default UserDetails;