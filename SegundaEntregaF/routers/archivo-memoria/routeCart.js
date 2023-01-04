
const { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } = require('../../controller/archivo-memoria/contolerCart');

const { Router } = require('express');
const logRequestInfo = require('../../middlewares/logRequestInfo');

const carritoRouter = Router();

carritoRouter.use(logRequestInfo);

carritoRouter.post('/', logRequestInfo, postCarrito);
carritoRouter.delete('/:id', logRequestInfo, deleteCarrito);
carritoRouter.get('/:id', logRequestInfo, getProductosCarrito);
carritoRouter.post('/:id', logRequestInfo, postProductoCarrito);
carritoRouter.delete('/:id/:id_prod', logRequestInfo, deleteProductoCarrito);

module.exports = carritoRouter;