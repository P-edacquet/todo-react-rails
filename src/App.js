import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// // import { makeStyles } from '@material-ui/core/styles';

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './layouts/Layout'

// // const useStyles = makeStyles({
// //   app_title: {
// //     textAlign: "center"
// //   }
// // })

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

// // class App extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { 
// //       isLoggedIn: false,
// //       user: {}
// //     };
// //   }
// // componentDidMount() {
// //   this.loginStatus()
// // }
// // loginStatus = () => {
// //     axios.get('http://localhost:3001/logged_in', 
// //     {withCredentials: true})    
// // .then(response => {
// //       if (response.data.logged_in) {
// //         this.handleLogin(response)
// //       } else {
// //         this.handleLogout()
// //       }
// //     })
// //     .catch(error => console.log('api errors:', error))
// //   }
// // handleLogin = (data) => {
// //     this.setState({
// //       isLoggedIn: true,
// //       user: data.user
// //     })
// //   }
// // handleLogout = () => {
// //     this.setState({
// //     isLoggedIn: false,
// //     user: {}
// //     })
// //   }  
// //   render() {
// //     return (
// //       <div>
// //         <div className="App">
// //           <header className="App-header">
// //             <Typography variant="h1">Todo Stream</Typography>
// //             <BrowserRouter>
// //             <Switch>
// //                 <Route 
// //                   exact path='/' 
// //                   render={props => (
// //                   <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
// //                   )}
// //                 />
// //                 <Route 
// //                   exact path='/login' 
// //                   render={props => (
// //                   <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
// //                   )}
// //                 />
// //                 <Route 
// //                   exact path='/signup' 
// //                   render={props => (
// //                   <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
// //                   )}
// //                 />
// //               </Switch>
// //             </BrowserRouter>
// //             <hr></hr>
// //             <TodoList />
// //           </header>
// //         </div>
// //       </div>
// //     );
// //   }
// // }

// // function App2() {
// //   const classes = useStyles();
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <Typography variant="h1" className={classes.app_title}>Todo Stream</Typography>
// //         <hr></hr>
// //         <TodoList />
// //       </header>
// //     </div>
// //   );
// // }
export default App;