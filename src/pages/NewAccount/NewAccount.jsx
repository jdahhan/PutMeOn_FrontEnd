import React from 'react';
import {useHistory} from 'react-router-dom';

//import './NewAccount.css';
export default function NewAccount(){

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
        
        <label> Confirm Password  
            <input class="page-input" type="text" name="password" /> 
        </label>

        </form>
        <button
        className='page-button'
        >
            Login
        </button>
    </div>
    );
}