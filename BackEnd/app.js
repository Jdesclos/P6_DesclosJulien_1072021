const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require("path");
const app = express();
require('dotenv').config();

mongoose.connect(
    process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("connection error:" + err));

app.use(helmet());
//gestion des accès
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");//toutes les origines sont permises
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')))
//Cela indique à Express qu'il faut gérer la ressource images de manière statique
//(un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images
module.exports = app;