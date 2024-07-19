import { db } from './firebase';
import { doc, setDoc, collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';

// Function to create a chat room
export const createChatRoom = async (teamID) => {
  const chatRoomID = `chatRoom_${teamID}`;
  const chatRoomRef = doc(db, "chatRooms", chatRoomID);

  await setDoc(chatRoomRef, {
    teamID: teamID,
    createdAt: new Date(),
  });

  return chatRoomID;
};

// Function to send a message
export const sendMessage = async (chatRoomID, senderID, senderEmail, text) => {
  const messagesRef = collection(db, "chatRooms", chatRoomID, "messages");

  await addDoc(messagesRef, {
    senderID: senderID,
    senderEmail: senderEmail, // Add senderEmail to message data
    text: text,
    timestamp: new Date(), // Ensure timestamp is added here
  });
};

// Function to fetch messages
export const fetchMessages = (chatRoomID, setMessages) => {
  console.log('Fetching messages for chatRoomID:', chatRoomID);
  if (!chatRoomID) {
    console.error('chatRoomID is undefined');
    return;
  }

  const messagesRef = collection(db, "chatRooms", chatRoomID, "messages");
  const q = query(messagesRef, orderBy('timestamp')); // Order messages by timestamp

  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      senderID: doc.data().senderID,
      senderEmail: doc.data().senderEmail,
      text: doc.data().text,
      timestamp: doc.data().timestamp,
    }));
    setMessages(messages);
  });
};