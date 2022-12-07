const { getProductos, postProducto, putProducto, deleteProducto } = require('../controlers/ControlerProduct');

const { Router } = require('express');
const validateAdmin = require('../middlewares/validAdmin');

const admin = true;

const productosRouter = Router();

productosRouter.get('/:id?', getProductos);
productosRouter.post('/', validateAdmin(admin), postProducto);
productosRouter.put('/:id', validateAdmin(admin), putProducto);
productosRouter.delete('/:id', validateAdmin(admin), deleteProducto);

module.exports = productosRouter;