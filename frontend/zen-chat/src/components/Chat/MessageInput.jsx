import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, user, setMessages, socket, messages, groups, server } = ChatState();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleCommand = async (command) => {
    const commandArgs = command.split(' ');
    console.log(commandArgs)

    switch (commandArgs[0]) {
      case '/nick':
        // code to set the user's nickname on the server.
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/user`,
            {
              _id: user._id,
              newNickname: commandArgs[1],
            },
          );
          toast(`Tu as changer de surnom`);

        } catch (error) {
          console.error(error + "");
        }
        break;

      case '/list':
        // Code to list available channels.
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/server/fetchAllChannel/`,
            { params: { serverId: server } }
          );
          console.log(data.map(e => e.chatName))
          toast(`${data.map(e => e.chatName)}`);
        } catch (error) {
          console.error(error);
        }
        break;

      case '/create':
        // code to create a channel.
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/server/channel/`,
            {
              name: commandArgs[1],
              users: user._id,
              serverId: server
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          toast(`Creation du channel ${commandArgs[1]}`);
          console.log(data)
        } catch (error) {
          console.error(error);
        }

        break;

      case '/delete':
        // code to delete a channel.
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/server/deleteChannel`,
            {
              name: commandArgs[1],
              serverId: server
            },
          );
          toast(`Channel supprimer ${commandArgs[1]}`);
        } catch (error) {
          console.error(error);
        }
        break;

      case '/join':
        // code to join a channel.
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/server/joinChannel`,
            {
              userId: user._id,
              channelId: selectedChat
            },
          );
          toast(`Vous avez rejoins le channel ${data.chatName}`);
        } catch (error) {
          console.error(error);
        }

        break;

      case '/quit':
        // code to quit a channesl.
        try {
          const { data } = await axios.put(
            `http://localhost:5000/api/server/quitChannel`,
            {
              userId: user._id,
              channelId: selectedChat
            },
          );
          toast(`Vous venez de quitter le channel ${data.chatName}`);
        } catch (error) {
          console.error(error);
        }
        break;

      case '/users':
        // list users in the current channel.
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/server/listUsers`,
            { params: { channelId: selectedChat } }
          );
          toast(`${data}`);
        } catch (error) {
          console.error(error);
        }

        break;

      case '/msg':
        try {
          const { data } = await axios.post(
            `http://localhost:5000/api/server/sendPrivateMessage`,
            {
              content: commandArgs[2],
              username: commandArgs[1],
              userId: user._id
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          if (socket) {
            socket.emit('new message', data);
          }
        } catch (error) {
          console.error(error + "");
        }
        break;

      default:
        try {
          const { data } = await axios.post(
            `http://localhost:5000/api/message`,
            {
              content: command,
              chatId: selectedChat,
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          if (socket) {
            socket.emit('new message', data);
          }
        } catch (error) {
          console.error(error + "");
        }
        break;
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) {
      return;
    }

    // Check if the message is a command
    if (newMessage.startsWith('/')) {
      handleCommand(newMessage);
    } else {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        if (socket) {
          socket.emit('new message', data);
        }
      } catch (error) {
        console.error(error + "");
      }
    }

    setNewMessage("");
  };


  useEffect(() => {
    if (socket) {
      socket.on("message received", (msg) => {
        setMessages([...messages, msg]); //On reçois le message emis
      });
    }
  },);

  return (
    <div className={`sticky w-full flex items-center p-4 border-2 border-jet bg-beaver z-10 bottom-0`}>
      <ToastContainer />
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="bg-dun flex-grow h-9 p-2 border-2 border-jet rounded-lg"
        placeholder="Tape your text..."
        onKeyDown={handleKeyDown}
      />
      <div
        className="w-9 h-9 bg-dun border-2 border-jet rounded-full ml-2 flex items-center justify-center cursor-pointer"
        onClick={handleSendMessage}
      >
        <FaChevronRight color="#444148" size={20} />
      </div>
    </div>
  );
};

export default MessageInput;
