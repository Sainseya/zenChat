import React, { useRef, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";


const ChatMessages = ({ inServer, contactList }) => {
  const { messages, user} = ChatState();
  const currentUser = user && user._id;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className=" flex-grow overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-4 flex flex-col">
          {inServer && (
            <div
              className={`flex items-center text-xs font-bold text-jet ${
                message.sender._id === currentUser ? "ml-auto mr-1" : "mr-auto ml-1"
              }`}
            >
              {message.sender.name}
            </div>
          )}
          <div
            className={`p-2 border-2 border-jet inline-block rounded-xl  ${
    
              message.sender._id === currentUser
                ? " bg-dun text-black ml-auto"
                : " bg-alabaster text-black mr-auto"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef}/> 
    </div>
  );
};

export default ChatMessages;
