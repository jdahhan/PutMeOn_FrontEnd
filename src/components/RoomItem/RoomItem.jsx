import React, {useState} from 'react';

import './roomitem.css';

export default function RoomItem({name, likeCount, desc}) {
  const [active, setActive] = useState(false);
  return (
    <div className="room-item" onClick={()=>{setActive(!active)}}>
      <p class = 'child'> {name} </p>
      <p class = 'child'> {likeCount} </p>
      {active &&
      <div>
        <br></br>
        <p> {desc} </p>
        </div>
      }
    </div>
  );
}


