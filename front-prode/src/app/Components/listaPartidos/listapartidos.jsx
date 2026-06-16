"use client"
import { useEffect, useState } from "react"
import { getMatches } from "@/servicios/matches.servicios"
import { getPredicciones } from "@/servicios/predicciones.servicio"
import CardMatch from "@/app/Components/CardMatch"

export default function MatchesList() {
  const [matches, setMatches] = useState([])
  const [predichos, setPredichos] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches()
        const sorted = [...(data.data || [])].sort(
          (a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)
        )
        setMatches(sorted)

        // Traigo mis predicciones para marcar en qué partidos ya pronostiqué
        try {
          const token = localStorage.getItem("token")
          const predData = await getPredicciones(token)
          const ids = new Set((predData.data || []).map((p) => p.fixtureId))
          setPredichos(ids)
        } catch (e) {
          // si falla no es crítico, simplemente no muestro el badge
          console.error(e)
        }
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  if (loading) return <p className="text-white text-center py-8">Cargando partidos...</p>

  if (error) return <p className="text-red-400 text-center py-8">No se pudieron cargar los partidos. Probá de nuevo.</p>

  if (matches.length === 0) return <p className="text-slate-400 text-center py-8">No hay partidos para mostrar.</p>

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8">
      {matches.map((match) => (
        <CardMatch
          key={match.fixture?.id}
          match={match}
          predicho={predichos.has(match.fixture?.id)}
        />
      ))}
    </div>
  )
}
