"use client"

import { useEffect, useState } from "react"
import { getMatches } from "@/servicios/matches.servicios"
import CardMatch from "@/app/Components/CardMatch"

export default function Rounds() {
  const [roundsData, setRoundsData] = useState({})
  const [selectedGroup, setSelectedGroup] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMatches() {
      try {
        const response = await getMatches()
        const matches = response.data || []

        const grouped = matches.reduce((acc, match) => {
          const round = match.league.round
          const group = match.league.group

          if (!acc[round]) {
            acc[round] = {}
          }

          if (!acc[round][group]) {
            acc[round][group] = []
          }

          acc[round][group].push(match)

          return acc
        }, {})

        const initialSelection = {}

        Object.keys(grouped).forEach((round) => {
          initialSelection[round] = Object.keys(grouped[round])[0]
        })

        setSelectedGroup(initialSelection)
        setRoundsData(grouped)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  if (loading) {
    return (
      <p className="text-center text-white py-8">
        Cargando jornadas...
      </p>
    )
  }

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-12">
      {Object.entries(roundsData).map(([round, groups]) => (
        <section
          key={round}
          className="rounded-3xl bg-slate-900 border border-slate-800 p-6"
        >
          {/* TITULO DE JORNADA */}
          <h2 className="text-3xl font-black text-white mb-6">
            {round}
          </h2>

          {/* TABS DE GRUPOS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.keys(groups).map((group) => (
              <button
                key={group}
                onClick={() =>
                  setSelectedGroup((prev) => ({
                    ...prev,
                    [round]: group,
                  }))
                }
                className={`px-4 py-2 rounded-xl font-bold transition ${
                  selectedGroup[round] === group
                    ? "bg-violet-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* PARTIDOS DEL GRUPO SELECCIONADO */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups[selectedGroup[round]]?.map((match) => (
              <CardMatch
                key={match.fixture.id}
                match={match}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}