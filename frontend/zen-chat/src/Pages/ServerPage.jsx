import React, { useEffect, useState } from "react";
import TopBar from "../components/Top/TopBar";
import ButtoncChoice from "../components/Tools/ButtoncChoice";
import Chat from "./Chat";
import ButtonChannel from "../components/Tools/ButtonChannel";
import { ChatState } from "../Context/ChatProvider";
import axios from 'axios';
import io from 'socket.io-client';
import { ToastContainer, toast } from "react-toastify";
import UserCard from "../components/UserCard";

const ENDPOINT = 'http://localhost:5000';

const ServerPage = () => {
  const [showChannel, setShowChannel] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const { user, socket, selectedChat, setSelectedChat, setSelectedChatCompare, setSocket, setMessages, channels, groups, server } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat || !socket) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${ENDPOINT}/api/message/${selectedChat}`,
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

  const handleMemberClick = () => {
    setShowMember(!showMember);
    if (showChannel) {
      setShowChannel(false);
    }
  };

  const handleChannelClick = () => {
    setShowChannel(!showChannel);
    if (showMember) {
      setShowMember(false);
    }
  };

  const handleUpdateChatChannel = (channelId) => {
    setShowChannel(false);
    setSelectedChat(channelId)
    setSelectedChatCompare(selectedChat);
    if (channels) {
      const newSocket = io(ENDPOINT);
      newSocket.emit('setup', user);
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat])

  return (
    <div className="bg-cream h-screen flex flex-col overflow-x-hidden">
      <ToastContainer />
      <div className="fixed top-0 w-full bg-white z-50">
        <TopBar pageName={"Zen Server"} inServer={true} />
        <div className="flex justify-items-center">
          <ButtoncChoice buttonName={"Channel"} onClick={handleChannelClick} />
          <ButtoncChoice buttonName={"Member"} onClick={handleMemberClick} />
        </div>
      </div>
      <div className="flex-col flex-1 relative">
        <div
          className={`pt-28 h-screen w-full flex absolute overflow-y-auto transition-transform duration-300 ease-in-out transform ${showChannel ? "translate-x-0" : "-translate-x-full"
            } z-40`}
          style={{ overflowY: 'auto', scrollbarWidth: 'none' }}
        >
          <div className="min-h-screen h-fit w-4/5 flex-col bg-dun border-r-2 border-l  border-jet">
            <div className="px-4 my-4 flex flex-col justify-center items-center">
              <ButtonChannel
                width="100%"
                height="3rem"
                name="Create Channel"
                color="alabaster"
                onClick={""}
              />
            </div>
            <div className="border-b-2 border-black my-4 mx-4">
              <p className="font-semibold pl-4">Salons Textuels</p>
            </div>
            <div className="px-4 flex flex-col items-center">
              {channels.map(channel => (
                <ButtonChannel
                  key={channel._id}
                  width="100%"
                  height="3rem"
                  name={`# ${channel.chatName || 'Unknown Chat'}`}
                  color="alabaster"
                  onClick={() => handleUpdateChatChannel(channel._id)}
                />
              ))}
            </div>
          </div>
          <button
            className="h-screen w-1/5"
            onClick={handleChannelClick}
          ></button>
        </div>

        <div
          className={`pt-28 h-screen w-full flex absolute overflow-y-auto transition-transform duration-300 ease-in-out transform ${showMember ? "translate-x-0" : "translate-x-full"
            } z-40`}
          style={{ overflowY: 'auto', scrollbarWidth: 'none' }}
        >
          <button
            className="h-screen w-1/5"
            onClick={handleMemberClick}
          ></button>
          <div className="min-h-screen h-fit w-4/5 flex flex-col bg-dun border-l-2 border-r border-jet">
            {channels.map((channel) => (
              Array.isArray(channel.users) && channel.users.map((user) => (
                <UserCard userName={user.name} pic={user.pic} onClick={""} key={user._id} />
              ))
            ))}
          </div>
        </div>
      </div>

      <div className="pt-28 w-screen h-screen">
        <div className="h-full">
          <Chat inServer={true} />
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
