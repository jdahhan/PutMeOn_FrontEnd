import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import {backendurl} from '../../config';

import FriendItem from '../../components/FriendItem/FriendItem';

import './friends.css';

export default function Friends() {
  const [user, setUser] = useState(undefined);
  const [friends, setFriends] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(0);

  const history = useHistory();

  const userName = localStorage.getItem('user');
  var userObj;
  var found = false;
{/*
  useEffect(() => {
    axios.get(backendurl + 'users/list')
      .then((response) => {
        if (response.data){
          for (let username of response.data){
          	if (username.userName == userName) {
          		//console.log("the user has been found in the list of users")
          		//console.log(username)
          		userObj = username
          		found = true
          		setUser(username);
          	}
          }
          if (found) {
          	//console.log("this the logged in user:")
          	//console.log(userName)
		  var friends_list = [];
		  //console.log("friends are:")
		  //console.log(userObj.friends)
		  for (let username of response.data){
		      if (userObj.friends.includes(username.userName)) {
		          //console.log("this user IS IN friends list:")
		      	  //console.log(username)
		      	  friends_list.push(username);
		      }
		      else{
		      	//console.log("this user is not in you friends list:")
		      	//console.log(username)
		      }   
		  }	  
		  if (friends_list.length > 0) {
		  	setFriends(friends_list);
			  //console.log("these are the friends");
			  //console.log(friends);
		  }
		  else {
		  	//console.log("no friends :(")
		  	//console.log(friends)
		  }
          }
          else {
          	//console.log("user could not be found");
          }
        }
      })
      .catch(error => {
      	console.log("error found here:")
        setError(error);
        console.log(error);
      });
  }, [refresh])
*/}
  useEffect(() => {
    axios.get(backendurl + 'users/get_friends/' + userName)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        setError(error);
      })
    }, [refresh])
  
    function navigateToPage(path) {
    history.push(path);
  }

  console.log(friends)
  
  return (
    <div className="content">
    
      <div className="rooms-header">
        <h1>Friends</h1>
      </div>

      {error && (
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="rooms-list">
        {friends ? friends.map((friends, index) => (
          <div 
            className="user-item"
            key={`${friends.userName}-${index}`}
          >
          <FriendItem
            key={`${friends.userName}-${index}`}
            name={friends.userName}
            friends={friends.friends}
            user={user}
          />
          </div>
        )) : (
          <div className="rooms-empty">
            <p>Sorry you have no friends ... Add some friends below </p>
          </div>
        )}
      </div>
      
      <button
        onClick={() => navigateToPage('/users')}
        className="page-button"
      >
        View All Users
      </button> 
      
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>

    </div>
  )
}
