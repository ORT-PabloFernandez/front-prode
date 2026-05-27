const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch(endpoint, options = {}) {
  // arma la URL completa juntando el backend + el endpoint que le pasas
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      // le digo al backend que mando JSON siempre
      "Content-Type": "application/json",

      // si me pasas headers extra (token, etc), los sumo acá
      ...(options.headers || {}),
    },
  })

  // si el backend responde mal (404, 500, etc), corto todo y tiro error
  if (!res.ok) {
    throw new Error("Error API")
  }

  // si todo salió bien, devuelvo el JSON ya parseado
  return res.json()
}