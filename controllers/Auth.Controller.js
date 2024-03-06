const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      bio,
      followers,
      following,
      likes,
      unlikes,
    } = req.body;

    // // Check if the username already exists
    const existUser = await User.findOne({ username });

    if (existUser) {
      return res
        .status(400)
        .json({ error: "Le nom d'utilisateur existe déjà." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      bio,
      followers,
      following,
      likes,
      unlikes,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the created user
    return res
      .status(201)
      .json({ user: newUser, message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création d'un utilisateur :", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};
// Vérification du login
const maxAge = 3 * 24 * 60 * 60 * 1000;
const verifUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return res
        .status(400)
        .json({
          error: "Le nom d'utilisateur n'existe pas. Veuillez vous inscrire.",
        });
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "Nom d'utilisateur ou mot de passe invalide." });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.SECRET, {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ token, existUserID: existUser._id });
  } catch (error) {
    console.error("Erreur lors de la vérification d'admin :", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}
  const logout = (req,res) => {
    res.cookie("jwt", " ", { maxAge: 1 });
    res.redirect("/");
  };

module.exports = { createUser, verifUser, logout };
