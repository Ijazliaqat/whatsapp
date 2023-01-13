import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar } from '@mui/material';
import './sidebar.css';
import SidebarChat from './sidebarChat';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src='' />
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchIcon />
                    <input placeholder='search here ...' type='text' />
                </div>
            </div>

            <div className='sidebar__chats'>
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;