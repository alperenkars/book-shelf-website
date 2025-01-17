import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'tabler-react';

const Sidebar = () => {
  return (
    <Nav vertical>
      <Nav.Item to="/" icon="home" as={NavLink}>
        Home
      </Nav.Item>
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
  );
};

export default Sidebar;