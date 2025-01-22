import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Books from './components/Books';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import BookDetails from './components/BookDetails';
import Libraries from './components/Libraries';
import LibraryDetails from './components/LibraryDetails';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import { Site, Nav, Button, Container, Grid } from 'tabler-react';
import './App.css'; // Import the CSS file for additional styling

const App = () => {
  const userId = 47; // Fabiano Igo's user ID

  return (
    <Router>
      <Site.Wrapper>
        <Site.Header>
          <Container className="navbar-container">
            <Grid.Row className="align-items-center">
              <Grid.Col auto>
                <Link to="/" className="navbar-brand logo-container">
                  <img src="/image.png" alt="KUtüphane Logo" className="logo-image" />
                </Link>
              </Grid.Col>
              <Grid.Col>
                <Nav className="nav-bar">
                  <div className="nav-items">
                    <Nav.Item>
                      <Link to="/books" className="nav-link">
                        <i className="fe fe-book mr-2"></i> Books
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="/users" className="nav-link">
                        <i className="fe fe-users mr-2"></i> Users
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="/libraries" className="nav-link">
                        <i className="fe fe-home mr-2"></i> Libraries
                      </Link>
                    </Nav.Item>
                  </div>
                  <Nav.Item className="ml-auto">
                    <Button 
                      color="primary" 
                      RootComponent={Link}
                      to={`/profile/${userId}`}
                    >
                      Profile
                    </Button>
                  </Nav.Item>
                </Nav>
              </Grid.Col>
            </Grid.Row>
          </Container>
        </Site.Header>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:user_id" element={<UserDetails />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="/libraries/:library_id" element={<LibraryDetails />} />
          <Route path="/profile/:user_id" element={<Profile />} />
        </Routes>
      </Site.Wrapper>
    </Router>
  );
};

export default App;