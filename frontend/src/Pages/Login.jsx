import React, { useState } from "react";
import PopUpSignIn from "../components/PopUp/PopUpSignIn";
import PopUpLogin from "../components/PopUp/PopUpLogin";
import Logo from "../assets/Logo.svg";
import BackgroundIMG from "../assets/BackgroundWideLogin.jpg"
import ParticlesBackground from "../components/Tools/ParticulesBackground";
import PopUpGuestSignIn from "../components/PopUp/PopUpGuestSignIn";


const Login = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [loginAccount, setLoginAccount] = useState(false);
  const [guestAccount, setGuestAccount] = useState(false);

  const handleSignInClick = () => {
    setNewAccount(true);
  };

  const handleLoginClick = () => {
    setLoginAccount(true);
  };

  const handleClose = () => {
    setNewAccount(false);
    setLoginAccount(false);
    setGuestAccount(false);
  };

  const handleGuestClick = () => {
    setGuestAccount(true);
  }

  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-slate-50 opacity-10"></div>
      <img className="absolute -z-10 inset-0 w-full h-full object-cover" src={BackgroundIMG} alt="" />
      <img className="absolute -z-10 inset-0 w-full h-full object-cover blur-sm" src={BackgroundIMG} alt="" />
      <div className="w-52 h-52 bg-dun border-2 border-jet rounded-full flex items-center justify-center mb-16 z-10">
        <img src={Logo} alt="logo" />
      </div>
      <div className="mb-11 z-10">
        <button
          className=" w-64 bg-dun border-2 border-jet text-black p-2 rounded-xl hover:bg-dunHover"
          onClick={handleLoginClick}
        >
          Connexion
        </button>
      </div>
      <div className="mb-11 z-10">
        <button 
        className=" w-64 bg-dun border-2 border-jet text-black p-2 rounded-xl hover:bg-dunHover"
        onClick={handleGuestClick}
        >
          Invité
        </button>
      </div>
      <div className="z-10">
        <p>
          Créer un compte ? {" "}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              handleSignInClick();
            }}
            className="text-blue-600 hover:underline"
          >
            S'inscrire
          </a>
        </p>
      </div>
      {newAccount && <PopUpSignIn onClose={handleClose} />}
      {loginAccount && <PopUpLogin onClose={handleClose} />}
      {guestAccount && <PopUpGuestSignIn onClose={handleClose} />}
    </div>
  );
};

export default Login;
