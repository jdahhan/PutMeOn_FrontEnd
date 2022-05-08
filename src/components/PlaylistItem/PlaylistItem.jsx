import React, {useState} from 'react';
import axios from 'axios';

import './playlistitem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';



export default function PlaylistItem({name, likeCount, songs, userLikes, editable, parentR}) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(undefined);
  const [refresh, setRefresh] = useState(undefined);
  const [song, setSong] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [songLikes, setSongLikes] = useState(likeCount);
  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('user')

  const deleteSong = (song, index) => {
    axios.delete(backendurl + `playlists/${name}/remove_song/${song}`, {"userName": userName, "token": token}).then(() => {
      songs.splice(index, 1)
      setActive(false);
    }).catch((error) => {
      setError(error)
      console.log(error)
    })
  }

  const handleAddSong = () => {
    axios.post(backendurl + `playlists/${name}/add_song/${song}`, {"userName": userName, "token": token}).then(()=>{
      songs.push(song);
      setActive(false);
    }).catch((e)=>{
      setError(e);
    })
  };
  
  if (userLikes) {
	  if (userLikes.likedPlaylists.includes(name)){
	     var button_text = "Unlike";
	  } else {
	     var button_text = "Like";
	  }
  }
  
  const [buttonText, setButtonText] = useState("Click to Like/Unlike");
  
  const handleDeletePl = () => {
    axios.delete(backendurl + "/playlists/delete/" + name).then(() => {
      parentR()
    }).catch((error) => setError(error))
  }

  const handleLikePlaylist = () => {
    axios.post(backendurl + '/users/' + userLikes.userName + '/like_playlist/' + name)
      .then(() => {
        setButtonText("Unlike");
        setSongLikes(songLikes + 1);
        setRefresh(refresh + 1);
      })
      .catch(error => {
        setError(error);
        console.log(error);
      })
  }
  
  const handleUnlikePlaylist = () => {
    axios.post(backendurl + '/users/' + userLikes.userName + '/unlike_playlist/' + name)
      .then(() => {
        setButtonText("Like");
        setSongLikes(songLikes - 1);
        setRefresh(refresh + 1);
      })
      .catch(error => {
        setError(error);
        console.log(error);
      })
  }

  return (
  	<div>
    <div className="playlist-item">
      <div className='playlist-title' onClick={()=>{setActive(!active)}}>
      <p className= 'child' > {name} </p>
      <p className= 'child'> {songLikes} </p>
      </div>
      
      {active &&
      <div className='modal'>
        <div>
        {songs.length ? songs.map((song, index) => (
          <div className='songitem' key={`${song}-${index}`}><div>{index+1}. {song}</div> {editable && <div className='delsong' onClick={() => {deleteSong(song, index)}}>x</div>}</div>
        )) : (
          <div>This playlist is currently empty.</div>
        )}
        </div>
        {(LoggedIn() && editable) && 
          <div className='edit'>
            <input placeholder='new song' value={song} onChange={(e) => {setSong(e.target.value)}}></input>
            <button onClick={
              ()=>{
                handleAddSong();
                setSong('');
              }}>
                Add Song
              </button>
            <button className='deletebutton' onClick={() => {handleDeletePl()}}>Delete Playlist</button>
          </div>  
        }
	</div>
      }

    </div>
    
    {LoggedIn() && 
      <div className = "like-playlist">
        <button id="like_button"
        onClick={() => {
          if (buttonText == "Unlike"){
            handleUnlikePlaylist();
          } else if (buttonText == "Like"){
            handleLikePlaylist();
          } else {
            setButtonText(button_text);
          }
        }}>
        {buttonText} 
        </button>

     </div>}
    </div>
    );
    
       
}
