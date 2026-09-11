import { useEffect, useState } from 'react'
import { buscarBandas } from '../utilidades/bandas.js'


const RETRASO = 350

const MINIMO = 2


export function useBusquedaBandas(termino) {
  
  const [respuesta, setRespuesta] = useState({ termino: '', lista: [] })

  const limpio = termino.trim()
  const hayQueBuscar = limpio.length >= MINIMO

  useEffect(() => {
    if (!hayQueBuscar) return

    const controlador = new AbortController()

    /*
      Espera a que se termine de escribir la banda para lanzar solo una peticion
    */
    const temporizador = setTimeout(async () => {
      try {
        setRespuesta({ termino: limpio, lista: await buscarBandas(limpio, controlador.signal) })
      } catch (error) {
        
        if (error.name !== 'AbortError') {
          setRespuesta({ termino: limpio, lista: [] })
        }
      }
    }, RETRASO)

    return () => {
      clearTimeout(temporizador)
      controlador.abort()
    }
  }, [limpio, hayQueBuscar])

  
  const respondeALoEscrito = respuesta.termino === limpio

  return {
    resultados: hayQueBuscar && respondeALoEscrito ? respuesta.lista : [],
    cargando: hayQueBuscar && !respondeALoEscrito,
  }
}
