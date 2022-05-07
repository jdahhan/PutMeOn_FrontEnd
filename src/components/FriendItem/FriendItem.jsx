import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './frienditem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import UserItem from '../UserItem/UserItem';

const userName = () => (localStorage.getItem('user'));

export default function FriendItem({name, playlists, likes, friends, user}) {
    console.log(playlists)
    const [refresh, setRefresh] = useState(0)
    const [error, setError] = useState('')
    const [modal, setModal] = useState(false)
    const [likedPlaylists, setLikes] = useState(undefined)
    const [ownedPlaylists, setOwned] = useState(undefined)
    const [userFriends, setFriends] = useState(undefined)

    useEffect(() => {
        axios.get(backendurl + 'users/get_likes/' + name)
          .then((response) => {
            setLikes(response.data);
          })
          .catch((error) => {
            setError(error);
          })
        axios.get(backendurl + 'users/get_owned_playlists/' + name)
          .then((response) => {
              setOwned(response.data)
          })
          .catch((error) => {
              setError(error);
          })
        }
    , [refresh])    

    return (
    <div>
	    <div className='friend-item'>
		    <div onClick={()=>{setModal(!modal)}}>{name}</div>
            {modal &&
            <div className='modal'>
                <div className='section'>
                    Created Playlists:
                    {ownedPlaylists ? ownedPlaylists.map((playlist, index) => (
                        <PlaylistItem
                            key={`${playlist.playlistName}-${index}`}
                            name={playlist.playlistName}
                            likeCount={playlist.likes.length}
                            songs={playlist.songs}
                            userLikes={user}
                            editable={false}
                        />
                        )) : (
                            <div className="playlists-empty">
                                <p> This friend has not created any playlists </p>
                            </div>
                        )}
                </div>
                <div className='section'>
                    Liked Playlists:
                    {likedPlaylists ? likedPlaylists.map((playlist, index) => (
                        <PlaylistItem
                            key={`${playlist.playlistName}-${index}`}
                            name={playlist.playlistName}
                            likeCount={playlist.likes.length}
                            songs={playlist.songs}
                            userLikes={user}
                        />
                        )) : (
                                <p> This friend has not liked any playlists </p>
                        )
                        }
                </div>
                <div className='section'>
                    Friends:
                        {friends ? 
                        <ul>
                            {friends.map((friend, index) => (<li key={index}> {friend} </li>))}
                        </ul>
                        :(
                            <p>This user has no friends!</p>
                        )}
                </div>
            </div>
            }
	    </div>
    </div>	    
    )
}
