import { useConciertos } from '../estado/contextoConciertos.js'
import TarjetaConcierto from '../componentes/TarjetaConcierto.jsx'

function plural(cantidad, singular, plural) {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`
}

function Conciertos() {
  const { conciertos } = useConciertos()

  const ordenados = [...conciertos].sort((a, b) => b.fecha.localeCompare(a.fecha))
  
  const bandas = new Set(
    conciertos.flatMap((c) => c.bandas).map((nombre) => nombre.trim().toLowerCase()),
  )
  const ciudades = new Set(
    conciertos.map((c) => c.ciudad.trim().toLowerCase()).filter(Boolean),
  )

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <p className="etiqueta text-cian">Archivo</p>

      <h1 className="mt-3 text-5xl font-bold tracking-tighter">Tus conciertos</h1>

      <p className="etiqueta mt-4 text-tenue">
        {plural(conciertos.length, 'concierto', 'conciertos')} ·{' '}
        {plural(bandas.size, 'banda', 'bandas')} ·{' '}
        {plural(ciudades.size, 'ciudad', 'ciudades')}
      </p>

      {conciertos.length === 0 ? (
        <section className="mt-12 border border-dashed rounded-xl border-borde px-6 py-16 text-center">
          <p className="text-lg font-semibold">Todavía no hay nada en el archivo</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-tenue">
            Cuando guardes un concierto aparecerá aquí, ordenado por fecha.
          </p>
        </section>
      ) : (
        <section className="mt-10">
          {ordenados.map((concierto) => (
            <TarjetaConcierto key={concierto.id} concierto={concierto} />
          ))}
        </section>
      )}
    </div>
  )
}

export default Conciertos
