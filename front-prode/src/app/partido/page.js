"use client"

import { useState } from "react"
import Rounds from "@/app/Components/rounds/rounds"
import Standings from "@/app/Components/posiciones/posiciones"

export default function PartidoPage() {
  const [activeTab, setActiveTab] = useState("rounds")

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("rounds")}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeTab === "rounds"
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Jornadas
        </button>

        <button
          onClick={() => setActiveTab("standings")}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            activeTab === "standings"
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Tabla de posiciones
        </button>
      </div>

      {activeTab === "rounds" && <Rounds />}

      {activeTab === "standings" && <Standings />}
    </main>
  )
}