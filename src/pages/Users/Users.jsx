import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import UserItem from '../../components/UserItem/UserItem';

import {backendurl} from '../../config';

import './users.css';

export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newPassWord, setNewPassWord] = useState('');

  const history = useHistory();

  useEffect(() => {
    axios.get(backendurl + 'users/list')
      .then((response) => {
        if (response.data){
          setUsers(response.data);
        }
      })
      .catch(error => {
        setError(error);
        console.log(error);
      });
  }, [refresh])

  const handleCreateUser = () => {
    axios.post(backendurl + 'users/create/' + newUserName + "_" + newPassWord)
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
    
      <div className="users-header">
        <h1>Users</h1>
      </div>
              
      {error && (
        <div className="users-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="users-list">
        {users ? users.map((user, index) => (
          <UserItem
            key={`${user.userName}-${index}`}
            name={user.userName}
            friends={user.friends}
          />
        )) : (
          <div className="users-empty">
            <p>Sorry there are no users right now... Come back later </p>
          </div>
        )}
      </div>
      
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>

    </div>
  )
}
