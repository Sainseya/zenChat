import React from "react";
import { FaMessage } from "react-icons/fa6";

const UserCard = ({ userName, onClick, pic, lastMessage }) => {
  return (
    <div className=" bg-alabaster w-full h-24 flex items-center border-y border-jet">
      <div className=" w-16 h-16 border-2 border-jet rounded-full ml-4 overflow-hidden">
          <img
            alt={"photo de " + userName}
            src={pic}
            className="w-full h-full object-cover"
          />
      </div>
      <div className=" ml-8">
        <p className=" text-black text-xl font-medium">{userName}</p>
        {/* <p style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '8rem' }}>
          dvkldvzlkvdnzjldnvjzdvnkljnefvkljnjklnjkl
        </p> */}
      </div>
      <button className="ml-auto mr-4" onClick={onClick}>
        <FaMessage color="#927265" size={25} />
      </button>
    </div>
  );
};

export default UserCard;
