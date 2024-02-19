const Chat = require("../models/chatModels");
const Server = require("../models/serverModel");
const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createServer = asyncHandler(async (req, res) => {

  var users = JSON.parse(req.body.users);

  console.log(req.body.name + " " + req.body.users)
  if (!users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  try {
    const serverChat = await Server.create({
      serverName: req.body.name,
      users: users,
    });

    const fullServer = await Server.findOne({ _id: serverChat._id })
      .populate("users", "-password")

    res.status(200).json(fullServer);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchAllServer = asyncHandler(async (req, res) => {
  try {
    Server.find({})
      .then(async (results) => {
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchAllChannel = asyncHandler(async (req, res) => {
  const serverId = req.query.serverId;

  try {
    const channels = [];
    const results = await Server.findById(serverId);

    if (results) {
      for (const element of results.chat) {
        const chat = await Chat.findById(element).populate("users");
        channels.push(chat);
      }
      res.status(200).send(channels);
    } else {
      res.status(404).send({ message: 'Server not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

const createChannel = asyncHandler(async (req, res) => {
  console.log(req.body.name + " " + req.body.users);

  if (!req.body.users || !req.body.name || !req.body.serverId) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  var serverId = req.body.serverId;

  try {
    // Utilisation de await pour attendre la résolution de la promesse
    const server = await Server.findById(serverId);

    if (!server) {
      return res.status(404).send({ message: "Server not found" });
    }

    const channel = await Chat.create({
      chatName: req.body.name,
      users: [req.body.users], // Utilisation de crochets pour créer un tableau avec un seul utilisateur
      isGroupChat: true,
      groupAdmin: req.body.users,
    });

    // Ajout du canal au tableau channels du serveur
    server.chat.push(channel);

    // Enregistrement du serveur mis à jour
    await server.save();

    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const deleteChannel = asyncHandler(async (req, res) => {
  try {
    console.log(req)
    var channelName = req.body.name;
    var serverId = req.body.serverId;

    if (!channelName || !serverId) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    const server = await Server.findById(serverId);

    if (!server) {
      return res.status(404).send({ message: "Server not found" });
    }

    // Utilisation de findOneAndDelete pour trouver et supprimer un canal par son nom
    const channelDelete = await Chat.findOneAndDelete({ chatName: channelName });
    console.log(channelDelete)

    if (!channelDelete) {
      return res.status(404).send({ message: "Channel not found" });
    }
    console.log(channelDelete._id)

    // Retrait du canal du tableau channels du serveur
    const index = server.chat.indexOf(channelDelete._id);
    if (index !== -1) {
      server.chat.splice(index, 1);
    }

    // Enregistrement du serveur mis à jour
    await server.save();

    res.status(200).json(server);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const getAllUser = asyncHandler(async (req, res) => {

  var channelId = req.query.channelId;
  console.log("Channel Id " + channelId);

  try {

    if (!channelId) {
      return res.status(400).send({ message: "Channel not found " });
    }

    const userList = await Chat.findById(channelId)
      .populate("users", "-contacts -password -createdAt -updatedAt").exec()

    console.log(userList)

    res.status(200).json(userList.users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const joinChannel = asyncHandler(async (req, res) => {
  const channelId = req.body.channelId;
  const userId = req.body.userId;

  try {
    if (!channelId || !userId) {
      return res.status(400).send({ message: "ChannelId or userId is incorrect" });
    }

    const channel = await Chat.findById(channelId);
    const user = await User.findById(userId);

    if (channel && user) {
      const isUserExist = channel.users.find(existingUserId => existingUserId.equals(userId));
      if (!isUserExist) {
        channel.users.push(userId);
      } else {
        console.log("Already in ")
        return res.status(400).send({ message: "User already in the channel" });
      }
    } else {
      return res.status(400).send({ message: "Channel or user not found" });
    }

    // Enregistrement du serveur mis à jour
    await channel.save();

    res.status(200).json(channel.users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const quitChannel = asyncHandler(async (req, res) => {

  var channelId = req.body.channelId;
  var userId = req.body.userId;

  try {
    if (!channelId && !userId) {
      return res.status(400).send({ message: "ChannelId or userId is incorrect" });
    }

    const channel = await Chat.findById(channelId)

    const user = await User.findById(userId)

    if (channel && user) {
      console.log(user)

      const userIndex = channel.users.findIndex(existingUserId => existingUserId.equals(userId));
      console.log("index ", userIndex)

      if (userIndex == -1) {
        return res.status(400).send({ message: "User is not in the channel" });
      } else {
        channel.users.splice(userIndex, 1)
      }
    } else {
      return res.status(400).send({ message: "Channel or user not found" });
    }

    console.log(channel)

    // Enregistrement du serveur mis à jour
    await channel.save();

    res.status(200).json(channel.users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const sendPrivateMessage = asyncHandler(async (req, res) => {
  const userName = req.body.username;
  const content = req.body.content;
  // const userId = req.body.userId

  try {
    if (!userName) {
      return res.status(400).send({ message: "User name is empty" });
    }

    // Recherche de l'utilisateur avec le nom fourni
    const user = await User.findOne({ name: userName });
    console.log(user)

    if (user) {
      const userId = user._id;
      console.log("User ID", userId)
      // Recherche d'un chat existant entre l'utilisateur actuel et l'utilisateur cible
      let existingChat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [req.body.userId, userId] },
      }).populate("users", "-password");

      if (!existingChat) {
        // Si le chat n'existe pas, créez-le
        const chatData = {
          chatName: "Private Chat", // Vous pouvez ajuster le nom du chat selon vos besoins
          isGroupChat: false,
          users: [req.body.userId, userId],
        };

        existingChat = await Chat.create(chatData);
      }

      // Création d'un nouveau message
      const newMessage = {
        sender: userId,
        content: content,
        chat: existingChat._id,
      };

      // Enregistrement du message
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      // Mise à jour du champ latestMessage dans le chat
      await Chat.findByIdAndUpdate(existingChat._id, { latestMessage: message });

      res.json(message);
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = { createServer, createChannel, deleteChannel, getAllUser, joinChannel, quitChannel, fetchAllServer, fetchAllChannel, sendPrivateMessage }
