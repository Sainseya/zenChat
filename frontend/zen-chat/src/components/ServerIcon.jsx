
const ServerIcon = ({ name = "server", onClick, inServer = false }) => {

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className={`flex flex-1 flex-col items-center ${inServer ? "w-40 h-40 p-4 bg-alabaster border-2 border-jet" : ""} `}>   
        <button
          className="mb-4 w-16 h-16 bg-dun hover:bg-dunHover border-2 border-jet rounded-xl"
          onClick={onClick}
        ></button>
        <p className="text-center">{name}</p>
      </div>
    </div>
  );
};

export default ServerIcon;
