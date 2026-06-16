"use client"

import { useEffect, useState } from "react"
import { getStandings } from "@/servicios/matches.servicios"

export default function Standings() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStandings() {
      try {
        const response = await getStandings()

        console.log("RESPONSE:", response)
        console.log("DATA:", response.data)

        setGroups(response.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadStandings()
  }, [])

  if (loading) {
    return <p className="text-white text-center">Cargando tabla...</p>
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-black text-white text-center mb-8">
        Tabla de Posiciones
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group) => (
          <section
            key={group.group}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6"
          >
            <h2 className="text-2xl font-black text-white mb-4">
              {group.group}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Equipo</th>
                    <th className="p-2 text-center">PJ</th>
                    <th className="p-2 text-center">G</th>
                    <th className="p-2 text-center">E</th>
                    <th className="p-2 text-center">P</th>
                    <th className="p-2 text-center">DG</th>
                    <th className="p-2 text-center">Pts</th>
                  </tr>
                </thead>

                <tbody>
                  {group.table.map((team) => (
                    <tr
                      key={team.team}
                      className="border-b border-slate-800"
                    >
                      <td className="p-2">{team.rank}</td>
                      <td className="p-2 font-semibold">{team.team}</td>
                      <td className="p-2 text-center">{team.played}</td>
                      <td className="p-2 text-center">{team.won}</td>
                      <td className="p-2 text-center">{team.drawn}</td>
                      <td className="p-2 text-center">{team.lost}</td>
                      <td className="p-2 text-center">{team.goalsDiff}</td>
                      <td className="p-2 text-center font-bold">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}