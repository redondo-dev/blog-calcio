// const mongoose =require ('mongoose');
// const connectDB = async ()=>{
//  try{
//     mongoose.set("strictQuery",false);

//      mongoose.connect(process.env.MONGO_URI ,()=>
//     console.log("mongo connecté"));
  
//  }

// catch (err){
//     console.log(err)
//     process.exit()
// }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log('MongoDB connecté avec succès');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); // Utilisez 1 pour indiquer une erreur lors de l'arrêt du processus
  }
};

module.exports = connectDB;
