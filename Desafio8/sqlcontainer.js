const knex = require('knex')

class ClienteSQL {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTablaProduct() {
        return this.knex.schema.hasTable('articulos')
            .then(() => {
                return this.knex.schema.createTable('articulos', table => {
                    table.increments('id').primary()
                    table.string('title', 20).notNullable()
                    table.float('price')
                    table.string('thumbnail', 30).notNullable()
                })
            })
            .catch(() => {
                console.log("ya existe")
            })
    }

    insertarArticulos(articulos) {
        return this.knex('articulos').insert(articulos)
    }

    listarArticulos() {
        return this.knex('articulos').select('*')
    }

    listarArticulosId(id) {
        return this.knex('articulos').select('*').where('id', '=', id)
    }

    borrarArticulos(id) {
        return this.knex.from('articulos').where('id', '=', id).del()
    }

    actualizar(obj, id) {
        return this.knex.from('articulos').where('id', '=', id).update(obj)
    }

    crearTablaChat() {
        return this.knex.schema.hasTable('chat')
            .then(() => {
                return this.knex.schema.createTable('chat', table => {
                    table.increments('id').primary()
                    table.string('author', 20).notNullable()
                    table.string('text')
                    table.string('fyh').notNullable()
                })
            })
            .catch(() => {
                console.log("ya existe")
            })
    }

    insertarChat(data) {
        return this.knex('chat').insert(data)
    }

    listarChat() {
        return this.knex('chat').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = ClienteSQL