import React from "react";
import PropTypes from "prop-types";

const ButtonChannel = ({ name, onClick, width, height, color }) => {
  const buttonStyle = {
    width: width,
    height: height,
  };

  return (
    <button 
        className={`border border-jet text-text rounded-xl bg-${color} hover:bg-${color}Hover mb-4`} 
        style={buttonStyle}
        onClick={onClick}
    >
      {name}
    </button>
  );
};

ButtonChannel.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ButtonChannel;
