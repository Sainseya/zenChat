const express = require('express')
const { registerUser, authUser, allUsers, addToContact,getContact, guestLogin, deleteUser, updateNickname } = require("../controllers/userControllers")

const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/").post(registerUser).put(updateNickname).get(protect, allUsers)
router.post('/login', authUser)
router.route('/contact').post(protect, addToContact).get(protect, getContact)
router.post('/guestLogin', guestLogin);
router.delete('/:id', protect, deleteUser);

module.exports = router;