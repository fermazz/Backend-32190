const express = require('express');
const path = require('path');

const productRouter = require('./routers/RouterProduct');
const carritoRouter = require('./routers/RouterCart');

const app = express();
const port = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/productos', productRouter);
app.use('/api/carrito', carritoRouter);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});


app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});