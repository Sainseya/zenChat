import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from "../DropDown";
import SearchBar from "../SearchBar";
import { ChatState } from "../../Context/ChatProvider";

const TopBar = ({ pageName, inServer = false }) => {
  const [dropDown, setDropDown] = useState(false);
  const { user } = ChatState();

  let nameUser;
  if (user) {
    nameUser = user.name;
  }

  const handleDotsClick = () => {
    setDropDown(!dropDown);
  };

  return (
    <div>
      <div className=" bg-cinereous flex flex-row items-center h-16 w-full">
        <div>
          <div className="text-cream text-xl font-bold ml-3 ">{pageName}</div>
          <div className="text-cream text-sm ml-3 ">{nameUser}</div>
        </div>
        <div className="flex-1 h-full">
          {!inServer && <SearchBar />}
          </div>
        <button className="mr-2" onClick={handleDotsClick}>
          <BsThreeDotsVertical color="white" size={20} />
        </button>
        <div className="top-56">
        {dropDown && <DropDown closeDropDown={handleDotsClick}/> }
        </div>
      </div>
    </div>
  );
};

export default TopBar;
