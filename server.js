const express = require("express");
const connectDB = require("./config/db");
const dotenv =require ("dotenv").config();
const port = 5000;
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

connectDB();
const {checkUser,requireAuth}=require("./middleware/auth.middleware")
const app = express();


app.use(cookieParser());


// Middleware pour activer CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//jwt
app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req,res)=>{
res.status(200).send(res.locals.user._id)
}
)






app.use("/", require("./routes/User.routes"));



app.listen(port, () => console.log("le serveur est connecté " + port));

const bcrypt= require ("bcrypt");

// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv").config();
// const port = 5000;
// const cors = require("cors");
// const cookieParser = require('cookie-parser');
// const multer = require('multer');
// const path = require('path');
// const { checkUser, requireAuth } = require("./middleware/auth.middleware");

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // JWT Middleware
// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id);
// });


// // User routes
// app.use("/", require("./routes/User.routes"));

// // Start server
// app.listen(port, () => console.log(`Server is running on port ${port}`));

// const bcrypt = require("bcrypt");
