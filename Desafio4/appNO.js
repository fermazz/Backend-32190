const express = require ('express')
const ProductosApi = require('./productos.js')
const multer = require ('multer')


const {Router} = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//Routers

const apiProductos = new ProductosApi()
const productosRouter = new Router()

//getAll
productosRouter.get('/', (req, res) => {
    res.json(apiProductos.getAll())
})

//getById
productosRouter.get('/:id', (req, res) => {
    res.json(apiProductos.getById(req.params.id))
})

//new Product
productosRouter.post('/', (req, res) => {
    res.json(apiProductos.save(req.body))
})

//server
app.use('/api/productos', productosRouter)

PORT = 8081

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
})
server.on('error', error => console.log(`error en el servidor ${error}`))
