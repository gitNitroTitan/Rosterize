/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import filterPlayer from '../api/playerData';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand><h3>Rosterize</h3> 🏈 The Football Roster</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link><h4>Home</h4></Nav.Link>
            </Link>
            <Link passHref href="/players">
              <Nav.Link><h4>Team</h4></Nav.Link>
            </Link>
            <Link passHref href="/player/new">
              <Nav.Link><h4>New Player</h4></Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link><h4>Profile</h4></Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="sign-out" variant="outline-warning" onClick={filterPlayer}>Search</Button>
          </Form>
          <Button variant="warning" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
