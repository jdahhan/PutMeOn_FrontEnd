import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import UserItem from '../../components/UserItem/UserItem';

import {backendurl} from '../../config';

import './users.css';
import LoggedIn from '../../components/LoggedIn/LoggedIn';

const userName = () => (localStorage.getItem('user'));


export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [refresh, setRefresh] = useState(0);
  const history = useHistory();

  useEffect(() => {
    axios.get(backendurl + 'users/list')
      .then((response) => {
        if (response.data){
          const lst = response.data.filter(user => userName() !== user.userName);
          console.log(lst)
          setUsers(lst);
        }
      })
      .catch(error => {
        setError(error);
        console.log(error);
      });
  }, [refresh])

  const checkList = (list) => {
    if (LoggedIn()){
      return list.includes(localStorage.getItem('user'));
    } else{
      return false;
    }
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
              friend={checkList(user.friends)}
              outgoing={checkList(user.incomingRequests)}
              incoming={checkList(user.outgoingRequests)}
          />)) : (
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
