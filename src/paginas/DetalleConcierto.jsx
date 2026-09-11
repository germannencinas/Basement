import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useConciertos } from '../estado/contextoConciertos.js'
import { formatearFecha } from '../utilidades/concierto.js'

// Una fila de la ficha. Solo se pinta si hay algo que enseñar.
function Dato({ etiqueta, valor }) {
  if (!valor) return null

  return (
    <div className="border-b border-borde py-4">
      <p className="etiqueta text-tenue">{etiqueta}</p>
      <p className="mt-1.5">{valor}</p>
    </div>
  )
}

function DetalleConcierto() {
  const { id } = useParams()
  const navegar = useNavigate()
  const { conciertos, eliminarConcierto } = useConciertos()
  const [confirmando, setConfirmando] = useState(false)
  const concierto = conciertos.find((c) => c.id === id)

  if (!concierto) {
    return (
      <div className="mx-auto max-w-3xl px-8 py-12">
        <Link to="/" className="etiqueta text-tenue transition hover:text-cian">
          ← Volver al archivo
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tighter">
          Este concierto no está en tu archivo
        </h1>
        <p className="mt-4 text-tenue">
          Puede que lo hayas borrado, o que el enlace esté mal.
        </p>
      </div>
    )
  }

  function eliminar() {
    eliminarConcierto(concierto.id)
    
    navegar('/')
  }

  const lugar = [concierto.venue, concierto.ciudad].filter(Boolean).join(' · ')

  return (
    <div className="mx-auto max-w-3xl px-8 py-12">
      <Link to="/" className="etiqueta text-tenue transition hover:text-cian">
        ← Volver al archivo
      </Link>

      <p className="etiqueta mt-8 text-cian">
        {concierto.tipo === 'festival' ? 'Festival' : 'Concierto'}
      </p>

      {/*
        El titulo es la banda cuando solo es una, pero si son varias se toma 
        el nombre del evento
      */}
      <h1 className="mt-3 text-5xl font-bold tracking-tighter">
        {concierto.bandas.length === 1 ? concierto.bandas[0] : concierto.nombre || 'Varias bandas'}
      </h1>

      <div className="mt-10">
        {/*
          Esta fila solo aparece si hay varias bandas
        */}
        <Dato
          etiqueta="Bandas"
          valor={concierto.bandas.length > 1 ? concierto.bandas.join(' · ') : ''}
        />
        <Dato etiqueta="Fecha" valor={formatearFecha(concierto.fecha)} />
        
        <Dato
          etiqueta="Nombre del evento"
          valor={concierto.bandas.length === 1 ? concierto.nombre : ''}
        />
        <Dato etiqueta="Lugar" valor={lugar} />
        <Dato
          etiqueta="Valoración"
          valor={concierto.valoracion > 0 ? `${concierto.valoracion} de 5` : ''}
        />
        <Dato etiqueta="Notas" valor={concierto.notas} />
      </div>

      {/*
        Confirmacion antes de borrar
      */}
      <div className="mt-12">
        {confirmando ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-tenue">¿Seguro? No se puede deshacer.</span>
            <button
              type="button"
              onClick={eliminar}
              className="cursor-pointer rounded-full bg-alerta px-4 py-2 text-sm font-bold text-fondo transition hover:brightness-110"
            >
              Sí, eliminar
            </button>
            <button
              type="button"
              onClick={() => setConfirmando(false)}
              className="cursor-pointer text-sm font-semibold text-tenue transition hover:text-texto"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="cursor-pointer text-sm font-semibold text-tenue transition hover:text-alerta"
          >
            Eliminar del archivo
          </button>
        )}
      </div>
    </div>
  )
}

export default DetalleConcierto
