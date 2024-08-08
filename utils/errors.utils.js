// module.export.signUpErrors = (error) => {
//   let errors = { pseudo: "", email: "", password: "" };

//   if (error.message.inculdes("pseudo"))
//     errors.pseudo = "Pseudo incorrect ou deja pris ";

//   if (error.message.inculdes("email"))
//     errors.email = "Email incorrect  ";

//   if (error.message.inculdes("password"))
//     errors.password = "Le mot de passe doit faire minimum 6 caractéres ";

//   if (error.code === 11000) error.email = "Cet email est deja pris ";

//   return errors
// };
const uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' };
    if (err.message.includes('max size')) {
      errors.maxSize = "Le fichier dépasse la taille maximale autorisée";
    }
    if (err.message.includes('Invalid file format')) {
      errors.format = "Format de fichier non valide";
    }
    return errors;
  };
  
  const uploadProfil = (req, res) => {
    try {
   
    } catch (err) {
      const errors = uploadErrors(err); 
      console.error(errors);
      res.status(500).json({ message: 'Erreur lors du téléchargement du fichier', errors });
    }
  };
  
  module.exports = { uploadProfil,uploadErrors };
  