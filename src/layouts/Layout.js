import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Layout = ({children, isPrivate = true}) => {
  let history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})    
    .then(response => {
      console.log(response.data)
      if (response.data.logged_in) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        if (isPrivate === true) {
          history.push('/login')
        }
      }
    })
    .catch(error => console.log('api errors:', error))
  },);

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
      { (!isPrivate || isLoggedIn) && <>
        <nav>
          <button onClick={onClickHandler}>Logout</button>
        </nav>
        {children}
      </>}
    </div>
  )
}

export default Layout