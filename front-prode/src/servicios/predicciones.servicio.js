import { apiFetch } from "@/API/api";  

export function getPredicciones(token){
    return apiFetch("/api/predictions", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
export function savePredicciones(fixtureId,homeGoals,awayGoals,token){
        return apiFetch("/api/predictions", {
            method: "POST",
            headers: {
            
      Authorization: `Bearer ${token}`
    },
     body: JSON.stringify({fixtureId,homeGoals,awayGoals})
  })
}

export function getPrediccionByFixtureId(fixtureId, token) {
  return apiFetch(`/api/predictions/${fixtureId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function getRanking(token) {
  return apiFetch("/api/predictions/ranking", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function deletePrediccion(fixtureId, token) {
  return apiFetch(`/api/predictions/${fixtureId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}