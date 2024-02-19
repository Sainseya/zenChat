import React, {useState} from "react";
import ShowPassword from "./ShowPassword";

const InputPassword = ({ name, id, value, onChange }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="grid md:gap-6">
    <div className="relative z-0 w-full mb-6 group flex items-center">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        id={id}
        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-[#d9dedc] appearance-none focus:outline-none focus:ring-0 focus:border-dunHover peer"
        value={value}
        onChange={onChange}
        placeholder=" "
        required
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-beaver peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {name}
      </label>
      <div className="ml-auto" onClick={handleClick}>
        <ShowPassword visible={show} />
      </div>
    </div>
  </div>
);
};
  
export default InputPassword;
