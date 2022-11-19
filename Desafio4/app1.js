//imports
const express = require ('express');
const multer = require ('multer');
const {Router} = express

//creo app
const app = express();
const productos = []
const productosRouter = new Router()

//uses
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//get
productosRouter.get('/', (req, res) =>
res.send)

productosRouter.get('/:id', (req, res) =>{
    const {id} = req.params
    const prodEncontrado = productos.find( (e) => e.id == id)
    if(!prodEncontrado){
        res.json(`Producto con el id: ${id} no existe`)
    }else{
        res.json({"Producto encontrado" : prodEncontrado})
    }

})

//post

productosRouter.post('/', (req, res) =>{
    const lengthProductos = productos.length
    const nuevoId = lengthProductos + 1
    productos.push({
        ...req.body, ...{id: nuevoId}
    })
    res.json({productos})
})

//put
productosRouter.put('/:id', (req,res) =>{
    const {id} = req.params
    const prodNuevo = req.body
    const prodEncontrado = productos.find((e) => e.id == id)
    if(!prodEncontrado) {
        res.json(`Producto con el id: ${id} no existe`)
    }else{
        const ProdEliminado = productos.splice(parseInt(id - 1), 1)
        productos.push({
            ...req.body, ...{id : id}
        })
        res.json({ anterior : prodEncontrado, nuevo : prodNuevo})
    }
})

//delete
productosRouter.delete('/:id', (req, res) =>{
    const {id} = req.params
    const prodEncontrado = productos.find((e) => e.id === id)
    if(!prodEncontrado) {
        res.json(`Producto con el id: ${id} no existe`)
    }else{
        const ProdEliminado = productos.splice(parseInt(id - 1), 1)
        res.json({"producto eliminado" : ProdEliminado})
    }
})

app.use("/api/productos", productosRouter)

//server

PORT = 8080

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
});
server.on('error', error => console.log(`Error en el servidor ${error}`));

