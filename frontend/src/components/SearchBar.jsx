import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { IoIosAddCircleOutline } from "react-icons/io";

const SearchBar = ({ contactList, setContactList }) => {
  const [search, setsearch] = useState();
  const { user, setUserSearch } = ChatState();
  const { userSearch } = ChatState();
  const [showResponse, setShowResponse] = useState(false);

  const userList = userSearch?.data ?? [];

  const HandleDisplayResponse = () => {
    setShowResponse(!showResponse);
  };

  const handleSeach = async (event) => {
    event.preventDefault();
    if (!search) {
      toast("Veuillez insérer un nom ou un email !");
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUserSearch({ data });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la recherche.");
    } finally {
      HandleDisplayResponse();
    }
  };

  const handleAddToContact = async (event, userId) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/contact`,
        {
          friendId: userId,
          userId: user._id,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
  
      setContactList((contactList) => [...contactList, data]);
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast("Zen mec vous êtes déjà ami :)");
      }
    }
  };
  
  
  return (
    <div className="flex flex-1 h-full flex-col items-center justify-center">
      <ToastContainer />
      <form className="w-2/3 h-10">
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 shadow p-4 border border-jet bg-cream rounded-full"
            placeholder="Trouve un ami"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <button onClick={handleSeach}>
            <FaSearch className="absolute top-3 right-3 fill-current" />
          </button>
        </div>
      </form>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 top-12 w-10/12 mt-4 bg-cream ${
          showResponse ? "border-2 border-jet h-96" : ""
        }  rounded-lg z-40 overflow-y-auto`}
      >
        {!showResponse ? (
          ""
        ) : (
          <div>
            <button
              className=" flex items-center justify-center w-full h-10 bg-beaver hover:bg-beaver text-cream font-bold border-y border-jet"
              onClick={HandleDisplayResponse}
            >
              Fermer
            </button>
            {userList.map((user) => (
              <ul
                role="list"
                key={user._id}
                className="divide-y divide-gray-200 hover:bg-alabaster border-y border-jet"
              >
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 ml-2">
                      <img
                        className="w-10 h-10 rounded-full border border-jet"
                        alt="Neil image"
                        src={user.pic}
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center mr-2">
                      <IoIosAddCircleOutline
                        size={20}
                        onClick={(event) => handleAddToContact(event, user._id)}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
