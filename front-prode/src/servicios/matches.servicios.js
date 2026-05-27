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

// POST crear partido
export function createMatch(data) {
  return apiFetch("/api/matches", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// PUT actualizar partido
export function updateMatch(id, data) {
  return apiFetch(`/api/matches/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// DELETE partido
export function deleteMatch(id) {
  return apiFetch(`/api/matches/${id}`, {
    method: "DELETE",
  })
}