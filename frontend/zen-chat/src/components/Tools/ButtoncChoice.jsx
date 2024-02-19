import React from "react";

const ButtoncChoice = ({ buttonName, onClick }) => {
  return (
    <button
      className="flex-1 border border-jet border-opacity-100 text-center h-12 bg-dun hover:bg-dunHover flex items-center justify-center"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default ButtoncChoice;
