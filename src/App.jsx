import { Routes, Route } from 'react-router'
import Layout from './componentes/Layout.jsx'
import Conciertos from './paginas/Conciertos.jsx'
import DetalleConcierto from './paginas/DetalleConcierto.jsx'
import Estadisticas from './paginas/Estadisticas.jsx'


function App() {
  return (
    <Routes>
      {/*
        Ruta de layout
      */}
      <Route element={<Layout />}>

        <Route index element={<Conciertos />} />

        <Route path="concierto/:id" element={<DetalleConcierto />} />

        <Route path="estadisticas" element={<Estadisticas />} />

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

function NoEncontrada() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <p className="etiqueta text-cian">Error 404</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tighter">Esta página no existe</h1>
      <p className="mt-4 text-tenue">Puede que el enlace esté mal escrito.</p>
    </div>
  )
}

export default App
