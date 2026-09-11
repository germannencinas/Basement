import { Link } from 'react-router'
import { formatearFecha } from '../utilidades/concierto.js'

function TarjetaConcierto({ concierto }) {
  
  const detalle = [concierto.nombre, concierto.venue, concierto.ciudad]
    .filter(Boolean)
    .join(' · ')

  return (
    <Link
      to={`/concierto/${concierto.id}`}
      className="group flex items-center gap-5 border-b border-borde px-2 py-4 transition hover:bg-elevado"
    >
      <span className="etiqueta w-28 shrink-0 text-tenue">
        {formatearFecha(concierto.fecha)}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold transition group-hover:text-cian">
          {concierto.bandas.join(', ')}
        </span>
        {detalle && (
          <span className="mt-0.5 block truncate text-sm text-tenue">{detalle}</span>
        )}
      </span>

      {concierto.tipo === 'festival' && (
        <span className="etiqueta shrink-0 rounded-full border border-violeta px-2.5 py-1 text-violeta">
          Festival
        </span>
      )}

      <span className="etiqueta w-10 shrink-0 text-right text-tenue">
        {concierto.valoracion > 0 ? `${concierto.valoracion}/5` : '—'}
      </span>
    </Link>
  )
}

export default TarjetaConcierto
