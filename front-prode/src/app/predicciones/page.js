"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPredicciones } from "@/servicios/predicciones.servicio"
import { getMatches } from "@/servicios/matches.servicios"

const FINISHED = ["FT", "AET", "PEN"]
const IN_PROGRESS = ["1H", "HT", "2H", "ET", "BT", "P"]

// Mismo set de colores por grupo que usa la card del partido
const GROUP_COLORS = {
  A: "#ff6b35", B: "#4ecdc4", C: "#45b7d1", D: "#96ceb4",
  E: "#feca57", F: "#ff9ff3", G: "#54a0ff", H: "#5b3fd4",
  I: "#00d2d3", J: "#ff6b6b", K: "#48dbfb", L: "#1dd1a1",
}

function formatDate(isoDate) {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  const day = date.toLocaleString("es-AR", { day: "numeric", timeZone: "America/New_York" })
  const month = date.toLocaleString("es-AR", { month: "short", timeZone: "America/New_York" }).replace(".", "").toUpperCase()
  return `${day} ${month}`
}

function EstadoBadge({ pred }) {
  if (pred.points === 3) return <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">¡Exacto! +3</span>
  if (pred.points === 1) return <span className="bg-yellow-900 text-yellow-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Correcto +1</span>
  if (pred.points === 0) return <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Fallaste +0</span>

  const status = pred.fixture?.status?.short
  if (FINISHED.includes(status)) return <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">En evaluación</span>
  if (IN_PROGRESS.includes(status)) return <span className="bg-orange-900 text-orange-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">En curso</span>
  return <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Pendiente</span>
}

export default function PrediccionesPage() {
  const [predicciones, setPredicciones] = useState([])
  const [matchesMap, setMatchesMap] = useState({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token")

        const predData = await getPredicciones(token)
        // Oculto las predicciones huérfanas (de un dataset viejo): el backend
        // las devuelve con fixture: null y no se pueden borrar vía API.
        const validas = (predData.data || []).filter((p) => p.fixture)
        setPredicciones(validas)

        // Traigo los matches solo para lo cosmético: banderas y color del grupo
        try {
          const matchesData = await getMatches()
          const mapa = {}
          for (const m of (matchesData.data || [])) {
            mapa[m.fixture.id] = m
          }
          setMatchesMap(mapa)
        } catch (e) {
          console.error(e)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const guardadas = predicciones.length
  const acertadas = predicciones.filter(p => p.points === 3).length
  const correctas = predicciones.filter(p => p.points === 1).length
  const falladas = predicciones.filter(p => p.points === 0).length
  const totalPuntos = predicciones.reduce((sum, p) => sum + (p.points ?? 0), 0)

  if (loading) return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white text-center">Cargando predicciones...</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 bg-[#5b3fd4] hover:bg-[#4a32b0] transition text-white font-bold px-4 py-2 rounded-xl text-sm"
        >
          ← Volver
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black">Mis Predicciones</h1>
          <button
            onClick={() => router.push("/ranking")}
            className="bg-[#5b3fd4] hover:bg-[#4a32b0] transition text-white font-bold px-5 py-2.5 rounded-xl text-sm uppercase tracking-widest"
          >
            Ver Ranking
          </button>
        </div>

        {/* Puntos totales */}
        <div className="bg-[#5b3fd4] rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
          <p className="text-white font-bold uppercase tracking-widest text-sm">Puntos totales</p>
          <p className="text-4xl font-black text-white">{totalPuntos}</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-[#212542] rounded-2xl px-3 py-4 text-center">
            <p className="text-2xl font-black text-white">{guardadas}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Total</p>
          </div>
          <div className="bg-[#212542] rounded-2xl px-3 py-4 text-center">
            <p className="text-2xl font-black text-green-400">{acertadas}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Exactos</p>
          </div>
          <div className="bg-[#212542] rounded-2xl px-3 py-4 text-center">
            <p className="text-2xl font-black text-yellow-400">{correctas}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Correctos</p>
          </div>
          <div className="bg-[#212542] rounded-2xl px-3 py-4 text-center">
            <p className="text-2xl font-black text-red-400">{falladas}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Fallados</p>
          </div>
        </div>

        {predicciones.length === 0 ? (
          <p className="text-slate-400 text-center">No tenés predicciones guardadas todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {predicciones.map((pred) => {
              // El backend manda el partido embebido en cada predicción (nombres, goles, estado)
              const f = pred.fixture
              // Los matches aportan lo cosmético: banderas y color del grupo
              const m = matchesMap[pred.fixtureId]
              const groupLetter = m?.league?.group?.replace("Group ", "").trim() ?? ""
              const color = GROUP_COLORS[groupLetter] ?? "#5b3fd4"
              const homeFlag = m?.teams?.home?.flag
              const awayFlag = m?.teams?.away?.flag
              const isFinished = FINISHED.includes(f?.status?.short)

              return (
                <div key={pred._id} className="bg-[#212542] rounded-2xl overflow-hidden">
                  {/* Franja de color del grupo */}
                  <div style={{ backgroundColor: color, height: "5px" }} />
                  <div className="px-4 py-4">
                    {/* Grupo · ronda */}
                    <p style={{ color }} className="text-center text-[10px] font-bold uppercase tracking-widest mb-3">
                      {m?.league?.group ? `${m.league.group} · ` : ""}{f?.round} · {formatDate(f?.date)}
                    </p>

                    {/* Equipos con bandera a cada lado */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex-1 text-center">
                        <p className="text-xs text-slate-300 mb-1 truncate">{f.homeTeam}</p>
                        {homeFlag && (
                          <img src={homeFlag} alt={f.homeTeam} onError={(e) => { e.currentTarget.style.display = "none" }} className="h-5 w-8 mx-auto object-contain rounded" />
                        )}
                      </div>
                      <span className="text-slate-500 text-xs font-bold shrink-0">vs</span>
                      <div className="flex-1 text-center">
                        <p className="text-xs text-slate-300 mb-1 truncate">{f.awayTeam}</p>
                        {awayFlag && (
                          <img src={awayFlag} alt={f.awayTeam} onError={(e) => { e.currentTarget.style.display = "none" }} className="h-5 w-8 mx-auto object-contain rounded" />
                        )}
                      </div>
                    </div>

                    {/* Marcadores */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 rounded-xl px-2 py-2 text-center">
                        <p className="text-[10px] text-slate-400 mb-0.5">Tu pronóstico</p>
                        <p className="text-lg font-black text-orange-400">
                          {pred.homeGoals} — {pred.awayGoals}
                        </p>
                      </div>
                      {isFinished && f?.goals && (
                        <div className="flex-1 bg-slate-800 rounded-xl px-2 py-2 text-center">
                          <p className="text-[10px] text-slate-400 mb-0.5">Resultado</p>
                          <p className="text-lg font-black text-white">
                            {f.goals.home ?? '-'} — {f.goals.away ?? '-'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Estado */}
                    <div className="text-center mt-3">
                      <EstadoBadge pred={pred} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
