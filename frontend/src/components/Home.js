import React from 'react';
import { Page, Card, Button, Grid } from 'tabler-react';

const Home = () => {
  return (
    <Page.Content>
      <Grid.Row>
        <Grid.Col width={6}>
          <Card>
            <Card.Header>
              <Card.Title>Featured Books</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Check out the most popular books in our collection.</p>
              <Button color="primary" href="/books">Browse Books</Button>
            </Card.Body>
          </Card>
        </Grid.Col>
        <Grid.Col width={6}>
          <Card>
            <Card.Header>
              <Card.Title>Featured Libraries</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Explore the most visited libraries in our network.</p>
              <Button color="primary" href="/libraries">Browse Libraries</Button>
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col width={6}>
          <Card>
            <Card.Header>
              <Card.Title>Featured Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>Meet the most active users in our community.</p>
              <Button color="primary" href="/users">Browse Users</Button>
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Page.Content>
  );
};

export default Home;