import React from 'react'

const Input = ({type, name, id, value, onChange}) => {

  return (
    <div className="grid md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={name}
        id={id}
        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-[#d9dedc] appearance-none focus:outline-none focus:ring-0 focus:border-dunHover peer"
        value= {value}
        onChange={onChange}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-beaver peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {name}
      </label>
    </div>
  </div>
  )
}

export default Input
