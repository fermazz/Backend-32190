const express = require('express')

const app = express()

const productos = []


//sets
app.set('views', './views')
app.set('view engine', 'pug')

//use para que acepte json
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//get para la página, puede ser productos : productos
app.get('/', (req, res) => {
    res.render('datos', {productos})
})

//post
app.post('/productos', (req, res) =>{
    productos.push(req.body)
    res.redirect('/')
})


PORT = 8080
const server = app.listen(PORT, () =>{
    console.log('Servidor escuchando en el puerto: ' + PORT)
})
server.on('error', error => console.log(error))

