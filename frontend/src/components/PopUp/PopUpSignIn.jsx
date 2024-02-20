import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Tools/Input";
import axios from "axios";
import InputPasswod from "../Tools/InputPasswod";
import {useNavigate} from 'react-router-dom';

const PopUpSignIn = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page par défaut

    if (password !== confirmePassword) {
      toast("Sois zen mec, les deux mots de passe ne correspondent pas !");
      return;
    }

    if (!name || !email || !password || !confirmePassword) {
      toast("Sois zen mec, complete tous les champs");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name, email, password, pic },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(data);

      toast("Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(`/chats/${data._id}`)
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast("An error occurred. Please try again later.");
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
          Créer un compte
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type={"text"}
            name={"Pseudo"}
            id={"floating_pseudo"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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
          <InputPasswod
            name={"Confirmer mot de passe"}
            id={"floating_confirme_password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmePassword}
          />

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="font-semibold h-10 w-32 text-jet border-2 border-jet rounded-xl bg-dun hover:bg-dunHover"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpSignIn;