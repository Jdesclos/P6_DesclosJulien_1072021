const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)//hash 10fois le password
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
//connection
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })//on cherche dans la BD vian l'email
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }//si il est trouvé on compare les password
      bcrypt.compare(req.body.password, user.password)
      //ensuite on envoie la réponse
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(//création d'un token d'authentification
              { userId: user._id },
              process.env.TOKEN_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};