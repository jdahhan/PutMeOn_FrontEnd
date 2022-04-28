import React, {useState} from 'react';

export default function LoggedIn(){
    return localStorage.getItem('user') !== "";
}
