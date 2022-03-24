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
    axios.get(backendurl + `users/login/${user}_${password}`)
      .then(() => {
        localStorage.setItem('user', user)
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