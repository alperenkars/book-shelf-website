import { Page, Card, Button, Container, Grid } from 'tabler-react';

const Welcome = () => {
  return (
    <Page.Content>
      <Container>
        <Grid.Row className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <Grid.Col md={8}>
            <Card>
              <Card.Body className="text-center">
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to KUtüphane</h1>
                <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
                  Explore a world of books and knowledge. Join us and dive into the world of literature.
                </p>
                <Button color="primary" size="lg" RootComponent="a" href="/books">
                  Explore Books
                </Button>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    </Page.Content>
  );
};

export default Welcome;