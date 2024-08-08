const User = require('../models/userModel');
const mongoose = require('mongoose');

// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

//controleur pour recuperer un utilisateur 

const getUserById= async(req, res)=>{
  if (!mongoose.Types.ObjectId.isValid(User)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }
try {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user)
   {res.status(404).json(({message: "utilisateur non trouvé"}));
  }
  res.status(200).json(user)
} catch (error) {
  console.error('erreur lors de la recuperation d/un utilisateur :',error);
  res.status(500).json({error:'erreur serveur'})
}
};

// //mettre a jour l'utilisateur
const updateUserById= async (req,res)=>{

  try {
    const userId= req.params.id
    const {username,password, email,bio,followers,following,likes,unlikes }=req.body;
    const updateUser = await User.findByIdAndUpdate(userId,{username,password, email,bio,followers,following,likes,unlikes},{ new: true });
    if (!updateUser) {
        res.status(404).json({message:"l/utilsateur non trouvé "})
      }
  
    res.status(200).json(updateUser);
    
  } catch (error) {
    console.error('Erreur lors de la modification de l/ utilisateur :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// //controleur pour suppression d'un utilisateur
const deleteUserById= async(req ,res)=>{
  try {
    const userId=req.params.id;
    const deleteUser=await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(404).json({message:"utilisateur non trouvé"})
      
    }
    res.status(204).json({message:"supprimé avec succés "})
    
  } catch (error) {
    console.error('erreur lors de la supression d/un utilisateur :',error);
    res.status(500).json({error:'erreur serveur'})
  }
  };

// controlleur pour follow  user

const follow = async (req, res) => {
  const userId = req.params.id;
  const idToFollow = req.body.idToFollow;

  // Validate user IDs
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(idToFollow)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update the user's following array
      const updateUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { following: idToFollow } },
          { new: true, upsert: true }
      );

      if (!updateUser) {
          return res.status(400).json({ message: "Failed to update user" });
      }

      // Update the followed user's followers array
      const updateFollowedUser = await User.findByIdAndUpdate(
          idToFollow,
          { $addToSet: { followers: userId } },
          { new: true, upsert: true }
      );

      if (!updateFollowedUser) {
          return res.status(400).json({ message: "Failed to update followed user" });
      }

      res.status(201).json({ message: "Follow successful" });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//controlleur pour unfolllow user

const unfollow = async (req, res) => {
  const userId = req.params.id;
  const idToUnFollow = req.body.idToUnFollow;

  // Validate user IDs
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(idToUnFollow)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

   // Update the user's following array
   const updateUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { following: idToUnFollow } },
    { new: true, upsert: true }
);

if (!updateUser) {
    return res.status(400).json({ message: "Failed to update user" });
}

// Update the unfollowed user's followers array
const updateUnFollowedUser = await User.findByIdAndUpdate(
    idToUnFollow,
    { $pull: { followers: userId } },
    { new: true, upsert: true }
);

if (!updateUnFollowedUser) {
    return res.status(400).json({ message: "Failed to update unfollowed user" });
}

res.status(201).json({ message: "unFollow successful" });
} catch (error) {
console.error('Error:', error);
res.status(500).json({ error: 'Internal Server Error' });
}
};

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById, follow,unfollow };

