import { createContext, useContext } from 'react'

export const ContextoConciertos = createContext(null)

export function useConciertos() {
  const valor = useContext(ContextoConciertos)

  if (!valor) {
    throw new Error('useConciertos() tiene que usarse dentro de <ProveedorConciertos>')
  }

  return valor
}
