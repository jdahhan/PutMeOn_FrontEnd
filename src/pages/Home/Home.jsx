import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Home(){
  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

  return (
    <div className="content">
      <h1>🤗 SWE React Demo </h1>
      <div>
        <p className="quote">"A list is only as strong as its weakest link"</p>
        <p className="quote-author">- Donald Knuth</p>
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

