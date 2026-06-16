"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRanking } from "@/servicios/predicciones.servicio";

export default function RankingPage() {
  const router = useRouter();
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [miUserId, setMiUserId] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setMiUserId(user._id);
      } catch {}
    }

    async function loadRanking() {
      try {
        const token = localStorage.getItem("token");
        const data = await getRanking(token);
        setRanking(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadRanking();
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white text-center">Cargando ranking...</p>
    </main>
  );

  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  // orden visual del podio: 2do - 1ro - 3ro
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const medalImages = ["/image/medal2.png", "/image/medal1.png", "/image/medal3.png"];
  const podiumSizes = ["h-32", "h-40", "h-32"];

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 bg-[#5b3fd4] hover:bg-[#4a32b0] transition text-white font-bold px-4 py-2 rounded-xl text-sm"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-black mb-6">Ranking</h1>

        {ranking.length === 0 ? (
          <p className="text-slate-400 text-center">No hay datos de ranking todavía.</p>
        ) : (
          <>
            {/* PODIO TOP 3 */}
            {top3.length > 0 && (
              <div className="flex justify-center items-end gap-8 mb-10">
                {podiumOrder.map((user, i) => {
                  if (!user) return <div key={i} className="w-24" />;
                  const isFirst = user.position === 1;
                  const isMe = user.userId === miUserId;
                  return (
                    <div key={user.userId} className="flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-105">
                      <img
                        src={medalImages[i]}
                        alt={`Medalla ${user.position}`}
                        className={`${podiumSizes[i]} w-auto object-contain`}
                      />
                      <p className={`font-black text-center ${isFirst ? "text-lg" : "text-base"} ${isMe ? "text-[#5b3fd4]" : "text-white"}`}>
                        {user.name}{isMe ? " 👤" : ""}
                      </p>
                      <p className="text-[#5b3fd4] font-black text-xl">{user.totalPoints} pts</p>
                      <p className="text-slate-400 text-xs text-center">
                        {user.exactScores} exactos · {user.correctResults} result.
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LISTA DEL 4TO EN ADELANTE */}
            {rest.length > 0 && (
              <div className="flex flex-col gap-3">
                {rest.map((user) => {
                  const isMe = user.userId === miUserId;
                  return (
                    <div
                      key={user.userId}
                      style={{ backgroundColor: isMe ? "#1a1a3a" : "#212542" }}
                      className={`rounded-2xl px-6 py-4 flex items-center gap-4 transition-transform duration-200 hover:scale-[1.02] ${isMe ? "border-2 border-[#5b3fd4]" : ""}`}
                    >
                      <span className={`font-black text-xl min-w-8 text-center ${isMe ? "text-[#5b3fd4]" : "text-slate-400"}`}>
                        {user.position}
                      </span>
                      <div className="flex-1">
                        <p className={`font-bold ${isMe ? "text-[#5b3fd4]" : "text-white"}`}>
                          {user.name}{isMe ? " (vos)" : ""}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {user.exactScores} exactos · {user.correctResults} correctos · {user.totalPredictions} pronósticos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-black ${isMe ? "text-[#5b3fd4]" : ""}`} style={isMe ? {} : { color: "#5b3fd4" }}>
                          {user.totalPoints}
                        </p>
                        <p className="text-xs text-slate-400">pts</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
