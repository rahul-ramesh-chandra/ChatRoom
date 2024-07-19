import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreateChatRoom = async (teamID) => {
  if (!teamID) {
    console.error('teamID is not provided');
    return null;
  }

  const chatRoomID = `chatRoom_${teamID}`;
  const chatRoomRef = doc(db, "chatRooms", chatRoomID);

  try {
    await setDoc(chatRoomRef, {
      teamID: teamID,
      createdAt: new Date(),
    });
    return chatRoomID;
  } catch (error) {
    console.error('Error creating chat room:', error);
    return null;
  }
};

export default CreateChatRoom;
