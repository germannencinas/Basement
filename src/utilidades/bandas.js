
const URL_BASE = 'https://itunes.apple.com/search'

export async function buscarBandas(termino, senal) {
  const parametros = new URLSearchParams({
    term: termino,
    entity: 'musicArtist',
    limit: '10',
  })


  const respuesta = await fetch(`${URL_BASE}?${parametros}`, { signal: senal })

  if (!respuesta.ok) {
    throw new Error(`iTunes respondió ${respuesta.status}`)
  }

  const datos = await respuesta.json()

  return quitarRepetidos(datos.results ?? [])
}

/*
  Si hay bandas repetidas se deja la de mayor relevancia
*/
function quitarRepetidos(resultados) {
  const porNombre = new Map()

  for (const artista of resultados) {
    const clave = artista.artistName.toLowerCase()

    if (!porNombre.has(clave)) {
      porNombre.set(clave, {
        id: artista.artistId,
        nombre: artista.artistName,
        genero: artista.primaryGenreName,
      })
    }
  }

  return [...porNombre.values()]
}
