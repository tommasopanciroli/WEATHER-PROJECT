import { ApiKey } from '../apiKEY'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const MainContent = () => {
  const [weatherData, setWeatherData] = useState([])
  const [currentDateTime, setCurrentDateTime] = useState('')

  const getCurrentDateTime = () => {
    const now = new Date()
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }

    const formattedDateTime = now.toLocaleDateString('it-IT', options)
    setCurrentDateTime(formattedDateTime)
  }

  useEffect(() => {
    getCurrentDateTime()

    const fetchWeatherData = async () => {
      const cities = ['Rome', 'Milano', 'Paris', 'Berlin', 'New York']

      const fetchDataPromises = cities.map(async (city) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&lang=it&units=metric`
          )

          if (!response.ok) {
            throw new Error('Errore nel recupero dei dati meteorologici')
          }

          const data = await response.json()

          const temperatureCelsius = data.main.temp.toFixed(1)
          const minTemperatureCelsius = data.main.temp_min.toFixed(1)
          const maxTemperatureCelsius = data.main.temp_max.toFixed(1)

          const weatherDataItem = {
            ...data,
            main: {
              ...data.main,
              temp: temperatureCelsius,
              temp_min: minTemperatureCelsius,
              temp_max: maxTemperatureCelsius,
            },
          }

          return weatherDataItem
        } catch (error) {
          console.error(
            'Errore nel recupero dei dati meteorologici:',
            error.message
          )
          return null
        }
      })

      const fetchedData = await Promise.all(fetchDataPromises)
      setWeatherData(fetchedData.filter((data) => data !== null))
    }

    fetchWeatherData()
  }, []) // Esegui solo al montaggio

  return (
    <Container className="container text-white">
      <Container className="my-5">
        <h3 className="my-5">Previsioni Meteo per oggi:</h3>
        <Row className="">
          {weatherData.map((data, index) => (
            <div
              key={index}
              className="shadow-lg my-2"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
              }}
            >
              <Row className="d-flex align-items-center justify-content-center">
                <Col>
                  <img
                    className="img-fluid"
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt="img"
                  />
                </Col>
                <Col>
                  <h4 className="fs-3">{data.name}</h4>
                </Col>
                <Col className="d-none d-md-block">
                  <p>Condizioni del cielo:</p>
                  <p>
                    <strong>{data.weather[0].description}</strong>
                  </p>
                  <p>Precipitazioni: </p>
                  <p>{data.rain}</p>
                </Col>
                <Col className="d-none d-md-block">
                  <p>
                    Temperatura: <strong>{data.main.temp}°C</strong>
                  </p>
                  <p>
                    MIN: <strong>{data.main.temp_min}°C</strong>
                  </p>
                  <p>
                    MAX: <strong>{data.main.temp_max}°C</strong>
                  </p>
                </Col>
                <Col className="d-none d-lg-block">
                  <p>Sorgere del Sole: </p>
                  <p>
                    <strong>
                      {new Date(data.sys.sunset * 1000).toLocaleTimeString(
                        'it-IT'
                      )}
                    </strong>
                  </p>
                </Col>
                <Col className="d-none d-lg-block">
                  <p>Vento:</p>
                  <p>
                    <strong>{data.wind.speed} km/h</strong>
                  </p>
                  <p>Pressione atmosferica:</p>
                  <p>
                    <strong>
                      {(data.main.pressure * 0.75006).toFixed(1)} hPa
                    </strong>
                  </p>
                </Col>
              </Row>
            </div>
          ))}
        </Row>
      </Container>
    </Container>
  )
}

export default MainContent
