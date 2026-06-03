"use client"
import { useEffect, useState } from "react"
import { getMatches } from "@/servicios/matches.servicios"
import CardMatch from "@/app/Components/CardMatch"

export default function MatchesList() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMatches() {
      try {
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

  if (loading) return <p className="text-white text-center py-8">Cargando partidos...</p>

  console.log("Matches:", matches)

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8">
      {matches.map((match) => (
        <CardMatch key={match.id} match={match} />
      ))}
    </div>
  )
}