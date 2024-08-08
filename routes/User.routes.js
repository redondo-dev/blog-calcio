const express = require("express");

const { 
    createUser, 
    verifUser,
    logout
} =
    require('../controllers/Auth.Controller');

    const{
    getAllUsers, 
    getUserById,
    deleteUserById,
    updateUserById,
    follow,
    unfollow
} = 
require('../controllers/UserController');

const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload =multer();

const router = express.Router();
router.post("/register", createUser);
router.post("/login", verifUser);
router.get("/logout",logout);
router.get("/users", getAllUsers);
router.get("/users/:id",getUserById);
router.delete("/users/:id",deleteUserById);
router.put("/users/:id", updateUserById);
router.patch("/follow/:id",follow);
router.patch("/unfollow/:id",unfollow);

//upload photo profil
router.post("/upload",upload.single('file') ,uploadController.uploadProfil)

module.exports = router;
