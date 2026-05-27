import { apiFetch } from "@/API/api"


/**
 * cada endpoint es una funcion hasta hoy mayo 26 aplique solo getMatches
 * Encapsula el request al endpoint de partidos.
 * Evita que los componentes dependan directamente de rutas de API,
 * facilitando mantenimiento y escalabilidad.
 */
export function getMatches() {
  return apiFetch("/api/matches")
}

/**
 * Encapsula la creación de un nuevo partido.
 * Envía los datos del partido al servidor mediante un método POST
 * para su almacenamiento en la base de datos.
 */
export function createMatch(data) {
  return apiFetch("/api/matches", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/**
 * Encapsula la actualización de un partido existente.
 * Recibe el identificador único del partido y los nuevos datos,
 * aplicando los cambios en el servidor mediante un método PUT.
 */
export function updateMatch(id, data) {
  return apiFetch(`/api/matches/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/**
 * Encapsula la eliminación de un partido.
 * Solicita al servidor el borrado del registro correspondiente
 * utilizando su identificador único mediante un método DELETE.
 */
export function deleteMatch(id) {
  return apiFetch(`/api/matches/${id}`, {
    method: "DELETE",
  })
}