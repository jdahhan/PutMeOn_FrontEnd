import React, {useState} from 'react';
import axios from 'axios';

import './useritem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';

const userName = localStorage.getItem('user');

export default function UserItem({name, friend, outgoing, reload}) {
    const [isFriend, setFriend] = useState(friend);
    const [isOutgoing, setOutgoing] = useState(outgoing);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(undefined)
    const handleRemove = () => {
        axios.post(backendurl + "users/" + userName + '/remove_friend/' + name)
            .then( () =>{
                setFriend(false);
            })
            .catch((error) =>{
                setError(error);
                console.log(error)
            })
    }
    const handleRequest = () => {
        axios.post(backendurl + "users/" + userName + '/req_friend/' + name)
            .then( () =>{
                setOutgoing(true);
            })
            .catch((error) =>{
                setError(error);
                console.log(error)
            })
    }
    return (
    <div>
	    <div className='user-item'>
		    <div onClick={()=>{setModal(!modal)}}>{name}</div>
            {(modal && localStorage.getItem('user') !== "" && localStorage.getItem('user') !== name) && 
                <div className='modal'>
                    {isFriend && 
                        <button onClick={() => {handleRemove()}}>Remove Friend</button>
                    }
                    {isOutgoing && 
                        <button>Cancel Request</button>
                    }
                    {(!isOutgoing && !isFriend) &&
                        <button onClick={() => {handleRequest()}}>Send Request</button>
                    }
                </div>
            }
	    </div>
    </div>	    
    )
    
}
