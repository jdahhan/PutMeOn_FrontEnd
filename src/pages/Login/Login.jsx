import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Login(){
//   const history = useHistory();

//   function navigateToPage(path) {
//     history.push(path);
//   }

  return (
    <div className="content">
      <h1>Put Me On!</h1>
      <h1>🎧</h1>
      <button
        className="page-button"
      >``
        Email/Username
      </button>
      <button
        className="page-button"
      >
        Password
      </button>
      <button
        className='page-button'
      >
          Create Account
      </button>
    </div>
  );
}