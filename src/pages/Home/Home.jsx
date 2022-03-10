import React from 'react';
import {useHistory} from 'react-router-dom';

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
      <button
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
  );
};

