import MicIcon from '@mui/icons-material/Mic';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import React, { useState } from 'react';
import axios from './axios';
import './chat.css';
const Chat = (props) => {
    const { messages } = props;

    const [input, setInput] = useState('');
    const date = new Date() 
    const hours = date.getHours();
    const mints = date.getMinutes();
    
    // console.log(`${hours}:${mints}`);

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Half-Mathematician",
            timestamp: `${hours}:${mints}`,
            receive: true
        })
        
        // console.log(e.target.value);

        setInput('');
    }
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />

                <div className='chat__headerInfo'>
                    <h3>Room Name</h3>
                    <p>Last Seen .....</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.receive && "chat__reciever"}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>{message.timestamp}</span>
                    </p>
                ))}

            </div>

            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message here...' />
                    <button onClick={sendMessage} type='submit'>Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat