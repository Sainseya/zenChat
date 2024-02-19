import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Tools/Input";
import axios from "axios";
import InputPasswod from "../Tools/InputPasswod";
import { useNavigate } from "react-router-dom";
import { Spinner } from 'flowbite-react'

const PopUpLogin = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page par défaut
    setLoader(true)
    if (!email || !password) {
      toast("Sois zen mec, complete tous les champs");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password},
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data)
      setLoader(false)
      toast("Connecter");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(`/chats/${data._id}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast("Try again !");
      setLoader(false)
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
        <p className="flex justify-center items-center p-4 font-semibold text-lg">
          Connexion
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type={"email"}
            name={"Adresse e-mail"}
            id={"floating_email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputPasswod
            name={"Mot de passe"}
            id={"floating_password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex justify-center items-center">
          {loader ? (
            <Spinner size={'md'} color={'warning'} className="relative" />
          ) : (
            <button
              type="submit"
              className="font-semibold h-10 w-32 text-jet border-2 border-jet rounded-xl bg-dun hover:bg-dunHover"
            >
              Connexion
            </button>
          )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpLogin;
