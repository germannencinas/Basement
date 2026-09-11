import { useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Label,
} from '@headlessui/react'
import { useBusquedaBandas } from '../hooks/useBusquedaBandas.js'

function SelectorBandas({ bandas, error, alCambiar }) {
  const [termino, setTermino] = useState('')
  const { resultados, cargando } = useBusquedaBandas(termino)

  const yaEsta = (nombre) => bandas.some((b) => b.toLowerCase() === nombre.toLowerCase())

  // Quitamos bandas elegidas de las sugerencias.
  const sugerencias = resultados.filter((r) => !yaEsta(r.nombre))

  /*
    Si la banda no esta en iTunes, se puede añadir la banda manualmente
  */
  const escrito = termino.trim()
  const sePuedeAnadirAMano =
    escrito.length > 0 &&
    !yaEsta(escrito) &&
    !sugerencias.some((s) => s.nombre.toLowerCase() === escrito.toLowerCase())

  const hayAlgoQueMostrar = cargando || sePuedeAnadirAMano || sugerencias.length > 0


  function elegir(nuevas) {
    alCambiar(nuevas)
    setTermino('')
  }

  function quitar(nombre) {
    alCambiar(bandas.filter((b) => b !== nombre))
  }

  return (
    <Field>
      <Label className="etiqueta text-tenue">Bandas</Label>

      {bandas.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {bandas.map((nombre) => (
            <li
              key={nombre}
              className="flex items-center gap-1.5 rounded-full border border-violeta/40 bg-violeta/10 py-1 pr-1.5 pl-3 text-sm font-medium"
            >
              {nombre}
              <button
                type="button"
                onClick={() => quitar(nombre)}
                aria-label={`Quitar ${nombre}`}
                className="grid size-5 cursor-pointer place-items-center rounded-full text-tenue transition hover:bg-violeta hover:text-fondo"
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Combobox multiple value={bandas} onChange={elegir}>
        <ComboboxInput
          value={termino}
          onChange={(evento) => setTermino(evento.target.value)}
          placeholder={bandas.length > 0 ? 'Añadir otra banda…' : 'Alesana'}
          autoFocus
          className={`mt-2 w-full border-b bg-transparent py-2 text-sm outline-none transition placeholder:text-tenue ${
            error ? 'border-alerta' : 'border-borde focus:border-cian'
          }`}
        />

        {hayAlgoQueMostrar && (
          <ComboboxOptions
            anchor="bottom start"
            className="z-50 mt-2 w-(--input-width) overflow-hidden rounded-md border border-borde bg-elevado shadow-2xl"
          >
            {cargando && (
              <p className="px-4 py-3 text-sm text-tenue">Buscando en iTunes…</p>
            )}

            {sugerencias.map((sugerencia) => (
              <ComboboxOption
                key={sugerencia.id}
                value={sugerencia.nombre}
                className="cursor-pointer"
              >
                {({ focus }) => (
                  <span
                    className={`flex items-baseline justify-between gap-4 px-4 py-2.5 text-sm transition ${
                      focus ? 'bg-violeta text-fondo' : ''
                    }`}
                  >
                    <span className="truncate font-medium">{sugerencia.nombre}</span>
                    <span
                      className={`etiqueta shrink-0 ${focus ? 'text-fondo' : 'text-tenue'}`}
                    >
                      {sugerencia.genero}
                    </span>
                  </span>
                )}
              </ComboboxOption>
            ))}

            {/*
              Se reasalta la primer opcion y es la elegida al pulsar enter
            */}
            {sePuedeAnadirAMano && (
              <ComboboxOption value={escrito} className="cursor-pointer">
                {({ focus }) => (
                  <span
                    className={`block border-t border-borde px-4 py-2.5 text-sm transition ${
                      focus ? 'bg-violeta text-fondo' : 'text-tenue'
                    }`}
                  >
                    Añadir «<span className="font-semibold">{escrito}</span>» tal cual
                  </span>
                )}
              </ComboboxOption>
            )}
          </ComboboxOptions>
        )}
      </Combobox>

      {error && (
        <Description className="mt-1.5 block text-xs font-medium text-alerta">
          {error}
        </Description>
      )}
    </Field>
  )
}

export default SelectorBandas
