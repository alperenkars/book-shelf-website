import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Books from './components/Books';
import Libraries from './components/Libraries';
import Users from './components/Users';
import { Container, Grid } from 'tabler-react';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Grid.Row>
            <Grid.Col width={12}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/libraries" element={<Libraries />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Grid.Col>
          </Grid.Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;