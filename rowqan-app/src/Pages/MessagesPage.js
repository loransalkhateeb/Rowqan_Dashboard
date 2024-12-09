import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL1 } from '../App';
import '../Styles/MessagesStyle.css';

function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    axios
      .get(`${API_URL1}/messages/AllMessages`)
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

 
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };















  return (
    <div className="messages-container scrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.sender_id === 1 ? 'sent' : 'received'}`}
        >
          <div className="message-header">
            <span className="sender-name">{message.sender.name}</span>
          </div>
          <div className="message-body">
            <p>{message.message}</p>
          </div>
          <div className="message-time">
            {formatTime(message.createdAt)} 
          </div>
          <div className="status">
            {message.status === 'unread' ? '• Unread' : '✔️ Read'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesPage;
