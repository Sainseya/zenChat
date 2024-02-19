import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../Tools/Input";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PopUpGuestSignIn = ({ onClose }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast("Sois zen et entre un nom.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/guestLogin",
        { name },
        { headers: { "Content-Type": "application/json" } }
      );

      toast("Discute et reste zen.");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(`/chats/${data._id}`)
    } catch (error) {
      console.error("Erreur:", error);
      toast("Y'a une erreur , reste zen on s'occupe de ça.");
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-40 bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
      <ToastContainer />
      <div className="relative bg-slate-50 w-3/4 lg:w-2/4 p-6 shadow-md rounded-xl">
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-red-600 border-2 rounded-full flex justify-center items-center"
          onClick={onClose}
        >
          <p className="text-white font-bold text-center">X</p>
        </button>
        <p className="flex justify-center items-center p-4 font-semibold text-lg text-center">
          Connexion en tant qu'invité
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type={"pseudo"}
            name={"Pseudo"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <div className='flex justify-center items-center '>
          <button
            type="submit"
            className="font-semibold h-10 w-32 text-jet border-2 border-jet rounded-xl bg-dun hover:bg-dunHover"
          >
            Connexion
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpGuestSignIn;