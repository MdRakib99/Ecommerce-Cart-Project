import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../assets/img/logo.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetToken, RemoveToken } from "../Utility/TokenHelper";

function AppNavbar() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (GetToken()) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <Navbar expand='lg' className='sticky-top'>
      <Container fluid>
        <Navbar.Brand href='#'>
          <img src={logo} className='nav-logo' alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink to='/' className='nav-link'>
              Products
            </NavLink>
            {login ? (
              <NavLink className='nav-link' to='/cart'>
                Cart
              </NavLink>
            ) : (
              <></>
            )}
          </Nav>

          {login ? (
            <button onClick={() => RemoveToken()} className='btn btn-danger'>
              Logout
            </button>
          ) : (
            <NavLink to='/login' className='btn btn-danger'>
              Login
            </NavLink>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
