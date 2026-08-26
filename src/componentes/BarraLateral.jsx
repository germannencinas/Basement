import { NavLink } from 'react-router'
import { IconoEntrada, IconoGrafico } from './Iconos.jsx'

const secciones = [
  { a: '/', texto: 'Conciertos', Icono: IconoEntrada, exacta: true },
  { a: '/estadisticas', texto: 'Estadísticas', Icono: IconoGrafico },
]

function EnlaceSeccion({ a, texto, Icono, exacta }) {
  return (
    <NavLink
      to={a}
      end={exacta}
      className={({ isActive }) =>
        `group flex items-center gap-3 py-2.5 pr-4 text-sm font-medium transition ${
          isActive ? 'text-texto' : 'text-tenue hover:text-texto'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`h-5 w-0.5 shrink-0 transition ${
              isActive ? 'bg-violeta' : 'bg-transparent'
            }`}
          />
          <Icono
            className={`size-4 shrink-0 transition ${isActive ? 'text-violeta' : ''}`}
          />
          {texto}
        </>
      )}
    </NavLink>
  )
}

function BarraLateral() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-borde py-6 md:flex">
      <p className="etiqueta px-5 pb-3 text-tenue">Secciones</p>

      <nav className="flex flex-col">
        {secciones.map((seccion) => (
          <EnlaceSeccion key={seccion.a} {...seccion} />
        ))}
      </nav>
    </aside>
  )
}

export default BarraLateral
