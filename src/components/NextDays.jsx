import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { ApiKey } from '../apiKEY'

const NextDays = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const formatDateTime = (dateTimeString) => {
    const optionsDay = {
      weekday: 'long',
    }
    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
    }

    const date = new Date(dateTimeString)

    const dayOfWeek = date.toLocaleString('it-IT', optionsDay)
    const capitalizedDay =
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    const time = date.toLocaleString('it-IT', optionsTime)

    return { dayOfWeek: capitalizedDay, time }
  }

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&lang=it&units=metric`
      )

      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati meteorologici')
      }

      const data = await response.json()

      const extractedData = {
        city: data.city.name,
        list: data.list.map((item) => {
          const { dayOfWeek, time } = formatDateTime(item.dt_txt)
          return {
            dayOfWeek,
            time,
            description: item.weather[0].description,
            temperature: item.main.temp.toFixed(1),
            minTemperature: item.main.temp_min.toFixed(1),
            maxTemperature: item.main.temp_max.toFixed(1),
            pressure: item.main.pressure,
            windSpeed: item.wind.speed,
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            rain: item.rain ? item.rain['3h'] : null,
          }
        }),
      }

      setWeatherData(extractedData)
    } catch (error) {
      console.error(
        'Errore nel recupero dei dati meteorologici:',
        error.message
      )
    }
  }

  return (
    <Container className="container text-white">
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={6} md={8}>
          <p className="display-6 fs-3">
            Controlla il Meteo per i prossimi giorni
          </p>
          <Form.Group controlId="formCity">
            <Form.Label className="display-6 my-5">
              Inserisci la città
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Città"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Button
            className="border-white text-white shadow-lg mt-5"
            variant="transparent"
            onClick={getWeather}
          >
            Ottieni Meteo
          </Button>
        </Col>
        <Col xs={3} md={2}></Col>
      </Row>

      {weatherData && (
        <Container>
          <Row className="my-5">
            <Col>
              <h3>Previsioni Meteo per</h3>
              <h2 className="display-3 my-4" style={{ fontWeight: 'bold' }}>
                {weatherData.city}:
              </h2>
              {weatherData.list.map((item, index) => (
                <div
                  className="shadow-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                  }}
                  key={index}
                >
                  <Row className="g-3 my-4">
                    <Col>
                      <img className="img-fluid" src={item.icon} alt="icon" />
                    </Col>
                    <Col>
                      <h4 className="fs-2" style={{ fontWeight: 'bold' }}>
                        {item.dayOfWeek}
                      </h4>
                      <p>ore: {item.time}</p>
                    </Col>
                    <Col className="d-none d-md-block">
                      <p>Condizioni del cielo:</p>
                      <p>
                        <strong>{item.description}</strong>
                      </p>
                      {item.rain !== null && (
                        <p>
                          Pioggia (ultime 3 ore):{' '}
                          <strong>{item.rain} mm</strong>
                        </p>
                      )}
                    </Col>
                    <Col className="d-none d-md-block">
                      <p>
                        Temperatura: <strong>{item.temperature}°C</strong>
                      </p>
                      <p>
                        MIN: <strong>{item.minTemperature}°C</strong>
                      </p>
                      <p>
                        MAX: <strong>{item.maxTemperature}°C</strong>
                      </p>
                    </Col>
                    <Col className="d-none d-lg-block">
                      <p>Pressione atmosferica:</p>
                      <p>
                        <strong>
                          {(item.pressure * 0.75006).toFixed(1)} hPa
                        </strong>
                      </p>
                    </Col>
                    <Col className="d-none d-lg-block">
                      <p>Vento:</p>
                      <p>
                        <strong>{item.windSpeed} km/h</strong>
                      </p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default NextDays
