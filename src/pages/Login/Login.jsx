import React from 'react';
import {useHistory} from 'react-router-dom';

import './login.css';

export default function Login(){
//   const history = useHistory();

//   function navigateToPage(path) {
//     history.push(path);
//   }

  return (
    <div className="content">
      <img className='logo' alt= "headphone" src="images/headphones.png"/>
      <h1>Put Me On</h1>
      <form>
        <label> Username 
            <input class="page-input" type="text" name="username" /> 
        </label>
        <br></br>
        <label> Password  
            <input class="page-input" type="text" name="password" /> 
        </label>
        
      </form>
      <button
        className='page-button'
      >
          Create Account
      </button>
    </div>
  );
}