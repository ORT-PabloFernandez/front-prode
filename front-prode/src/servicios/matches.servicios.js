import { apiFetch } from "@/API/api"

export function getMatches() {
  return apiFetch("/api/matches")
}

// TRAIGO UN PARTIDO ESPECIFICO POR SU fixture.id PARA LA PANTALLA DE DETALLE
export function getMatchById(id) {
  return apiFetch(`/api/matches/${id}`)
}

export function createMatch(data) {
  return apiFetch("/api/matches", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateMatch(id, data) {
  return apiFetch(`/api/matches/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function deleteMatch(id) {
  return apiFetch(`/api/matches/${id}`, {
    method: "DELETE",
  })
}

export function getRounds() {
  return apiFetch("/api/matches/rounds")
}

export function getStandings() {
  return apiFetch("/api/matches/standings")
}

export function refreshCache(token) {
  return apiFetch("/api/matches/refresh-cache", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
