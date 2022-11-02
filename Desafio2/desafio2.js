const {promises: fs} = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta
  }

//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(obj) {

    const objs = await this.getAll()
    let newId 
    if (objs.length == 0){
        newId = 1
    }else{
        newId = objs[objs.length -1].id +1
    }

    const newObj = {...obj, newId}
    obj.push(newObj)

    try {

        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        
    } catch (error) {
        throw new Error (`Error al guardar ${err}`)
        
    }
  }

//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.

  async getById(num) {

    const objs = await this.getAll()

    try {
      let item 
    } catch (error) {
      
    }
  }

//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

  async getAll() {

    try {
      // ??? aqui va this.ruta o '/.Productos.txt'
        const objs = await fs.readFile(this.ruta, 'utf-8') 
        return JSON.parse(objs)
        
    } catch (error) {
       return []
        
    }
  }

//deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

  async deleteById() {}

//deleteAll(): void - Elimina todos los objetos presentes en el archivo.

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, [])
      console.log('Archivo borrado')

    } catch (error) {
      throw new Error `Error al borrar el archivo ${error}`
    }
    
  }
}

const nuevoArchivo = new Contenedor('')

const p1 = {                                                                                                                                                    
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                                                                                                                                                  
  } 

  const p2 = {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
                                                                                                                                                 
  }

  const p3 ={                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
                                                                                                                                                  
  }      

//   nuevoArchivo.save(p1)

// const contenedor1 = new Contenedor('/.productos.txt')

// contenedor1.save({                                                                                                                                                    
//   title: 'Escuadra',                                                                                                                                 
//   price: 123.45,                                                                                                                                     
//   thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                                                                                                                                                
// } )

// contenedor1.getAll()

// contenedor1.getById(2)

