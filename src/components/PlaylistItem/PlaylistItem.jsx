import React, {useState} from 'react';

import './playlistitem.css';

export default function PlaylistItem({name, likeCount, songs}) {
  const [active, setActive] = useState(false);
  return (
    <div className="playlist-item" onClick={()=>{setActive(!active)}}>
      <p class = 'child'> {name} </p>
      <p class = 'child'> {likeCount} </p>
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
  );
}


