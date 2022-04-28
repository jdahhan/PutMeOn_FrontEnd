import React, {useState} from 'react';
import axios from 'axios';

import './useritem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';

const userName = () => (localStorage.getItem('user'));

export default function UserItem({name, friend, outgoing, incoming}) {
    const [isFriend, setFriend] = useState(friend);
    const [isOutgoing, setOutgoing] = useState(outgoing);
    const [isIncoming, setIncoming] = useState(incoming);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(undefined)
    const handleCancel = () => {
        axios.post(backendurl + "users/" + name + '/dec_request/' + userName())
            .then( () =>{
                setOutgoing(false);
            })
            .catch((error) =>{
                setError(error);
                console.log(error)
            })
    }
    const handleRemove = () => {
        axios.post(backendurl + "users/" + userName() + '/remove_friend/' + name)
            .then( () =>{
                setFriend(false);
            })
            .catch((error) =>{
                setError(error);
                console.log(error)
            })
    }
    const handleRequest = () => {
        axios.post(backendurl + "users/" + userName() + '/req_friend/' + name)
            .then( () =>{
                setOutgoing(true);
            })
            .catch((error) =>{
                setError(error);
                console.log(error)
            })
    }
    const handleAccept = () => {
        axios.post(backendurl + "users/" + userName() + '/add_friend/' + name)
            .then( () =>{
                setFriend(true);
                setIncoming(false);
            })
            .catch((error) =>{
                setError(error);
                console.log(error)
            })
    }
    const handleDecline = () => {
        axios.post(backendurl + "users/" + userName() + '/dec_request/' + name)
            .then( () => {
                setIncoming(false);
            })
            .catch((error) => {
                setError(error);
                console.log(error);
            })
    }
    return (
    <div>
	    <div className='user-item'>
		    <div onClick={()=>{setModal(!modal)}}>{name}</div>
            {(modal && localStorage.getItem('user') !== "" && localStorage.getItem('user') !== name) && 
                <div className='modal'>
                    {isFriend && 
                        <button onClick={handleRemove}>Remove Friend</button>
                    }
                    {isOutgoing && 
                        <button onClick={handleCancel}>Cancel Request</button>
                    }
                    {isIncoming &&
                        <div className='modal'>
                            <button onClick={handleAccept}>Accept Request</button>
                            <button onClick={handleDecline}>Decline Request</button>
                        </div>
                    }
                    {(!isOutgoing && !isFriend && !isIncoming) &&
                        <button onClick={handleRequest}>Send Request</button>
                    }
                </div>
            }
	    </div>
    </div>	    
    )
}
