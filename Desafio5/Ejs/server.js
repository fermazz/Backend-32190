const express = require ('express')

const app = express()

//base de datos de productos que va a ser un array vacio
const productos = []

//use para que acepte json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//sets
app.set('view engine', 'ejs')

//get para la página, puede ser productos : productos
app.get('/', (req, res) => {
    res.render('inicio', {productos})
})


//post para el formulario. recibimos un producto desde el body y pusheamos
//redirect recarga la página y va al root
app.post('/productos', (req, res) =>{
    productos.push(req.body)
    res.redirect('/')
})


PORT = 8080
const server = app.listen(PORT, () =>{
    console.log('Servidor escuchando en el puerto: ' + PORT)
})
server.on('error', error => console.log(error))

