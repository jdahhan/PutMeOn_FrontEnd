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
  const [currentPlaylistName, setCurrentPlaylistName] = useState('');

  const history = useHistory();
  
  var userName = '';
  
  if (LoggedIn()) {
  	
  	userName = localStorage.getItem('user');
  }

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
        console.log(response.data);
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
    axios.post(backendurl + `playlists/create/${newPlaylistName}`)
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
      {isModalOpen && 
        <div className="create-modal">
          <input
            className="room-input"
            placeholder="Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <div className="create-actions">
            <button className="button" onClick={handleCreatePlaylist}>Create New Playlist</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>
        </div>
      }

      <div className="rooms-header">
        <PageTitle
          text="Playlists"
        />
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
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
          />
          

        )) : (
          <div className="playlists-empty">
            <p>Sorry there are no playlists right now... Come back later </p>
          </div>
        )}


      </div>

      <div>
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Playlist </button>
      </div>
    </div>
  )
}
