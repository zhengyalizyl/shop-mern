import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

export default function Header() {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >杨睿萱购物商店</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <LinkContainer to="/cart">
                                <Nav.Link >
                                    <i className='fas fa-shopping-cart' />
                                    CART</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                            <Nav.Link>
                                <i className='fas fa-user' />
                                SIGN IN</Nav.Link>
                            </LinkContainer>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
