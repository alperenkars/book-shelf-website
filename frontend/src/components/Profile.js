import React, { useEffect, useState } from 'react';
import { Page, Card, Grid, Avatar, Table } from 'tabler-react';
import './Profile.css';

const Profile = () => {
  const userId = 1;
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  if (!user) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_name)}&background=random&size=150`;

  return (
    <Page.Content>
      <Grid.Row>
        <Grid.Col width={12}>
          <Card className="profile-header-card">
            <Card.Body>
              <Grid.Row className="align-items-center">
                <Grid.Col auto>
                  <Avatar size="xxl" imageURL={avatarUrl} className="profile-avatar" />
                </Grid.Col>
                <Grid.Col>
                  <h1 className="profile-name">{user.user_name}</h1>
                  <p className="profile-email">{user.email}</p>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-value">{user.followers?.length || 0}</span>
                      <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{user.following?.length || 0}</span>
                      <span className="stat-label">Following</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{books.length}</span>
                      <span className="stat-label">Books Borrowed</span>
                    </div>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </Card.Body>
          </Card>
        </Grid.Col>

        <Grid.Col width={12}>
          <Card>
            <Card.Header>
              <Card.Title>Borrowed Books</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table className="books-table">
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>Title</Table.ColHeader>
                    <Table.ColHeader>Author</Table.ColHeader>
                    <Table.ColHeader>Genre</Table.ColHeader>
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
                      <Table.Col>{book.status}</Table.Col>
                      <Table.Col>{book.borrow_date}</Table.Col>
                      <Table.Col>{book.return_date}</Table.Col>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card.Body>
          </Card>
        </Grid.Col>

        <Grid.Col width={12}>
          <Card>
            <Card.Header>
              <Card.Title>Followers</Card.Title>
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
        </Grid.Col>

        <Grid.Col width={12}>
          <Card>
            <Card.Header>
              <Card.Title>Following</Card.Title>
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
        </Grid.Col>
      </Grid.Row>
    </Page.Content>
  );
};

export default Profile;