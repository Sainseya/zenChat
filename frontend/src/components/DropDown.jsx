import React from "react";
import { HiCog } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoIosContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

const DropDown = ({ closeDropDown }) => {
  let navigate = useNavigate();
  const {user} = ChatState();

  const handleLogout = async () => {
    if (user.email.endsWith('@zen-chat.com')) {
      try {
        await axios.delete(`http://localhost:5000/api/user/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (error) {
        console.error(error);
      }
    }
    localStorage.clear();
    closeDropDown();
    navigate("/");
  };

  const handleShowContact = () => {
    //? Retourner au contact avec l'id de l'utilisateur dans le navigate
    closeDropDown();
    navigate(`/chats/${user._id}`); //! Data tempo
  };

  const handleShowOptions = () => {
    closeDropDown();
  };

  return (
    <div
      className="flex flex-col absolute right-3 z-10 mt-4 w-40 origin-top-right bg-alabaster shadow-lg ring-2 ring-jet ring-opacity-100 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <div
        className="flex h-8 bg-alabaster hover:bg-alabasterHover border-b-2 border-jet items-center justify-items-center"
        onClick={handleShowContact}
      >
        <div className="w-10 pl-2 items-center justify-center">
          <IoIosContact size={20} />
        </div>
        <p className="text-sm">Accueil</p>
      </div>

      <div
        className="flex h-8 bg-alabaster hover:bg-alabasterHover border-b-2 border-jet items-center justify-items-center"
        onClick={handleShowOptions}
      >
        <div className="w-10 pl-2 items-center justify-center">
          <HiCog size={20} />
        </div>
        <p className="text-sm">Options</p>
      </div>

      <div
        className="flex h-8 bg-alabaster hover:bg-alabasterHover items-center justify-items-center"
        onClick={handleLogout}
      >
        <div className="w-10 pl-2 items-center justify-center">
          <FiLogOut size={20} />
        </div>
        <p className="text-sm">Déconnexion</p>
      </div>
    </div>
  );
};

export default DropDown;
