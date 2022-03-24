import React, {useState} from 'react';

export default function LoggedIn(){
    console.log(localStorage.getItem('user'))
    return localStorage.getItem('user') !== "";
}
