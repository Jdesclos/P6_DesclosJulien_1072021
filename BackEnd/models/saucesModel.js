const mongoose = require('mongoose');


const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  manufacturer: {type: String, required: true},
  description: {type: String, required: true},
  mainPepper: {type: String, required: true},
  imageUrl: {type: String, default: "../BackEnd/images/sauce-default.jpeg"},
  heat:{type: Number, required: true},
  likes:{type:Number, default: 0},
  dislikes:{type:Number, default: 0},
  userLiked:{type: [String], required: true},
  userDisliked: {type: [String], required: true}
});



module.exports = mongoose.model('Sauce', sauceSchema);