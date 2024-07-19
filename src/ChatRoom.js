import React, { useEffect, useState, useRef } from 'react';
import { fetchMessages, sendMessage } from './firestoreOperations'; // Adjust the path as needed
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import { auth } from './firebase'; // Import auth instance
import './ChatRoom.css'; 

const ChatRoom = ({ chatRoomID, userID }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user] = useAuthState(auth); // Get current user
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatRoomID) {
      fetchMessages(chatRoomID, setMessages);
    } else {
      console.error('No chatRoomID provided.', chatRoomID);
      return;
    }
  }, [chatRoomID]);

  // Scroll to the bottom of the messages container whenever the messages array changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (text) {
      await sendMessage(chatRoomID, userID, user.email, text); // Pass user email to sendMessage
      setText('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getNameFromEmail = (email) => {
    if (email) {
      return email.split('@')[0]; // Extracts name part before '@'
    } else {
      return 'Unknown'; // Handle case where email is undefined or null
    }
  };
  

  return ( 
    <div className="chat-room">
      <div className="messages">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`message ${msg.senderID === userID ? 'sent' : 'received'}`}
          >
            <strong style={{ color: '#2196F3' }}>{getNameFromEmail(msg.senderEmail)}:</strong> {msg.text}
            </div>
        ))}
        <div ref={messagesEndRef} /> {/* Added ref for scrolling to bottom */}
      </div>
      <div className='input-area'>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
