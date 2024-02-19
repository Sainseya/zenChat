import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddMembers from "./AddMembers";
import AddGroup from "./AddGroup";
import { ChatState } from "../../Context/ChatProvider";




const PopCreateGoup = ({ setShow, setGroupAdded }) => {

  const [groupName, setGroupName] = useState("");
  const [step, setStep] = useState('createGroup');
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  const {user} = ChatState();
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(true);


  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (!groupName) {
      return;
    }
    setStep('addMembers');
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsSearchOpen(true);
    if (!search) {
      return;
    }

    try {
      console.log("search", search)
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUserSearch({ data });
    } catch (error) {
      console.error(error);
    } 
  };

  const handleUser = (selectedUser) => {
    if (!selectedGroup.some(user => user._id === selectedUser._id)) {
      setSelectedGroup(prevGroup => [...prevGroup, selectedUser]);
      setIsSearchOpen(false);
    }
  };

  const removeUser = (index) => {
    setSelectedGroup(prevGroup => {
      const newGroup = [...prevGroup];
      newGroup.splice(index, 1);
      return newGroup;
    });
  };

    const createGroupChat = async () => {
      try {
        const userIds = selectedGroup.map(user => user._id);
        const { data } = await axios.post(
          `http://localhost:5000/api/server`,
          {
            users: JSON.stringify(userIds),
            name : groupName,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setShow(false);
        setGroupAdded(true)

      } catch (error) {
        console.error(error);
      }
    };



  return (
    
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-40 bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
      <div className="relative bg-slate-50 w-3/4 min-h-72 lg:w-2/4 p-6 shadow-md rounded-xl">
    
      <button
        className="absolute top-3 right-3 w-8 h-8 bg-red-600 border-2 rounded-full flex justify-center items-center"
        onClick={() => setShow(false)}
      >
        <p className="text-white font-bold text-center">X</p>
      </button>
      {step === 'createGroup' ? (
        <AddGroup
          setStep={setStep}
          handleSubmit={handleSubmit}
          groupName={groupName}
          setGroupName={setGroupName}
          setIsSearchOpen={setIsSearchOpen}
        />
      ) : (
        <AddMembers
          setStep={setStep}
          handleSearch={handleSearch}
          setSearch={setSearch}
        />
        
      )}
        <div  className={`absolute left-1/2 transform -translate-x-1/2 w-10/12 mt-4 bg-cream ${
          isSearchOpen ? "border-2 border-jet h-96" : ""
        }  rounded-lg z-40 overflow-y-auto`}>
        {isSearchOpen && userSearch.data && userSearch.data.filter(searchedUser => searchedUser._id !== user._id).map(user => (
          <div key={user._id} className="flex items-center p-4 bg-white  shadow-xs dark:bg-gray-800 border ">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {user.name}
              </p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {user.email}
              </p>
            </div>
            <button className="ml-auto" onClick={() => handleUser(user)}>
              +
            </button>
          </div>
        ))}
        </div>
        <div className="flex flex-wrap">
        {selectedGroup.map((user, index) => (
          <div className="flex justify-around font-semibold w-20 border-2 border-jet rounded-xl bg-dun mr-2 mt-1">
            <p>{user.name}</p>
            <button onClick={() => removeUser(index)} className="text-white font-bold">X</button>
          </div>
        ))}
        </div>
        {selectedGroup.length > 1
          ? (
          <div className="text-center mt-7">
            <button
              onClick={createGroupChat}
              className="font-semibold h-10 w-32 text-black border-2 border-jet rounded-xl bg-cream mb-4"
            >
              Créer le groupe
            </button>
          </div>
          )
          : (
            <></>
          )}
      </div>
    </div>
      );
}

export default PopCreateGoup;