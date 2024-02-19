import Input from "../Tools/Input";


const AddGroup = ({handleSubmit, setGroupName, groupName, setIsSearchOpen}) => {
    setIsSearchOpen(false);
    return (
    <div>
        <p className="flex justify-center items-center p-4 font-semibold text-lg">
            Créer un groupe
        </p>
        <form onSubmit={handleSubmit}>
            <Input
            type={"text"}
            name={"Nom du groupe"}
            id={""}
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
            />
           <div className="flex justify-center items-center">
                <button
                type="submit"
                className="font-semibold h-10 w-28 text-black border-2 border-jet rounded-xl bg-dun hover:bg-dunHover"
                >
                Créer
                </button>
            </div>
        </form>
    </div>
    );
};

export default AddGroup;