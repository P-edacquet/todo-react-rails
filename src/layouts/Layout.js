import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Layout = ({children, isPrivate = true}) => {
  const [, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Test si isPrivate == true
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        setUser(response.data.user)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
    .catch(error => console.log('api errors:', error))
  }, [])

  return (
    <div>
      { isLoggedIn && children }
    </div>
  )
}

export default Layout
