class Usuario {

    constructor(nombre, apellido, libros, mascotas) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;

    }

    getFullName() {
        return `Nombre completo del usuario es: ${this.nombre} ${this.apellido}`
    };

    addMascotas(nombreMascota) {
        this.mascotas.push(nombreMascota)
    };

    countMascotas() {
        return `Número de mascotas que tiene el usuario es: ${this.mascotas.length}`
    }

    addBock(nombreLibro, autorLibro) {
        this.libros.push({
            titulo: nombreLibro,
            autor: autorLibro
        })
    }

    getBookNames() {
        let nameBook = this.libros.map(function (titulos) {
            return titulos.titulo
        })
        console.log(nameBook)
    }

}

let usuario = new Usuario('Fernando', 'Mazzucco', [{
        titulo: 'El hobbit',
        autor: 'J.R.R. Tolkien',
    },
    {
        titulo: 'El alquimista',
        autor: 'Paulo Coelho'
    },
    {
        titulo: 'La  metamorfosis',
        auto: 'Franz Kafka',
    },
], ['Fido', 'Preto', 'Pichu']);


console.log(usuario.getFullName());

usuario.addMascotas('Pandi');

console.log(usuario.countMascotas());

usuario.addBock("De la tierra a la luna", "Julio Verne");

usuario.getBookNames();
console.log(usuario);