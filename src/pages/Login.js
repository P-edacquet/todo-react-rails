import React, { useState } from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const Login = ({loggedInStatus}) => {
  let history = useHistory()
  const [user, setUser] = useState({ 
    username: '',
    email: '',
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

/*class Login extends Component {
  constructor(props) {
    super(props);
    this.state = 
  }
  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }
    
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/')
  }
handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }
render() {
    const {username, email, password} = this.state
return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
          
          </form>
          <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}*/

export default Login;