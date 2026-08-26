import { Outlet } from 'react-router'
import BarraSuperior from './BarraSuperior.jsx'
import BarraLateral from './BarraLateral.jsx'

function Layout() {
  return (
    
    <div className="flex h-dvh flex-col bg-fondo">
      <BarraSuperior />

      <div className="flex min-h-0 flex-1">
        <BarraLateral />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
