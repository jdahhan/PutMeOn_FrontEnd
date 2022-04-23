import React, {useState} from 'react';
import axios from 'axios';

import './useritem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';

const userName = localStorage.getItem('user');
var friended;

export default function UserItem({name, friends}) {
    console.log("name: ", name)
    console.log("friends: ", friends)
    
    
    
    if (friends) {
	    if (friends.includes(userName)) {
	    	console.log("you are friends with", name)
	    	friended = true;
	    }
	    else if (name != userName) {
	        console.log("not friends with", name)
	    	friended = false;
	    }
    }
    
    return (
    <div>
	    <div className='user-item'>

		<p>{name}</p>
	       
	       
	    </div>
	    
	    {friends==false &&
    	    // friends w user, button says unfriend
        
       
	    <div className='friend-button'>
	    <button
            onClick={() => true}
            className="button"
            >
          	Unfriend
            </button>
	    </div>
	    
	    }
	    
	    {friends && !friended &&
	    
    	    // not friends w user, button says add friend
        
       
	    <div className='friend-button'>
	    <button
            onClick={() => true}
            className="button"
            >
          	Add Friend
            </button>
	    </div>
	    
	    }
	    
    </div>	    
    )
    
}
