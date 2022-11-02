const Contenedor = require('./desafio2.js')

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

async function main(){
    const prods = new Contenedor('./produtos.txt')

    console.log('guardado p1')
    let idP1 = await prods.save(p1);
    console.log('id de p1: ', idP1);

    console.log('guardado p2')
    let idP2 = await prods.save(p2);
    console.log('id de p2: ', idP2);

    console.log('guardado p3')
    let idP3 = await prods.save(p3);
    console.log('id de p3: ', idP3);
}

