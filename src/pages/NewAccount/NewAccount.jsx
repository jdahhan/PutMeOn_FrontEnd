import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { backendurl } from '../../config';

import styles from './newaccount.css';


export default function Login(){
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  
  const handleCreateUser = () => {
    if (password1 !== password2){
        setError("Passwords must match!");
        setPassword2('');
    }
    else{
        axios.post(backendurl + `users/create/`, {"userName": user, "password": password1})
        .then(() => {
            localStorage.setItem('user', user)
            history.push('/')
        })
        .catch(() => {
            setPassword1('')
            setPassword2('')
            setError("User with this name already exists!");
        })
      }
    }
  
  return (
    <div className='content'>
      <img className='logo' alt= "headphone" src="images/headphones.png"/>
      <h1>Make a New Account</h1>
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}/> 
        </label>
        <br></br>
        <label>
            <input className="pageinput" 
            type="password" 
            name="password2" 
            placeholder='confirm password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}/> 
        </label>
        
      </form>
      <button
        className='page-button'
        onClick={() => handleCreateUser()}
      >
          Register
      </button>
    </div>
  );
}