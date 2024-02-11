import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Button, NavDropdown, Spinner } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import ApiCategories from '../api/api.categories';
import ApiUsers from '../api/api.users';

const CustomNavbar = () => {
  const [categories, setCategories] = useState(null)
  const email = useSelector(state => state.user.email);
  const location = useLocation();

  useEffect(() => {
    loadCategories();
  }, [])


  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{position: 'relative'}}>
      <Container style={{alignItems: 'center'}}>
        <Navbar.Brand as={Link} to="/" style={{fontWeight: 'bold'}}>Kanal B News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav d-flex justify-content-between">
          <Nav className="me-auto" activeKey={location.pathname}>
              {renderNavLinks()}
          </Nav>
          {renderAdminDropdown()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  async function loadCategories() {
    const result = await ApiCategories.GetAll();
    setCategories(result);
  }

  function renderNavLinks() {
    if (categories == null)
      return (
        <Spinner animation="border" role="status" size='sm'>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    
    if (location.pathname.startsWith('/admin'))
        return;

    return categories.map((category) => (
      <Nav.Link eventKey={`/posts/${category}`} key={`/posts/${category}`} as={Link} to={`/posts/${category}`}>{category.toUpperCase()}</Nav.Link>
    ));
  }

  function renderAdminDropdown() {
    if (!email) return;

    return (
      <Nav>
        <NavDropdown title="ADMIN" id="basic-nav-dropdown">
            <NavDropdown.Item disabled={true}>
              {email}
            </NavDropdown.Item>
            
            <NavDropdown.Item as={Link} to={'/admin'} eventKey={'/admin'}>
              Dashboard
            </NavDropdown.Item>
            
            <NavDropdown.Divider />

            <NavDropdown.Item as={Button} onClick={ApiUsers.Logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
      </Nav>
    )
  }
}

export default  CustomNavbar;