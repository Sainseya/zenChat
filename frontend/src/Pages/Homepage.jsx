import React, { useEffect, useState } from "react";
import TopBar from "../components/Top/TopBar";
import ButtonChoice from "../components/Tools/ButtoncChoice";
import UserCard from "../components/UserCard";
import ServerIcon from "../components/ServerIcon";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import PopCreateGoup from "../components/CreateGroup/PopUpCreateGoup";
import io from 'socket.io-client'

const Homepage = () => {
  const [groupAdded, setGroupAdded] = useState(false);
  const [showFriends, setShowFriends] = useState(true);
  const [showServers, setShowServers] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [popupCreateGroup, setPopouCreateGroup] = useState(false);
  const [contactList, setContactList] = useState([]);
  const { user, setContactId, selectedChat, setSelectedChat, socket, setSocket,
      setSelectedChatCompare, groups, setGroups,
      setServer, setChannels, 
      setMessages, messages } = ChatState();

  const currentUser = user && user._id;
  // const ENDPOINT = 'https://zenchat-61rp.onrender.com';
  const ENDPOINT = 'http://localhost:5000/';



  let navigate = useNavigate();

  const handleFriendsClick = () => {
    setShowFriends(true);
    setShowServers(false);
    setShowMessage(false);
  };

  const handleServerClick = () => {
    if (showMessage) {
      setShowMessage(false);
    }

    setShowServers(true);
    setShowFriends(false);
  };

  const handleChatClick = async (contactId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId: contactId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const data = response.data;
      setSelectedChat(data._id);
    } catch (error) {
      console.error("Error in handleChatClick:", error);
    }

    setContactId(contactId);
    setShowMessage(true);
    setShowFriends(false);
    setShowServers(false);
  };

  const fetchMessages = async () => {
    if (!selectedChat || !socket) {
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setMessages(
        data.map((e) => ({
          content: e.content,
          sender: e.sender,
          readBy: e.readBy,
          createdAt: e.createdAt,
        })).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
      socket.emit("join", selectedChat);
    } catch (error) {
      console.error("Error in fetchMessages:", error);
    }
  };

  const fetchData = async () => {
    if (!user) {
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/contact?search=${currentUser}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setContactList(data);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  const fetchAllServer = async () => {

    console.log(messages)
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/server`,
        // { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setGroups(data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAllChannel = async (group) => {
    try {
      setServer(group)
      const { data } = await axios.get(
        `http://localhost:5000/api/server/fetchAllChannel/`,
        { params: { serverId: group } }
      );
      setChannels(data)
      navigate(`/server/${group}`)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllServer();
  }, [currentUser, user]);

  useEffect(() => {
    if (user) {
      const newSocket = io(ENDPOINT);
      newSocket.emit('setup', user);
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
    setGroupAdded(false);
  }, [user, groupAdded]);

  useEffect(() => {
    fetchMessages();
    setSelectedChatCompare(selectedChat);
  }, [selectedChat, setMessages]);


  return (
    <div className="bg-yellow-50 h-screen flex flex-col overflow-x-hidden">
      <div>
        <div className="fixed top-0 w-full bg-cream z-50">
          <TopBar pageName={"Zen Chat"} />
          <div className="flex justify-items-center">
            <ButtonChoice buttonName={"Amis"} onClick={handleFriendsClick} />
            <ButtonChoice buttonName={"Serveurs"} onClick={handleServerClick} />
          </div>
        </div>

        <div className="flex flex-1 flex-row">
          <div className="w-screen absolute z-10">
            <div className="pt-28 flex-col transition-transform duration-300 ease-in-out transform translate-x-0">
              <div
                className={`w-full bg-cream overflow-y-auto transition-transform duration-300 ease-in-out transform ${showFriends
                  ? "translate-x-0 block"
                  : "-translate-x-full hidden"
                  }`}
              >
                {contactList.map((contact) => (
                  <UserCard
                    key={contact._id}
                    userName={contact.name}
                    pic={contact.pic}
                    email={contact.email}
                    onClick={() => handleChatClick(contact._id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-screen h-screen">
            <div className="pt-28 h-full flex-col transition-transform duration-300 ease-in-out transform translate-x-0">
              <div
                className={`z-10 w-full h-full overflow-y-auto transition-transform duration-300 ease-in-out transform
                ${showMessage
                    ? "translate-x-0 block"
                    : showServers
                      ? "-translate-x-full hidden"
                      : "translate-x-full hidden"
                  }
                `}
              >
                <Chat />
              </div>
            </div>
          </div>

          <div className="w-screen absolute z-20">
            <div className="pt-28 h-full flex-col transition-transform duration-300 ease-in-out transform translate-x-0">
              <div
                className={`w-full bg-cream overflow-y-auto transition-transform duration-300 ease-in-out transform ${showServers
                  ? "translate-x-0 block"
                  : "translate-x-full hidden"
                  }`}
              >
                <div className="bg-yellow-50 flex flex-col items-center justify-center">
                  <div className="grid grid-cols-2 gap-20 py-8">
                    {groups.map((group) => (
                      <ServerIcon key={group._id} name={group.serverName} onClick={() => fetchAllChannel(group._id)} />
                    ))}
                  </div>
                  <div className="py-4">
                    <CiCirclePlus className="items-center" onClick={() => setPopouCreateGroup(true)} size={25} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popupCreateGroup && <PopCreateGoup setShow={setPopouCreateGroup} setGroupAdded={setGroupAdded} />}
    </div>
  );
};

export default Homepage;
