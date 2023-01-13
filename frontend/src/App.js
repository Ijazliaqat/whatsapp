import { useEffect, useState } from 'react';
import Chat from './chat';
import Sidebar from './sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('messages/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, [])

  useEffect(() => {

    const pusher = new Pusher('a4a7172bef7de76823ae', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      // alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  console.log(messages);

  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages} />
      </div>

    </div>
  );
}

export default App;
