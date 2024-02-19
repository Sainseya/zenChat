import React from 'react';
import Input from "../Tools/Input";
import { FaSearch } from 'react-icons/fa';

const AddMembers = ({ setStep, handleSearch, setSearch}) => {
  return (
    <div>
      <button
        className="absolute top-3 left-3 w-8 h-8 bg-red-600 border-2 rounded-full flex justify-center items-center"
        onClick={() => setStep('createGroup')}
      >
        <p className="text-white font-bold text-center">←</p>
      </button>

      <p className="flex justify-center items-center p-4 font-semibold text-lg">
        Ajouter des membres
      </p>

      <form onSubmit={handleSearch} className="relative">
        <div>
        <Input
          type={"text"}
          name={"Ajouter des membres au groupe"}
          id={""}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 right-3 fill-current" />
        </div>
      </form>
    </div>
  );
};

export default AddMembers;