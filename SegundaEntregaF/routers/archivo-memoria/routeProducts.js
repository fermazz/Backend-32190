
const { getProductos, postProducto, putProducto, deleteProducto } = require('../../controller/archivo-memoria/controlerProducts');

const { Router } = require('express');
const validateAdmin = require('../../middlewares/validAdmin');

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const productosRouter = Router();

productosRouter.get('/:id?', getProductos);
productosRouter.post('/', validateAdmin(admin), postProducto);
productosRouter.put('/:id', validateAdmin(admin), putProducto);
productosRouter.delete('/:id', validateAdmin(admin), deleteProducto);

module.exports = productosRouter;