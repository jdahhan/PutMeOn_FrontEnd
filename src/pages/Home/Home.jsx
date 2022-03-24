import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import LoggedIn from '../../components/LoggedIn/LoggedIn';

export default function Home(){
  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }
  return (
    <div className="content">
      <h1> 🎧PutMeOn </h1>
      <div>
        <p className="quote">"Young LaFlame, he in sicko mode"</p>
        <p className="quote-author">- Travis Scott</p>
      </div>
      {(localStorage.getItem('user') != "") &&
        <div>
          Welcome back, {localStorage.getItem('user')}!  
        </div>
      }
      <button
        onClick={() => navigateToPage('/playlists')}
        className="page-button"
      >
        View All Playlists
      </button>
      <button
        onClick={() => navigateToPage('/users')}
        className="page-button"
      >
        View All Users
      </button> 
      {LoggedIn()
        ?<div className='content'>
          <button className='page-button'
          onClick={() => {
            localStorage.setItem('user', '');
            window.location.reload(false);
          }}>
          Logout
          </button>
      </div>
        :<div className='content'><button
          onClick={() => navigateToPage('/NewAccount')}
          className="page-button"
        >
          New Account
        </button> 
        <button
          onClick={() => navigateToPage('/login')}
          className="page-button"
        >
          Login
        </button> 
        </div>
      }
    </div>
  );
};

