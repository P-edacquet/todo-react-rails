import React, {useState, useEffect } from 'react'
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
      if (response.data.logged_in) {
        // setIsLoggedIn à faire APRÈS le setUser, sinon il y aura une erreur au moment de l'affichage du username
        // ou alors, il faut créer des variables vides au moment de la création du user, mais ça il y aura un léger
        // temps où le username ne sera pas affiché
        setUser(response.data.user)
        setIsLoggedIn(true)
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
