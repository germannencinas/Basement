import { Link } from 'react-router'
import Logo from './Logo.jsx'
import { IconoMas } from './Iconos.jsx'

function BarraSuperior() {
  return (
    <header className="shrink-0">
      <div className="flex items-center justify-between px-6 py-4">

        <Link to="/" aria-label="Inicio">
          <Logo />
        </Link>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 rounded-full bg-texto px-5 py-2.5 text-sm font-bold text-fondo transition hover:scale-105"
        >
          <IconoMas className="size-4" />
          Añadir concierto
        </button>
      </div>

      <div className="h-px w-full bg-linear-to-r from-violeta to-cian opacity-70" />
    </header>
  )
}

export default BarraSuperior
