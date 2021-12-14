import React, { useState } from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const Login = ({loggedInStatus}) => {
  let history = useHistory()
  const [user, setUser] = useState({ 
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        // setUser(response.data)
        history.push('/')
      } else {
        setErrors(
          response.data.errors
        )
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  const handleChange = (event) => {
    const {name, value} = event.target
    setUser({...user, 
      [name]: value
    })
  }

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map(error => {
            return <li key={error}>{error}</li>
          })
          }
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h1>Log In</h1>

      { errors !== null ? handleErrors() : <></> }

      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to='/signup'>sign up</Link>
        </div>
        
      </form>
    </div>
  );
}

export default Login;