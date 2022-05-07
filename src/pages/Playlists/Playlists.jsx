import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import PlaylistItem from '../../components/PlaylistItem/PlaylistItem';
import PageTitle from '../../components/PageTitle/PageTitle';

import {backendurl} from '../../config';

import LoggedIn from '../../components/LoggedIn/LoggedIn';


import './playlists.css';

export default function Playlists() {
  const [playlists, setPlaylists] = useState(undefined);
  const [error, setError] = useState(undefined);
  
  const [user, setUser] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [userPlaylists, setUserPlaylists] = useState([]);

  const history = useHistory();
  
  
<<<<<<< HEAD
  const userName = localStorage.getItem('user')
  const token = localStorage.getItem('token')
=======
  const userName = localStorage.getItem('user');
>>>>>>> 69dc73bcf882c9ad130121c886617d77e2b95266
  
  useEffect(() => {
    axios.get(backendurl + 'playlists/list')
      .then((response) => {
        console.log(response.data);
        if (response.data){
          setPlaylists(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, [refresh])
  
  
  useEffect(() => {
    axios.get(backendurl + 'users/list')
      .then((response) => {
        console.log("get user list data",response.data);
        if (response.data){
          for (let user of response.data){
          	if (user.userName == userName) {
          		setUser(user);
          	}
          }
        }
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, [refresh])

  const handleCreatePlaylist = () => {
    let body = {'userName': userName, 'token': token};
    axios.post(backendurl + `playlists/create/${userName}/${newPlaylistName}`, body)
      .then(() => {
        setIsModalOpen(false);
        setRefresh(refresh + 1);
      })
      .catch(error => {
        setError(error);
        console.log(error);
      })
  }

  return (
    <div className="content">
      {(isModalOpen && LoggedIn()) && 
        <div className="create-modal">
          <input
            className="room-input"
            placeholder="Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <div className="create-actions">
            <button className="button" onClick={(e) => {
              setNewPlaylistName('');
              handleCreatePlaylist();
              }}>
            Create New Playlist</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>
        </div>
      }

      <div className="rooms-header">
        <PageTitle
          text="Playlists"
        />
      </div>

      {error && (
        <div className="playlists-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="playlists-list">
      	
        {playlists ? playlists.map((playlist, index) => (

          <PlaylistItem
            key={`${playlist.playlistName}-${index}`}
            name={playlist.playlistName}
            likeCount={playlist.likes.length}
            songs={playlist.songs}
            userLikes={user}
            editable={(playlist.owner == userName)}
          />
          

        )) : (
          <div className="playlists-empty">
            <p>Sorry there are no playlists right now... Come back later </p>
          </div>
        )}


      </div>

      <div>
        {LoggedIn() && 
          <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Playlist </button>
        }
      </div>
      <div>
      <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
        
      </div>
      <br></br>
    </div>
  )
}
