class TicketManager {
    eventos = []
    #precioBaseGanancia = 0.15

    getEventos() {
        return this.eventos
    }
    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const nuevoEvento = {
            id: this.eventos.length,
            nombre,
            lugar,
            precio: precio + precio * this.#precioBaseGanancia,
            capacidad,
            fecha,
            participantes: []
        }
        this.eventos = [...this.eventos, nuevoEvento]
    }

    agregarUsuario(idEvento, idUsuario) {
        const evento = this.eventos.find((ev) => ev.id === idEvento)

        if (!evento) {
            throw new Error(`Evento con ID ${idEvento} no encontrado`)
        }

        const { participantes } = evento
        if (participantes.includes(idUsuario)) {
            throw new Error(`Evento con ID ${idEvento} ya contiene al usuario con ID ${idUsuario}`)
        }

        this.eventos = this.eventos.map((obj) => {
            if (obj.id === idEvento) {
                return {
                    ...obj,
                    participantes: [...obj.participantes, idUsuario]
                }
            }
        })
    }

    ponerEventoEnGira(idEvento, nuevoLugar, nuevaFecha){
        const evento = this.eventos.find((ev) => ev.id === idEvento)
        if (!evento) {
            throw new Error(`Evento con ID ${idEvento} no encontrado`)
        }

        const nuevoEvento = {
            ...evento, 
            lugar: nuevoLugar,
            fecha: nuevaFecha,
            participantes: [],
            id: this.eventos.length
        }

        this.eventos = [...this.eventos, nuevoEvento]
    }
}

const manager = new TicketManager()


manager.agregarEvento("Luciano", "La falda", 200)
console.log(manager.getEventos())
manager.agregarUsuario(0, 23)
console.log(manager.getEventos())
manager.ponerEventoEnGira(0, "Villa Giardino", new Date())
console.log(manager.getEventos())