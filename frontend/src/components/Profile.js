import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Card, Grid, Avatar, Table } from 'tabler-react';
import './Profile.css'; // Import the CSS file for additional styling

const Profile = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, [user_id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${user_id}`);
      const data = await response.json();
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

  if (!user) {
    return <div>Loading...</div>;
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_name)}&background=random`;

  return (
    <Page.Content>
      <Card className="profile-card">
        <Card.Body>
          <Grid.Row className="align-items-center">
            <Grid.Col auto>
              <Avatar size="xl" imageURL={avatarUrl} />
            </Grid.Col>
            <Grid.Col>
              <h2>{user.user_name}</h2>
              <p>{user.email}</p>
              <p><strong>Followers:</strong> {user.followers.length}</p>
            </Grid.Col>
          </Grid.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Borrowed Books</Card.Title>
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
    </Page.Content>
  );
};

export default Profile;