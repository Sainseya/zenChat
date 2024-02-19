const express = require('express')
const { protect } = require("../middleware/authMiddleware")
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatContollers")

const router = express.Router()

router.route("/").post(protect, accessChat)
router.route("/").get(fetchChats)
router.route("/group").post(protect, createGroupChat)
router.route("/rename").put(protect, renameGroup)
router.route("/grouperemove").delete(protect, removeFromGroup)
router.route("/groupAdd").put(protect, addToGroup)

module.exports = router;