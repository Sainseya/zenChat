const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Failed to create the user" });
  }
});

const guestLogin = asyncHandler(async (req, res) => {
  const { name } = req.body;

  let user = await User.findOne({ name });

  if (user) {
    res.status(400);
    throw new Error('Nom d\'utilisateur déjà existant');
  }

  const randomEmail = `${name}-${Math.random().toString(36).substring(2, 7)}@zen-chat.com`;
  user = await User.create({
    name,
    email: randomEmail,
    password: null,
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    contacts: user.contacts,
    token: generateToken(user._id),
  });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      contacts: user.contacts,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User doesn't exist");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  //If the user is in the database, so get his name and email.
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password")
    .populate();

  res.send(users);
});

const addToContact = asyncHandler(async (req, res) => {
  try {
    const { friendId, userId } = req.body;

    const userExists = await User.findOne({ _id: userId }).populate("contacts");
    const friendExist = await User.findById({ _id: friendId }).populate(
      "contacts"
    );

    if (userExists && friendExist) {
      console.log("Users exists");
      const contactList = userExists.contacts.toString();

      // On vérifie si l'id de friend est dans la liste des contacts
      if (contactList.includes(friendExist._id)) {

        // console.log("user contact" + contactList)
        // console.log("------------------");
        // console.log("friend contact" + friendExist._id)
        console.log("user is in contanct list");
        res.status(400).json({ error: "User is in contact list" });
      } else {

        // On inclu le friend dans la liste des contacts
        userExists.contacts.push(friendExist);
        friendExist.contacts.push(userExists)
        
        // Enregistrez les modifications dans la base de données
        const updatedUser = await userExists.save();
        const updatedFriend = await friendExist.save();

        // Vérifiez si l'utilisateur a été ajouté avec succès
        if (!updatedUser && !updatedFriend) {
          res.status(404).json({ error: "User couldn't be added to contacts" });
          console.log("not add");
        } else {
          // Retournez la réponse avec les informations mises à jour
          res.status(200).res.json(userExists + " " + friendExist).populate("password");
        }
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Gérez les erreurs d'une manière appropriée
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getContact = asyncHandler(async (req, res) => {
  try {
    // Assurez-vous que l'utilisateur est authentifié ou récupérez l'ID de l'utilisateur d'une manière appropriée
    const userId = req.user._id;

    // Recherchez l'utilisateur dans la base de données par son ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Récupérez les contacts de l'utilisateur
    const contacts = user.contacts;
    const contactList = [];

    // ForEach avec la méthode toString() pour itérer sur les éléments du tableau
    await Promise.all(
      contacts.map(async (element) => {
        const id = element.toString();
        const contactDetails = await User.findOne({ _id: id });
        contactList.push(contactDetails);
      })
    );

    res.status(200).send(contactList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const updateNickname = asyncHandler(async (req, res) => {
  console.log("test")
  try {
    const userId = req.body._id;
    const newNickname = req.body.newNickname

    const updatedNickName = await User.findByIdAndUpdate(
      userId,
      {
        name: newNickname,
      },
      { new: true, select: '-password -contacts -createdAt -updatedAt -email' }
    )


    res.status(200).send(updatedNickName);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// TODO : Methode remove user to contact list

module.exports = { registerUser, authUser, allUsers, addToContact, getContact, guestLogin, deleteUser, updateNickname };

