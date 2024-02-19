const express = require('express')
const { protect } = require("../middleware/authMiddleware")
const { createServer, createChannel, deleteChannel, getAllUser, joinChannel, quitChannel, fetchAllServer, fetchAllChannel, sendPrivateMessage } = require("../controllers/serverControllers")

const router = express.Router()

router.route("/").post(protect, createServer).get(fetchAllServer);
router.route("/channel").put(protect, createChannel);
router.route("/deleteChannel").put(deleteChannel);
router.route("/listUsers").get(getAllUser);
router.route("/joinChannel").put(joinChannel);
router.route("/quitchannel").put(quitChannel);
router.route("/fetchAllChannel").get(fetchAllChannel);
router.route("/sendPrivateMessage").post(sendPrivateMessage)

module.exports = router;