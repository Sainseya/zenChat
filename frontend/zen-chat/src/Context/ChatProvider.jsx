import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [userSearch, setUserSearch] = useState();
  const [contactId, setContactId] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [groups, setGroups] = useState([])
  const [server, setServer] = useState([])
  const [channels, setChannels] = useState([])
  const [selectedChatCompare, setSelectedChatCompare] = useState(null)
  let navigate = useNavigate();


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo){
      navigate("/")
    }
  },[navigate]);



  return (
    <ChatContext.Provider
      value={{
        socket,
        setSocket,
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        userSearch,
        setUserSearch, 
        contactId,
        setContactId, 
        messages,
        setMessages,
        selectedChatCompare, 
        setSelectedChatCompare,
        groups,
        setGroups,
        channels, setChannels,
        server, setServer
            }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;