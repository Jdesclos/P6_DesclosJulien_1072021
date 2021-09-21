const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');//indique à multer d'enregistrer dans le dossier images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//remplace les espaces par des '_'
    const extension = MIME_TYPES[file.mimetype];//met la bonne extension de fichier
    callback(null, name + Date.now() + '.' + extension);//nomduficherdate.extension
  }
});

module.exports = multer({storage: storage}).single('image');//nous exportons ensuite l'élément multer entièrement configuré,
                                                            //lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.