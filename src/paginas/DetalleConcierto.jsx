import { Link, useParams } from 'react-router'

function DetalleConcierto() {
  
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <Link
        to="/"
        className="etiqueta text-tenue transition hover:text-cian"
      >
        ← Volver al archivo
      </Link>

      <h1 className="mt-6 text-5xl font-bold tracking-tighter">Ficha del concierto</h1>

      <p className="mt-4 text-tenue">
        Estás viendo el concierto con id{' '}
        <span className="font-bold text-violeta">{id}</span>. Prueba
        a cambiar el número en la barra de direcciones.
      </p>
    </div>
  )
}

export default DetalleConcierto
