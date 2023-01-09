import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ServerSwitch from '../server_switch/ServerSwitch';

function NavbarEvent() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav variant="tabs" defaultActiveKey="#first" className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/MyFavoriteEvent">My Favorite Event</Nav.Link>
            <Nav.Link as={Link} to="/MyJoinedEvent">My Joined Event</Nav.Link>
            <Nav.Link as={Link} to="/event/user">My Events</Nav.Link>
            <Nav.Link as={Link} to="/MyProfile">My Profile</Nav.Link>
            <Nav.Link as={Link} to="/MyCreatedEvent">Create Event</Nav.Link>
          </Nav>
          <ServerSwitch></ServerSwitch>
        </Container>
      </Navbar>

    </>
  )
}

export default NavbarEvent