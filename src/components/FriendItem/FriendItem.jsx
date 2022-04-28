import React, {useState} from 'react';
import axios from 'axios';

import './frienditem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';

const userName = () => (localStorage.getItem('user'));

export default function FriendItem({name, playlists}) {
    console.log(playlists)
    const [modal, setModal] = useState(false)
    return (
    <div>
	    <div className='user-item'>
		    <div onClick={()=>{setModal(!modal)}}>{name}</div>
            {modal &&
                playlists
            }
	    </div>
    </div>	    
    )
}
