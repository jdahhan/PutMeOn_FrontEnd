import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import UserItem from '../../components/UserItem/UserItem';

import {backendurl} from '../../config';

import './users.css';
import LoggedIn from '../../components/LoggedIn/LoggedIn';

export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState(undefined);
  const history = useHistory();
  const [friends, setFriends] = useState([]);
  const [outgoings, setOutgoing] = useState([]);

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
    if (LoggedIn()){
      axios.get(backendurl + "users/get/"+localStorage.getItem('user'))
      .then((response) => {
        setFriends(response.data.friends);
        setOutgoing(response.data.outgoingRequests);
      })
    }
  }, [refresh])

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
            friend={friends.includes(user.userName)}
            outgoing={outgoings.includes(user.userName)}
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
