import React from 'react';
import { Link } from 'react-router-dom';

import TodoList from '../components/TodoList/TodoList'

const Home = ({loggedInStatus}) => {
  return (
    <div>
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/signup'>Sign Up</Link>
      <TodoList loggedInStatus />
    </div>
  );
};
export default Home;