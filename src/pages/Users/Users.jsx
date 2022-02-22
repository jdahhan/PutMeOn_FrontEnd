import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import './users.css';

export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const history = useHistory();
  
  // const URL = 'https://put-me-on.herokuapp.com/'
  // uncommenting the above line breaks the code
  const URL = 'https://demo-repo23.herokuapp.com/'
  useEffect(() => {
    axios.get(URL + 'users/list')
      .then((response) => {
        if (response.data){
          console.log(response.data); // the response data should print at this point
          console.log(typeof(response.data)); // either URL should result in the same type
          setUsers(response.data);
          console.log(response.data); // the response data should print only for the demo repo on this line, implying the issue is setUsers somehow
        }
      })
      .catch(error => {
        console.log("NOT GOTTEN")
        setError(error);
        console.log(error);
      });
  }, [refresh])

  const handleCreateUser = () => {
    axios.post(URL + 'users/create/' + newUserName)
      .then(() => {
        setIsModalOpen(false);
        setRefresh(refresh + 1);
      })
      .catch(error => {
        setError(error);
        console.log(error);
      })
  }

  return (
    <div className="content">
      {isModalOpen && 
        <div className="create-modal">
          <input
            className="user-input"
            placeholder="User Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <div className="create-actions">
            <button className="button" onClick={handleCreateUser}>Create New User</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>
        </div>
      }
  
      <div className="rooms-header">
        <h1>Users</h1>
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      {error && (
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="rooms-list">
        {users ? users.map((user, index) => (
          <div 
            className="user-item"
            key={`${user.userName}-${index}`}
          >
            <p>{user.userName}</p>
            <p>{index}</p>
          </div>
        )) : (
          <div className="rooms-empty">
            <p>Sorry there are no users right now... Come back later </p>
          </div>
        )}
      </div>

      <div>
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New User </button>
      </div>
    </div>
  )
}
