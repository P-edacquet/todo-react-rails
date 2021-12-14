import React, { useState } from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const api_users = process.env.REACT_APP_API + 'users'

const Signup = () => {
  let history = useHistory()
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const {name, value} = event.target
    setUser({...user, 
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(api_users, {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        setUser(response.data)
        history.push('/')
      } else {
        setError(
          response.data.errors
        )
      }
    })
    .catch(console.log('api errors:', error))
  }

  return (
    <div>
      <h1>Sign Up</h1>
      
      {error !== null && <div>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input 
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={user.password_confirmation}
          onChange={handleChange}
        />
      
        <button placeholder="submit" type="submit">
          Sign Up
        </button>
    
      </form>
      <div>
        {
          //TODO state.errors ? handleErrors() : null
        }
      </div>
    </div>
  );
}

export default Signup;