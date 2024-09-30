import { Outlet, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/events">
                Events
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet /> {/* This will render the child route components */}
      </div>
    </>
  );
}

export default App;
