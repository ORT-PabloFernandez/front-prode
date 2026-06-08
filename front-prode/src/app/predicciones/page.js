
"use client"
import { useEffect, useState } from "react"
import { getPredicciones } from "@/servicios/predicciones.servicio"

export default function PrediccionesPage() {

 const [predicciones, setPredicciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPredicciones() {
      try {
        const data = await getPredictions()
        setPredicciones(data.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadPredicciones()
  }, [])

  if (loading) return <p className="text-white text-center py-8">Cargando predicciones...</p>

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <h1 className="text-3xl font-black mb-8">Mis Predicciones</h1>
      {predicciones.length === 0 ? (
        <p className="text-slate-400 text-center">No tenés predicciones guardadas todavía.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {predicciones.map((pred) => (
            <div key={pred._id} className="bg-[#212542] rounded-2xl px-6 py-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{pred.fixture.homeTeam} vs {pred.fixture.awayTeam}</p>
                <p className="text-slate-400 text-sm">{pred.fixture.round}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-orange-400">{pred.homeGoals} — {pred.awayGoals}</p>
                <p className="text-xs text-slate-400">Tu marcador</p>
              </div>
              <div>
                {pred.points === null && <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">Pendiente</span>}
                {pred.points === 0 && <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-xs">Fallaste</span>}
                {pred.points === 1 && <span className="bg-yellow-900 text-yellow-300 px-3 py-1 rounded-full text-xs">Resultado correcto</span>}
                {pred.points === 3 && <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs">¡Exacto!</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
