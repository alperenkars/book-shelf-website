import React from 'react';
import { NavLink } from 'react-router-dom';
import { Site, Nav, Grid, Form } from 'tabler-react';

const Header = () => {
  return (
    <Site.Header className="Site.Header">
      <Grid.Row className="align-items-center">
        <Grid.Col className="col-auto">
          <Site.Logo href="/">Book Exchange</Site.Logo>
        </Grid.Col>
        <Grid.Col className="col">
          <Form.Input
            icon="search"
            placeholder="Search for books, libraries, users..."
          />
        </Grid.Col>
        <Grid.Col className="col-auto">
          <Nav>
            <Nav.Item to="/books" icon="book" as={NavLink}>
              Books
            </Nav.Item>
            <Nav.Item to="/libraries" icon="building" as={NavLink}>
              Libraries
            </Nav.Item>
            <Nav.Item to="/users" icon="users" as={NavLink}>
              Users
            </Nav.Item>
          </Nav>
        </Grid.Col>
      </Grid.Row>
    </Site.Header>
  );
};

export default Header;