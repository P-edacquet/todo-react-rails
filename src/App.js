import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './layouts/Layout'

const App = () => {
  const [isLoggedIn] = useState(false)

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <Typography variant="h2">TodoList</Typography>
        </header>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Layout>
                <Home {...props} />
              </Layout>
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Layout isPrivate={false}>
                <Login {...props} />
              </Layout>
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Layout isPrivate={false}>
                <Signup {...props} loggedInStatus={isLoggedIn}/>
              </Layout>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;