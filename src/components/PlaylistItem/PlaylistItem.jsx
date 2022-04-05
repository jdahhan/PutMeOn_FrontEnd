import React, {useState} from 'react';
import axios from 'axios';

import './playlistitem.css';

import LoggedIn from '../LoggedIn/LoggedIn';
import {backendurl} from '../../config';

export default function PlaylistItem({name, likeCount, songs, userLikes}) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(undefined);
  const [refresh, setRefresh] = useState(undefined);

  const [songLikes, setSongLikes] = useState(likeCount);
  
  if (userLikes) {
	  if (userLikes.likedPlaylists.includes(name)){
	 
	     var button_text = "Unlike";

	  }
	  else {
	     var button_text = "Like";
	  }
  }
  
  
  const [buttonText, setButtonText] = useState("Click to Like/Unlike");
  
  console.log("button_text:" + button_text)
  console.log("buttonText:" + buttonText)
  
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
    <div className="playlist-item" onClick={()=>{setActive(!active)}}>
      <p class = 'child'> {name} </p>
      <p class = 'child'> {songLikes} </p>
      
      
      {active &&
      <div>
        <br></br>
        {songs.length ? songs.map((song, index) => (
          <div className = "song-list-item">{index+1}. {song}</div>
        )) : (
          <div className = "song-list-item">This playlist is currently empty.</div>
        )}
      
     
	</div>
      }

    </div>
    
    {LoggedIn() && 
      <div className = "like-playlist">
	
          <button id="like_button"
          onClick={() => {
          	if (buttonText == "Unlike"){
			handleUnlikePlaylist();
		}
		else if (buttonText == "Like"){
			handleLikePlaylist();
		}
		else {
			setButtonText(button_text);
		}

          }}>
          {buttonText} 
          </button>


          <button id="add_song_button"
          onClick={() => {


          }}>
          Add Song
          </button>

    
     </div>
    }
    </div>
    );
    
       
}
