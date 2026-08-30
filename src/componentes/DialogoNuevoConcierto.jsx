import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Label,
  Input,
  Textarea,
  RadioGroup,
  Radio,
} from '@headlessui/react'
import {
  CONCIERTO_VACIO,
  TIPOS,
  fechaDeHoy,
  validarConcierto,
} from '../utilidades/concierto.js'


function CampoTexto({ etiqueta, nombre, valor, error, alCambiar, tipo = 'text', ...resto }) {
  return (
    <Field>
      <Label className="etiqueta text-tenue">{etiqueta}</Label>

      <Input
        type={tipo}
        value={valor}
        invalid={Boolean(error)}
        onChange={(evento) => alCambiar(nombre, evento.target.value)}
        className={`mt-2 w-full border-b bg-transparent py-2 text-sm outline-none transition placeholder:text-tenue ${
          error ? 'border-alerta' : 'border-borde focus:border-cian'
        }`}
        {...resto}
      />

      {/* Description de error, se enlaza solo con el input */}
      {error && (
        <Description className="mt-1.5 block text-xs font-medium text-alerta">
          {error}
        </Description>
      )}
    </Field>
  )
}

function DialogoNuevoConcierto({ abierto, alCerrar, alGuardar }) {
  
  const [datos, setDatos] = useState(CONCIERTO_VACIO)
  const [errores, setErrores] = useState({})

  function cambiar(campo, valor) {
    
    setDatos((previos) => ({ ...previos, [campo]: valor }))

    // Si el campo tenía un error, desaparece al coregir.
    setErrores((previos) => {
      if (!previos[campo]) return previos
      const copia = { ...previos }
      delete copia[campo]
      return copia
    })
  }

  function cerrarYLimpiar() {

    setDatos(CONCIERTO_VACIO)
    setErrores({})
    alCerrar()
  }

  function enviar(evento) {
    
    evento.preventDefault()

    const encontrados = validarConcierto(datos)

    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados)
      return
    }

    alGuardar(datos)
    cerrarYLimpiar()
  }

  return (
    
    <Dialog open={abierto} onClose={cerrarYLimpiar} className="relative z-50">
      
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      
      <div className="fixed inset-0 flex items-start justify-center overflow-y-auto p-4 py-10">
        <DialogPanel className="w-full max-w-lg border border-borde bg-fondo">
          <div className="border-b border-borde px-6 py-4">
            
            <DialogTitle className="text-lg font-bold">Añade un nuevo show</DialogTitle>
          </div>

          
          <form onSubmit={enviar} noValidate className="flex flex-col gap-6 px-6 py-6">
            <Field>
              <Label className="etiqueta text-tenue">Tipo</Label>
              <RadioGroup
                value={datos.tipo}
                onChange={(valor) => cambiar('tipo', valor)}
                className="mt-3 flex gap-2"
              >
                {TIPOS.map(({ valor, texto }) => (
                  <Radio key={valor} value={valor} className="cursor-pointer">
                    {({ checked, focus }) => (
                      <span
                        className={`block rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                          checked
                            ? 'border-violeta bg-violeta text-fondo'
                            : 'border-borde text-tenue hover:border-texto hover:text-texto'
                        } ${focus ? 'outline-2 outline-offset-2 outline-cian' : ''}`}
                      >
                        {texto}
                      </span>
                    )}
                  </Radio>
                ))}
              </RadioGroup>
            </Field>

            <CampoTexto
              etiqueta="Banda"
              nombre="banda"
              valor={datos.banda}
              error={errores.banda}
              alCambiar={cambiar}
              placeholder="Turnstile"
              autoFocus
            />

            <CampoTexto
              etiqueta="Fecha"
              nombre="fecha"
              tipo="date"
              valor={datos.fecha}
              error={errores.fecha}
              alCambiar={cambiar}
              max={fechaDeHoy()}
            />

            <CampoTexto
              etiqueta="Nombre del evento"
              nombre="nombre"
              valor={datos.nombre}
              error={errores.nombre}
              alCambiar={cambiar}
              placeholder={
                datos.tipo === 'festival'
                  ? 'Vans Warped Tour 2026'
                  : 'Alesana Latin America Tour 2026'
              }
            />

            
            <div className="grid gap-6 sm:grid-cols-2">
              <CampoTexto
                etiqueta="Venue"
                nombre="venue"
                valor={datos.venue}
                error={errores.venue}
                alCambiar={cambiar}
                placeholder="Sala Apolo"
              />
              <CampoTexto
                etiqueta="Ciudad"
                nombre="ciudad"
                valor={datos.ciudad}
                error={errores.ciudad}
                alCambiar={cambiar}
                placeholder="Barcelona"
              />
            </div>

            <Field>
              <Label className="etiqueta text-tenue">Valoración</Label>

              <RadioGroup
                value={datos.valoracion}
                onChange={(valor) => cambiar('valoracion', valor)}
                className="mt-3 flex gap-2"
              >
                {[1, 2, 3, 4, 5].map((numero) => (
                  <Radio key={numero} value={numero} className="cursor-pointer">
                    
                    {({ checked, focus }) => (
                      <span
                        className={`grid size-10 place-items-center rounded-full border text-sm font-bold transition ${
                          checked
                            ? 'border-violeta bg-violeta text-fondo'
                            : 'border-borde text-tenue hover:border-texto hover:text-texto'
                        } ${focus ? 'outline-2 outline-offset-2 outline-cian' : ''}`}
                      >
                        {numero}
                      </span>
                    )}
                  </Radio>
                ))}
              </RadioGroup>
            </Field>

            <Field>
              <Label className="etiqueta text-tenue">Notas</Label>
              <Textarea
                value={datos.notas}
                onChange={(evento) => cambiar('notas', evento.target.value)}
                rows={3}
                placeholder="Con quién fuiste, qué tocaron, cómo sonó..."
                className="mt-2 w-full resize-none border-b border-borde bg-transparent py-2 text-sm outline-none transition placeholder:text-tenue focus:border-cian"
              />
            </Field>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={cerrarYLimpiar}
                className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold text-tenue transition hover:text-texto"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="cursor-pointer rounded-full bg-texto px-5 py-2.5 text-sm font-bold text-fondo transition hover:scale-105"
              >
                Guardar
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DialogoNuevoConcierto
