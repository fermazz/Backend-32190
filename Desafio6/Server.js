const fs = require('fs')

class Contenedor {

    constructor(nombre){
        this.nombre = nombre
    }

    async save (obj) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            const ultimoId = archivoParse.length
            archivoParse.push({...obj, id: ultimoId + 1 });
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(archivoParse, null , 2))
        } catch (error) {
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify([{...obj, id:1}], null , 2))
        }      
    }

    async save1 (obj) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            archivoParse.push({...obj});
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(archivoParse, null , 2))
        } catch (error) {
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify([{...obj}], null , 2))
        }      
    }

    async getById (id) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            return productoEncontrado? productoEncontrado : "producto no encontrado o inexistente"
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
        
    }

    async getAll () {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            return archivoParse
        } catch (error) {
            return null
        }
    }

    async update (id, obj) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto);
            let productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            if (productoEncontrado) {
                let nuevoArray = archivoParse.filter(archivo => archivo.id !== id)
                productoEncontrado = {...obj, id: id}
                nuevoArray.push(productoEncontrado)
                fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(nuevoArray, null , 2))
                return `Se actualizo exitosamente el producto ${JSON.stringify(productoEncontrado)}`
            }else{
                return "No se encontro el producto"
            }
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
    }

    async deleteById (id) {
        try {
            const producto = await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8');
            const archivoParse = JSON.parse(producto)
            const productoEncontrado = archivoParse.find(archivo => archivo.id === id)
            let nuevoArray = archivoParse.filter(archivo => archivo.id !== id)
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(nuevoArray, null, 2))
            return productoEncontrado? 'El producto fue eliminado exitosamente' : 'No fue encontrado el producto'
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
    }

    async deleteAll () {
        try {
            await fs.promises.readFile(`./${this.nombre}.txt`, 'utf-8')
            fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify([], null, 2))
        } catch (error) {
            return "El archivo no existe, no hay productos"
        }
        
    }
}

const produc = new Contenedor('productos')
const mensajes = new Contenedor('mensajes')

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { Router } = express
const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)
const productos = new Router()
const PORT = 8080

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static(__dirname + "/Public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/productos", productos)

productos.get("/", async (req, res) => {
    const productos = await produc.getAll()
    res.render('index', {productos})
})

productos.get("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await produc.getById(parseInt(id)))
})

productos.post("/", async (req, res) => { 
    res.json(await produc.save(req.body), res.redirect('/productos'))
})

productos.put("/:id", async (req, res) => {
    const id = req.params.id 
    const obj = req.body
    res.json(await produc.update(parseInt(id), obj))
})

productos.delete("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await produc.deleteById(parseInt(id)))
})

io.on('connection', async socket =>{

    socket.emit('messages', await mensajes.getAll())

    socket.on('new-message', async data => {
        await mensajes.save1({...data, fyh: new Date().toLocaleString()})

        io.sockets.emit('messages', await mensajes.getAll())
    })
})

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})