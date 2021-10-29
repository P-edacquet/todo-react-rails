import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Signup = () => {
  let history = useHistory()
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [error, setError] = useState(null)
      
  

  useEffect(() => {
    
  }, [])

  const handleChange = (event) => {
    const {name, value} = event.target
    setUser({...user, 
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
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
    .catch(error => console.log('api errors:', error))
  }

  // const handleErrors = () => {
  //   return (
  //     <div>
  //       <ul>{this.state.errors.map((error) => {
  //         return <li key={error}>{error}</li>
  //       })}</ul> 
  //     </div>
  //   )
  // }

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
          // state.errors ? handleErrors() : null
        }
      </div>
    </div>
  );
}

// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       username: '',
//       email: '',
//       password: '',
//       password_confirmation: '',
//       errors: ''
//      };
//   }
// handleChange = (event) => {
//     const {name, value} = event.target
//     this.setState({
//       [name]: value
//     })
//   };
// handleSubmit = (event) => {
//     event.preventDefault()
//     const {username, email, password, password_confirmation} = this.state
//     let user = {
//       username: username,
//       email: email,
//       password: password,
//       password_confirmation: password_confirmation
//     }
// axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
//     .then(response => {
//       if (response.data.status === 'created') {
//         this.props.handleLogin(response.data)
//         this.redirect()
//       } else {
//         this.setState({
//           errors: response.data.errors
//         })
//       }
//     })
//     .catch(error => console.log('api errors:', error))
//   };
// redirect = () => {
//     this.props.history.push('/')
//   }
// handleErrors = () => {
//     return (
//       <div>
//         <ul>{this.state.errors.map((error) => {
//           return <li key={error}>{error}</li>
//         })}</ul> 
//       </div>
//     )
//   }
// render() {
//     const {username, email, password, password_confirmation} = this.state
// // return (
// //       <div>
// //         <h1>Sign Up</h1>
// //         <form onSubmit={this.handleSubmit}>
// //           <input
// //             placeholder="username"
// //             type="text"
// //             name="username"
// //             value={username}
// //             onChange={this.handleChange}
// //           />
// //           <input
// //             placeholder="email"
// //             type="text"
// //             name="email"
// //             value={email}
// //             onChange={this.handleChange}
// //           />
// //           <input 
// //             placeholder="password"
// //             type="password"
// //             name="password"
// //             value={password}
// //             onChange={this.handleChange}
// //           />
// //           <input
// //             placeholder="password confirmation"
// //             type="password"
// //             name="password_confirmation"
// //             value={password_confirmation}
// //             onChange={this.handleChange}
// //           />
        
// //           <button placeholder="submit" type="submit">
// //             Sign Up
// //           </button>
      
// //         </form>
// //         <div>
// //           {
// //             this.state.errors ? this.handleErrors() : null
// //           }
// //         </div>
// //       </div>
// //     );
//   }
// }
export default Signup;