const express = require('express');
const router = express.Router();
const multer = require('../midldleware/multer-config');
const auth = require('../midldleware/auth.midlleware');

const sauceControllers = require('../controllers/saucesController');
router.get('/sauces', auth, sauceControllers.getAllSauces);
router.post('/sauces', auth, multer, sauceControllers.createSauce);
router.get('/sauces/:id', auth, sauceControllers.getOneSauce);
router.put('/sauces/:id', auth, multer, sauceControllers.modifySauce);
router.delete('/sauces/:id', auth, sauceControllers.deleteSauce);
router.post('/sauces/:id/like',auth, sauceControllers.likeDislikes );
module.exports = router;