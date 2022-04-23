import React, {useState} from 'react';
import axios from 'axios';

import './useritem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';

export default function UserItem({name}) {
    return (
    <div className='user-item'>
        <p>{name}</p>
    </div>
    )
}