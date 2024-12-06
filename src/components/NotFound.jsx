import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = (props) => {
  const navigate = useNavigate()
  console.log(navigate)

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-center mt-5">
      <h1 className="display-3 text-danger">404 - Nessuna previsione qui!</h1>
      <p className="lead">
        L'informazione che cercavi non è disponibile,{' '}
        <Link to="/" className="text-danger">
          torna alla home
        </Link>
      </p>
      <Link to="/" className="btn btn-danger">
        Torna alla Homepage
      </Link>
    </div>
  )
}
export default NotFound
