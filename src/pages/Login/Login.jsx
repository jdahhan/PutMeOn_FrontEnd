import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { backendurl } from '../../config';

import styles from './login.css';


export default function Login(){
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  
  const handleUserLogin = () => {
    axios.patch(backendurl + `users/login/`, {"userName": user, "password": password})
      .then((response) => {
        localStorage.setItem('user', user)
        localStorage.setItem('token', response.data.token)
        history.push('/')
      })
      .catch(() => {
        setPassword('')
        setError("User with these credentials could not be found!");
      })
  }
  
  return (
    <div className='content'>
      <img className='logo' alt= "headphone" src="images/headphones.png"/>
      <h1>Put Me On</h1>
      {(error!=="") &&
        <div className={styles.errors}>
          {error}
        </div>
      }
      <form>
        <label> 
            <input className='pageinput'
            type="text" 
            name="username" 
            placeholder='username'
            value={user}
            onChange={(e) => setUser(e.target.value)}/> 
        </label>
        <br></br>
        <label>
            <input className="pageinput" 
            type="password" 
            name="password" 
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/> 
        </label>
        
      </form>
      <button
        className='page-button'
        onClick={() => handleUserLogin()}
      >
          Login
      </button>
    </div>
  );
}