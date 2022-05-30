import React from 'react'
import { Nav, Navbar, Container, NavDropdown, Button} from 'react-bootstrap'
import { useLogoutUserMutation } from '../services/appApi'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import './Navigation.css'

function Navigation() {
    const user = useSelector(state => state.user)
    const [logoutUser] = useLogoutUserMutation()

    async function handleLogout(e){
        e.preventDefault();
        await logoutUser(user);

        // Return to the homepage
        window.location.replace("/")
    }

  return (
    <Navbar bg="light" expand="lg">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>
                <div className="chat-logo">
                    Let<span className="chat-logo-x">X</span>Chat
                </div>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                {!user &&
                (<LinkContainer to="/login">
                    <Nav.Link><div className='login__btn'>Login</div></Nav.Link>
                </LinkContainer>) }
                <LinkContainer to="/chat">
                    <Nav.Link><div className='chat__btn'>Chat</div></Nav.Link>
                </LinkContainer>
                {user && 
                (<NavDropdown title={
                    <>
                        <img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objectFit:'cover', borderRadius:'50%'}} alt='user'/>
                        {user.name}
                    </>
                } id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <LinkContainer to={`/profile/${user._id}`}>
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Button variant='danger' onClick={handleLogout}> 
                        Logout
                    </Button>
                </NavDropdown.Item>
                </NavDropdown>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation