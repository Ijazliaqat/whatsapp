import { Avatar } from '@mui/material';
import React from 'react';
import './sidebarChat.css'

const SidebarChat = () => {
  return (
    <div className='sidebarChat' >
        <Avatar /> 
        <div className='sidebarChat__info'>
            <h2>Room Name</h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
}

export default SidebarChat