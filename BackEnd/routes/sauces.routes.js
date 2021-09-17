const express = require('express');
const router = express.Router();
const multer = require('../midldleware/multer-config');
const auth = require('../midldleware/auth.midlleware');
app = require('../config/app')
path = require('path')

const stuffCtrl = require('../controllers/saucesControler');
app.use('/BackEnd/images', express.static(path.join(__dirname, 'images')));
router.get('/sauces', auth, stuffCtrl.getAllSauces);
router.post('/sauces', auth, multer, stuffCtrl.createSauce);
router.get('/sauces/:id', auth, stuffCtrl.getOneSauce);
router.put('/sauces/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/sauces/:id', auth, stuffCtrl.deleteSauce);

module.exports = router;