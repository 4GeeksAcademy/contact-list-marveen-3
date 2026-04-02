export const initialStore = () => {
    return {
        contactos: []
    }
}

export default function storeReducer(estado, accion = {}) {
    switch (accion.type) {
        case 'CARGAR_CONTACTOS':
            return {
                ...estado,
                contactos: accion.payload
            };
        case 'BORRAR_LOCAL':
            return {
                ...estado,
                contactos: estado.contactos.filter(c => c.id !== accion.payload)
            };
        default:
            return estado;
    }
}