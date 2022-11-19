class ProductosApi {

    constructor(){
        this.productos = []
        this.id = 0
    }

    getAll(){
        return [...this.productos]
    }

    getById(id){
        const prop = this.productos.find(e => e.id == Number(id))
        if (!prop){
            return {'error': 'producot no encontrado'}
        }
        return prop

    }

    save(prop){
        const newProp = {...prop, id : ++this.id}
        this.productos.push(newProp)
        return newProp
    }

    update(prop, id){

    }

    // delete(id){
    // //     const prop = this.getById()


    // }
}

module.exports = ProductosApi