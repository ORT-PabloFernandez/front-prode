
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPredicciones } from "@/servicios/predicciones.servicio"


export default function PrediccionesPage() {

  const [predicciones, setPredicciones] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  

  useEffect(() => {
    async function loadPredicciones() {
      try {
        const token = localStorage.getItem("token")
        const data = await getPredicciones(token)
        console.log("RESULTADO:", data)
        setPredicciones(data.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadPredicciones()
  }, [])

  const guardadas = predicciones.length
  const acertadas = predicciones.filter(p => p.points === 3).length
  const falladas = predicciones.filter(p => p.points === 0).length
  const pendientes = predicciones.filter(p => p.points === null).length
  if (loading) return <p className="text-white text-center py-8">Cargando predicciones...</p>

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-2 bg-[#5b3fd4] hover:bg-[#4a32b0] transition text-white font-bold px-4 py-2 rounded-xl text-sm"
      >
        ← Volver
      </button>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">Mis Predicciones</h1>
        <button
          onClick={() => router.push("/ranking")}
          className="bg-[#5b3fd4] hover:bg-[#4a32b0] transition text-white font-bold px-5 py-2.5 rounded-xl text-sm uppercase tracking-widest"
        >
          Ver Ranking
        </button>
      </div>
      <div className="bg-[#212542] rounded-2xl px-6 py-5 flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">Mis Predicciones</h1>
        
      </div>
      <div className="bg-[#212542] rounded-2xl px-6 py-5 flex items-center justify-between mb-8">

        <button onClick={() => router.push("/")}>← Inicio</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#212542] rounded-2xl px-4 py-5 text-center">
          <p className="text-3xl font-black text-white">{guardadas}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Guardadas</p>
        </div>
        <div className="bg-[#212542] rounded-2xl px-4 py-5 text-center">
          <p className="text-3xl font-black text-green-400">{acertadas}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Acertadas</p>
        </div>
        <div className="bg-[#212542] rounded-2xl px-4 py-5 text-center">
          <p className="text-3xl font-black text-red-400">{falladas}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Falladas</p>
        </div>
        <div className="bg-[#212542] rounded-2xl px-4 py-5 text-center">
          <p className="text-3xl font-black text-slate-400">{pendientes}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Pendientes</p>
        </div>
      </div>
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
