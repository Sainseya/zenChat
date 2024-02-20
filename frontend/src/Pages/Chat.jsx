import MessageInput from "../components/Chat/MessageInput";
import ChatMessages from "../components/Chat/ChatMessages";


const Chat = ({ inServer = false }) => {

  return (
    <div className="bg-cream flex flex-col h-full">
      <ChatMessages inServer={inServer} />
      <MessageInput />
    </div>
  );
};

export default Chat;
