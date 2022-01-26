import { Nav, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoImg from "../assets/Logo.png";
import { BsGift } from "react-icons/bs";

const NavbarComp = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <img
            src={LogoImg}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <Navbar.Brand href="/">Game-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/cart"></Nav.Link>
              <BsGift />
              <Nav.Link as={Link} to="/Login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/SignUp">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
