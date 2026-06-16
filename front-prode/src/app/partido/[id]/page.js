"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMatchById } from "@/servicios/matches.servicios";
import { savePredicciones, getPrediccionByFixtureId } from "@/servicios/predicciones.servicio";

const GROUP_COLORS = {
    A: "#ff6b35", B: "#4ecdc4", C: "#45b7d1", D: "#96ceb4",
    E: "#feca57", F: "#ff9ff3", G: "#54a0ff", H: "#5b3fd4",
    I: "#00d2d3", J: "#ff6b6b", K: "#48dbfb", L: "#1dd1a1",
};

const FINISHED = ["FT", "AET", "PEN"];
const IN_PROGRESS = ["1H", "HT", "2H", "ET", "BT", "P"];

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.toLocaleString("es-AR", { day: "numeric", timeZone: "America/New_York" });
    const month = date.toLocaleString("es-AR", { month: "short", timeZone: "America/New_York" }).replace(".", "").toUpperCase();
    const hour = date.toLocaleString("es-AR", { hour: "numeric", minute: "2-digit", hour12: false, timeZone: "America/New_York" });
    return `${day} ${month} 2026 · ${hour} HS`;
}

export default function PartidoPageId() {
    const { id } = useParams();
    const router = useRouter();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [golesLocal, setGolesLocal] = useState(0);
    const [golesVisitante, setGolesVisitante] = useState(0);
    const [guardando, setGuardando] = useState(false);
    const [prediccionExistente, setPrediccionExistente] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getMatchById(id);
                setMatch(data.data ?? data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

            try {
                const token = localStorage.getItem("token");
                const predData = await getPrediccionByFixtureId(id, token);
                if (predData?.data) {
                    setPrediccionExistente(predData.data);
                    setGolesLocal(predData.data.homeGoals);
                    setGolesVisitante(predData.data.awayGoals);
                }
            } catch (error) {
                // 404 si el usuario no tiene prediccion para este partido, no es un error real
            }
        }
        loadData();
    }, [id]);

    async function confirmarPronostico() {
        try {
            setGuardando(true);
            const token = localStorage.getItem("token");
            await savePredicciones(id, golesLocal, golesVisitante, token);
            router.push("/predicciones");
        } catch (error) {
            console.error(error);
            if (error.message.includes("comenzó o finalizó")) {
                alert("Este partido ya comenzó o finalizó. No podés modificar el pronóstico.");
            } else {
                alert("Error al guardar el pronóstico. Intentá de nuevo.");
            }
        } finally {
            setGuardando(false);
        }
    }

    if (loading) return (
        <main className="min-h-screen bg-slate-900 flex items-center justify-center">
            <p className="text-white text-center">Cargando partido...</p>
        </main>
    );

    if (!match) return (
        <main className="min-h-screen bg-slate-900 flex items-center justify-center">
            <p className="text-white text-center">No se encontró el partido.</p>
        </main>
    );

    const groupLetter = match.league?.group?.replace("Group ", "").trim() ?? "A";
    const color = GROUP_COLORS[groupLetter] ?? "#5b3fd4";
    const homeCode = match.teams.home.name.slice(0, 2).toUpperCase();
    const awayCode = match.teams.away.name.slice(0, 2).toUpperCase();
    const homeCode3 = match.teams.home.name.slice(0, 3).toUpperCase();
    const awayCode3 = match.teams.away.name.slice(0, 3).toUpperCase();

    const matchStatus = match.fixture?.status?.short;
    const isFinished = FINISHED.includes(matchStatus);
    const isInProgress = IN_PROGRESS.includes(matchStatus);
    const isBlocked = isFinished || isInProgress;

    const actualHome = match.goals?.home;
    const actualAway = match.goals?.away;

    return (
        <main className="min-h-screen bg-slate-900 px-4 py-10 text-white flex flex-col items-center gap-6">
            <div className="w-full" style={{ maxWidth: 480 }}>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 bg-[#5b3fd4] hover:bg-[#4a32b0] transition text-white font-bold px-4 py-2 rounded-xl text-sm"
                >
                    ← Volver
                </button>
            </div>

            {/* Tarjeta del partido */}
            <article
                style={{ backgroundColor: "#212542", boxShadow: `0 4px 24px 0 ${color}22`, maxWidth: 480 }}
                className="w-full rounded-3xl overflow-hidden"
            >
                <div style={{ backgroundColor: color, height: "6px" }} />
                <div className="px-6 py-7 sm:px-10">
                    <p style={{ color }} className="text-center text-xs font-bold uppercase tracking-widest mb-1">
                        {match.league?.group} · {match.league?.round}
                    </p>
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                        {match.fixture?.venue} · {formatDate(match.fixture?.date)}
                    </p>

                    {/* Badge de estado */}
                    {isFinished && (
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-green-400 mb-6">Partido finalizado</p>
                    )}
                    {isInProgress && (
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">Partido en curso</p>
                    )}
                    {!isBlocked && (
                        <div className="mb-6" />
                    )}

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-6xl font-black tracking-tighter leading-none text-white">{homeCode}</span>
                            <img src={match.teams.home.flag} alt={match.teams.home.name} onError={(e) => { e.currentTarget.style.display = "none" }} className="mt-4 h-8 w-12 object-contain rounded" />
                            <span className="text-sm font-bold mt-3 text-white">{match.teams.home.name}</span>
                            <span className="text-xs text-slate-400">{homeCode3}</span>
                        </div>

                        {/* Resultado real si el partido terminó */}
                        {isFinished && actualHome !== null && actualAway !== null ? (
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-4xl font-black text-white">{actualHome} - {actualAway}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Resultado</span>
                            </div>
                        ) : (
                            <span className="shrink-0 text-lg font-bold text-slate-500">vs</span>
                        )}

                        <div className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-6xl font-black tracking-tighter leading-none text-white">{awayCode}</span>
                            <img src={match.teams.away.flag} alt={match.teams.away.name} onError={(e) => { e.currentTarget.style.display = "none" }} className="mt-4 h-8 w-12 object-contain rounded" />
                            <span className="text-sm font-bold mt-3 text-white">{match.teams.away.name}</span>
                            <span className="text-xs text-slate-400">{awayCode3}</span>
                        </div>
                    </div>
                </div>
            </article>

            {/* Panel de pronóstico */}
            <article
                style={{ backgroundColor: "#212542", maxWidth: 480 }}
                className="w-full rounded-3xl px-6 py-8 sm:px-10"
            >
                {isBlocked ? (
                    /* Partido en curso o finalizado: mostrar pronóstico guardado sin edición */
                    <div>
                        <p style={{ color }} className="text-center text-xs font-bold uppercase tracking-widest mb-4">
                            {isFinished ? "Tu pronóstico" : "Partido en curso · Tu pronóstico"}
                        </p>
                        {prediccionExistente ? (
                            <>
                                <div className="flex items-center justify-center gap-6 mb-4">
                                    <div className="text-center">
                                        <p className="text-xs text-slate-400 mb-1">{match.teams.home.name}</p>
                                        <p className="text-5xl font-black text-orange-400">{prediccionExistente.homeGoals}</p>
                                    </div>
                                    <span className="text-2xl font-bold text-slate-500">—</span>
                                    <div className="text-center">
                                        <p className="text-xs text-slate-400 mb-1">{match.teams.away.name}</p>
                                        <p className="text-5xl font-black text-orange-400">{prediccionExistente.awayGoals}</p>
                                    </div>
                                </div>
                                {isFinished && prediccionExistente.points !== null && (
                                    <div className="text-center mt-4">
                                        {prediccionExistente.points === 3 && <p className="text-green-400 font-black text-lg">¡Marcador exacto! +3 pts</p>}
                                        {prediccionExistente.points === 1 && <p className="text-yellow-400 font-black text-lg">Resultado correcto +1 pt</p>}
                                        {prediccionExistente.points === 0 && <p className="text-red-400 font-black text-lg">No acertaste +0 pts</p>}
                                    </div>
                                )}
                                {isFinished && prediccionExistente.points === null && (
                                    <p className="text-center text-slate-400 text-sm mt-4">Calculando puntos...</p>
                                )}
                            </>
                        ) : (
                            <p className="text-center text-slate-400 text-sm">No hiciste un pronóstico para este partido.</p>
                        )}
                    </div>
                ) : (
                    /* Partido no iniciado: permitir ingresar/editar pronóstico */
                    <>
                        <p style={{ color }} className="text-center text-xs font-bold uppercase tracking-widest mb-2">
                            {prediccionExistente ? "Modificar pronóstico" : "¿Cuántos goles hace cada equipo?"}
                        </p>
                        {prediccionExistente && (
                            <p className="text-center text-slate-400 text-xs mb-6">Ya tenés un pronóstico guardado. Podés cambiarlo.</p>
                        )}
                        {!prediccionExistente && <div className="mb-6" />}
                        <div className="flex items-center justify-around gap-4">
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    {match.teams.home.name}
                                </span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setGolesLocal(g => Math.max(0, g - 1))}
                                        style={{ borderColor: "#ffffff33" }}
                                        className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent"
                                    >−</button>
                                    <span style={{ color }} className="text-4xl font-black w-10 text-center">{golesLocal}</span>
                                    <button
                                        onClick={() => setGolesLocal(g => g + 1)}
                                        style={{ borderColor: "#ffffff33" }}
                                        className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent"
                                    >+</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    {match.teams.away.name}
                                </span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setGolesVisitante(g => Math.max(0, g - 1))}
                                        style={{ borderColor: "#ffffff33" }}
                                        className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent"
                                    >−</button>
                                    <span style={{ color }} className="text-4xl font-black w-10 text-center">{golesVisitante}</span>
                                    <button
                                        onClick={() => setGolesVisitante(g => g + 1)}
                                        style={{ borderColor: "#ffffff33" }}
                                        className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={confirmarPronostico}
                            disabled={guardando}
                            style={{ backgroundColor: color }}
                            className="mt-8 w-full py-3 rounded-2xl font-bold text-sm uppercase tracking-widest text-white disabled:opacity-50"
                        >
                            {guardando ? "Guardando..." : prediccionExistente ? "Actualizar pronóstico" : "Confirmar pronóstico"}
                        </button>
                    </>
                )}
            </article>
        </main>
    );
}
