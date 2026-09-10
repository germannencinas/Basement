import { useEffect, useReducer } from 'react'
import { ContextoConciertos } from './contextoConciertos.js'
import { reductorConciertos } from './reductorConciertos.js'

const CLAVE = 'basement.conciertos'

function leerDelNavegador() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

export function ProveedorConciertos({ children }) {
 
  const [conciertos, despachar] = useReducer(reductorConciertos, undefined, leerDelNavegador)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(conciertos))
    } catch {
      
    }
  }, [conciertos])

  function anadirConcierto(datos) {
    despachar({
      tipo: 'anadir',
      concierto: { ...datos, id: crypto.randomUUID() },
    })
  }

  function eliminarConcierto(id) {
    despachar({ tipo: 'eliminar', id })
  }

  
  return (
    <ContextoConciertos value={{ conciertos, anadirConcierto, eliminarConcierto }}>
      {children}
    </ContextoConciertos>
  )
}
