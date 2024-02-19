import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowPassword = ({ visible }) => {
    return (
      <div className="relative z-20 ml-auto hover:cursor-pointer">
        {visible ? (
                <FaEye />
            ) : (
                <FaEyeSlash  />
            )}
        </div>
    );
};
  
export default ShowPassword;