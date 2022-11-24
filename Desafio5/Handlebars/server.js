const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

//creo engine
app.engine('handlebars', handlebars.engine({
    extname: '.handlebars',
    defaultLayout: 'main.handlebars',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
})
)

//sets
app.set('views', './views')
app.set('view engine', 'handlebars')

//use para que acepte json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//base de datos de productos que va a ser un array vacio
const productos = []

//get para la página, puede ser productos : productos
app.get('/', (req, res) => {
    res.render('datos', {productos})
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

