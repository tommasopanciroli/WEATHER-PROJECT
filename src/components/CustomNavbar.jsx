import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const CustomNavbar = (props) => {
  const location = useLocation()
  console.log('LOCATION', location)

  return (
    <Navbar
      expand="lg"
      className="navbar bg-body-transparent border-bottom border-white"
    >
      <Container fluid={props.isFluid}>
        <Navbar.Brand href="/" style={{ color: 'white' }}>
          <img
            src="https://cdn.icon-icons.com/icons2/565/PNG/512/clear-sun_icon-icons.com_54320.png"
            alt="img"
            style={{ color: 'white', width: '30px' }}
          />
          <span className="ms-3">Epi-Meteo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link text-white">
              <div>Home</div>
            </Link>
            <Link to="/five-day" className="nav-link text-white">
              <div> Meteo per i prossimi 5 Giorni</div>
            </Link>
            <Link to="/preferiti" className="nav-link text-white">
              <div>Preferiti</div>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
