const fs = require('fs');
const Sauce = require('../models/saucesModel');
//creation d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)//récupération et mise en objet du body de la requete
  delete sauceObject._id;//supprime l'id générer par le front
  const sauce = new Sauce({
    ...sauceObject,//copie tous les éléments de req.body.sauce
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,//on indique l'url de l'image, req.protocol: http, req.get('host):l'hote du serveur, req.file.filename: nom du fichier
    usersLiked: [' '],//initialise le tableau dans la BD
    usersdisLiked: [' '],//initialise le tableau dans la BD
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};
//modifier la sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?//est-ce que req.file existe ?
    {//si oui
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :/*si non */ { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id : req.params.id })//trouver la sauce dans la base de donné grace à l'id de la requete
  .then(sauce => {
    const filename = sauce.imageUrl.split("/images/")[1]//supprime dans la BD
    fs.unlink(`images/${filename}`, () => {//supprimer en local
      Sauce.deleteOne({_id : req.params.id})
  .then(res.status(200).json({ message: "Sauce supprimée" }))
  .catch(error => res.status(400).json({ error }))

    })
  })
  .catch(error => res.status(500).json({ error }))
};
//afficher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}
//afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
//mise à jour des likes et dislikes
exports.likeDislikes =(req,res,next)=>{
  let {like, userId}= req.body;
  let sauceId = req.params.id;
  switch(like){
    case 1 :
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if(sauce.userLiked.includes(userId)){
            res.status(200).json({message:`L'utilisateur a dejà liké cette sauce`})
          }
          else
          {Sauce.updateOne({_id: sauceId}, {$push: {userLiked: userId},$inc:{likes: +1}})
          .then(()=>res.status(200).json({message: `J'aime`}))
          .catch((error)=>res.status(400).json({error}))}
        })
      break;
    case 0 :
        Sauce.findOne({ _id: sauceId })
          .then((sauce) => {
            if (sauce.userLiked.includes(userId)) {
              Sauce.updateOne({ _id: sauceId }, { $pull: { userLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.userDisliked.includes(userId)) {
              Sauce.updateOne({ _id: sauceId }, { $pull: { userDisliked: userId }, $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;
      case -1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { userDisliked: userId }, $inc: { dislikes: +1 }})
          .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
          .catch((error) => res.status(400).json({ error }))
      break;
  }
};