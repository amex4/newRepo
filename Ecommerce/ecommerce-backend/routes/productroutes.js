const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const authenticateJWT = require('../middleware/authmiddleware');
const authorizeRole = require('../middleware/authrolemiddleware');

router.post('/', authenticateJWT, authorizeRole('superadmin'), productController.addProduct);
router.get('/', authenticateJWT, productController.getProducts);
router.get('/:id',authenticateJWT,productController.getProductById);
router.post('/delete/:id',authenticateJWT, authorizeRole('superadmin'), productController.deleteProduct);
router.put('/update/:id',authenticateJWT,authorizeRole('superadmin'), productController.updateProduct);

module.exports = router;    
