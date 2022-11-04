const {promises: fs} = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta
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
    objs.push(newObj)

    try {

        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        
    } catch (error) {
        throw new Error (`Error al guardar ${err}`)
        
    }
  }

//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.

  async getById(id) {

    
    try {
      const objs = await this.getAll()
      const obj = objs.find((obj) => obj.id === id)
      if(!obj) {
        console.log('null')
      }else{
        console.log('Producto con id ', id, obj)
      }

    } catch (error) {
      throw new Error ('no hay productos con ese id')
      
    }
  }



//deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

  async deleteById(id) {
    try {
      const objs = await this.getAll()
      // verifico si existe el id, si no mando error
      const obj = objs.find((obj) => obj.id === id)
      if (!obj) {
        throw new Error ("No fue encontrado el producot con el id ")
      }
      // filtro el array de productos y mequedo con los que no tengan el id que quiero eliminar
      const newObjs = objs.filter((obj) => obj.id !== id)
      await fs.writeFile(this.ruta, JSON.stringify(newObjs, null, 2))

    } catch (error) {
      console.log("Error en deleteById: ", error)


    }
  }

//deleteAll(): void - Elimina todos los objetos presentes en el archivo.

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
      console.log('Archivo borrado')

    } catch (error) {
      throw new Error `Error al borrar el archivo ${error}`
    }
    
  }
}


const main = async () => {
const contenedor = new Contenedor('productos.txt')

await contenedor.save({
                                                                                                                                                    
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                                                                                                                                                  
})

await contenedor.save({                                                                                                                                                   
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
                                                                                                                                                 
  })

await contenedor.save({                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
                                                                                                                                                  
  })    

  const id = 3
  await contenedor.getById(id)
  const objs = await contenedor.getAll()
  console.log('array de productos ', objs)
  // await contenedor.deleteById(2)
  // await contenedor.deleteAll()

  
  
}

main ()



