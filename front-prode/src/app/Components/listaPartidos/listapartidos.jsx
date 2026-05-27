"use client"

import { useEffect, useState } from "react"
import { getMatches } from "@/servicios/matches.servicios"

export default function MatchesList() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMatches() {
      try {
        /*llama a todos los los datos del endpoint */
        const data = await getMatches()

        console.log(data)

        setMatches(data.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  if (loading) return <p>Cargando partidos...</p>

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div
          key={match.fixture.id}
          className="border p-4 rounded"
        >
          <h2>
            {match.teams.home.name} vs{" "}
            {match.teams.away.name}
          </h2>

          <p>{match.fixture.date}</p>

          <p>Estado: {match.fixture.status.long}</p>
        </div>
      ))}
    </div>
  )
}