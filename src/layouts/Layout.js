import React, {useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Layout = ({children, isPrivate = true}) => {
  let history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})    
    .then(response => {
      // console.log(response.data)
      if (response.data.logged_in) {
        setUser(response.data.user)
        setIsLoggedIn(true)
        // username.current = response.data.user.username
      } else {
        setIsLoggedIn(false)
        if (isPrivate === true) {
          history.push('/login')
        }
      }
    })
    .catch(error => console.log('api errors:', error))
  }, [history, isPrivate]);

  const onClickHandler = () => {
    // App du logout rails
    axios.get('http://localhost:3001/logout',
    {withCredentials: true})
    // Redirect to login
    .then(() => history.push('/login'))
    .catch(error => console.log('api errors:', error))
    
  };

  return (
    <div>
      { isLoggedIn && <>
        <nav>
          <button onClick={onClickHandler}>Logout</button>
        </nav>
        <h2>Bonjour {user.username} </h2>
      </> }

      { ( !isPrivate || (isPrivate && isLoggedIn) ) && children }
    </div>
  )
}

export default Layout
