import { Link } from 'react-router'


function Conciertos() {
  return (

    <div className="mx-auto max-w-5xl px-8 py-12">

      <p className="etiqueta text-cian">Archivo</p>

      <h1 className="mt-3 text-5xl font-bold tracking-tighter">Tus conciertos</h1>

      <p className="etiqueta mt-4 text-tenue">
        0 conciertos · 0 bandas · 0 ciudades
      </p>

      {/*
        Archivo vacio para indicar al usuario
      */}
      <section className="mt-12 border border-dashed rounded-xl border-borde px-6 py-16 text-center">
        <p className="text-lg font-semibold">Todavía no hay nada en el archivo</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-tenue">
          Cuando guardes un concierto aparecerá aquí, ordenado por fecha.
        </p>

        {/*
          Url de prueba
        */}
        <Link
          to="/concierto/1"
          className="mt-6 inline-block text-sm font-semibold text-cian underline-offset-4 hover:underline"
        >
          Ver una ficha de ejemplo
        </Link>
      </section>
    </div>
  )
}

export default Conciertos
