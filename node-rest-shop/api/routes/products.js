const express = require('express');
const router = express.Router();
var multer  = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/product.controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')   
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)      
    }
  });

  //adding filter to our files, determining what extentions we need to store
  const fileFilter = (req, file, cb) => {
      if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);       //accept a file
      }else{
        cb(new Error("this file type is not allowed"), false);      //reject a file
      }
  }

var upload = multer({ 
                    storage: storage, 
                    limits: {
                        fileSize: 1024 * 1024 * 5 //determing the size
                    },
                    fileFilter: fileFilter 
                });


router.get('/', ProductController.products_get_all);

router.get('/search', ProductController.products_search_product);

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_product);
    
router.get('/:productId', ProductController.products_get_product);

router.patch('/:productId', checkAuth, ProductController.products_update_product);

router.delete('/:productId', checkAuth, ProductController.products_delete_product);




module.exports = router;