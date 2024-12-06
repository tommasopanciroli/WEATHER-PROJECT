import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CustomNavbar = (props) => {
  console.log("navbar's props", props)

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container fluid={props.isFluid}>
        <Navbar.Brand href="#home">EpiMeteo - {props.subtitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link>
              <div>Home</div>
            </Link>
            <Link>
              <div>Città</div>
            </Link>
            <Link>
              <div>Previsioni</div>
            </Link>
          </Nav>
          <Nav>
            <Link>
              <div>Milano</div>
            </Link>
            <Link>
              <div>Torino</div>
            </Link>
            <Link>
              <div>Roma</div>
            </Link>
            <Link>
              <div>Napoli</div>
            </Link>
          </Nav>
          <Nav>
            <input type="text" placeholder="La tua città"></input>
            <button className="ms-3 ">Cerca</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
