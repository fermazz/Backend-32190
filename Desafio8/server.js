// Importaciones

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const {conectionChat} = require("./options/sqlite3conn")
const {conectionProducts} = require("./options/mysqlconn")
const ClienteSQL = require("./sqlcontainer")

// Constantes

const { Router } = express
const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)
const productos = new Router()
const PORT = 8080
const sql = new ClienteSQL(conectionProducts)
const sqlChat = new ClienteSQL(conectionChat)

sql.crearTablaProduct()
sqlChat.crearTablaChat()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static(__dirname + "/Public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/productos", productos)

productos.get("/", async (req, res) => {
    const productos = await sql.listarArticulos()
    res.render('index', {productos})
})

productos.get("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await sql.listarArticulosId(parseInt(id)))
})

productos.post("/", async (req, res) => { 
    res.json(await sql.insertarArticulos(req.body), res.redirect('/productos'))
})

productos.put("/:id", async (req, res) => {
    const id = req.params.id 
    const obj = req.body
    res.json(await sql.actualizar(obj, parseInt(id)))
})

productos.delete("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await sql.borrarArticulos(parseInt(id)))
})

io.on('connection', async socket =>{
    socket.emit('messages', await sqlChat.listarChat())

    socket.on('new-message', async data => {
        await sqlChat.insertarChat({...data, fyh: new Date().toLocaleString()})

        io.sockets.emit('messages', await sqlChat.listarChat())
    })
})

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})