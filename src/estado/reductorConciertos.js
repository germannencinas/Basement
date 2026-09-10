
export function reductorConciertos(estado, accion) {
  switch (accion.tipo) {

    case 'anadir':
      
      return [...estado, accion.concierto]

    case 'eliminar':
      
      return estado.filter((concierto) => concierto.id !== accion.id)

    default:
    
      throw new Error(`Acción desconocida: ${accion.tipo}`)
  }
}
