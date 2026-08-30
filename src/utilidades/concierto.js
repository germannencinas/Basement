
export const TIPOS = [
  { valor: 'concierto', texto: 'Concierto' },
  { valor: 'festival', texto: 'Festival' },
]

export const CONCIERTO_VACIO = {
  tipo: 'concierto',
  banda: '',
  fecha: '',
  nombre: '',
  venue: '',
  ciudad: '',
  valoracion: 0,
  notas: '',
}

export const FECHA_MINIMA = '1950-01-01'

export function fechaDeHoy() {
  const ahora = new Date()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  return `${ahora.getFullYear()}-${mes}-${dia}`
}

export function validarConcierto(datos) {
  const errores = {}

  if (!datos.banda.trim()) {
    errores.banda = 'Escribe el nombre de la banda'
  }

  if (!datos.fecha) {
    errores.fecha = 'Elige la fecha del concierto'
  } else if (datos.fecha < FECHA_MINIMA) {
    errores.fecha = 'Esa fecha parece incorrecta'
  } else if (datos.fecha > fechaDeHoy()) {
    errores.fecha = 'Todavía no has ido a este concierto'
  }

  /*
    Los festivales necesitan nombre y los conciertos pueden no tener (opcional)
  */
  if (datos.tipo === 'festival' && !datos.nombre.trim()) {
    errores.nombre = 'Un festival necesita nombre'
  }

  return errores
}
