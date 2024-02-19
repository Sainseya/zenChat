import MessageInput from "../components/Chat/MessageInput";
import ChatMessages from "../components/Chat/ChatMessages";


const Chat = ({ inServer = false, contactList }) => {

  return (
    <div className="bg-cream flex flex-col h-full">
      <ChatMessages inServer={inServer} contactList={contactList} />
      <MessageInput />
    </div>
  );
};

export default Chat;
