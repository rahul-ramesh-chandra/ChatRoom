import React, { useEffect, useState } from 'react';
import CreateChatRoom from './CreateChatRoom';
import ChatRoom from './ChatRoom';

const TeamComponent = ({ teamID, userID }) => {
  const [chatRoomID, setChatRoomID] = useState(null);

  useEffect(() => {
    const initializeChatRoom = async () => {
      const roomID = await CreateChatRoom(teamID);
      setChatRoomID(roomID);
    };

    initializeChatRoom();
  }, [teamID]);

  return (
    <div>
      {chatRoomID && (
        <div className="chat-room-id">
          <p>Chat Room ID: {chatRoomID}</p>
          <ChatRoom chatRoomID={chatRoomID} userID={userID} />
        </div>
      )}
    </div>
  );
};

export default TeamComponent;
