"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMatchById } from "@/servicios/matches.servicios";
import { savePredicciones } from "@/servicios/predicciones.servicio";

const GROUP_COLORS = {
    A: "#ff6b35", B: "#4ecdc4", C: "#45b7d1", D: "#96ceb4",
    E: "#feca57", F: "#ff9ff3", G: "#54a0ff", H: "#5b3fd4",
    I: "#00d2d3", J: "#ff6b6b", K: "#48dbfb", L: "#1dd1a1",
};

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

    useEffect(() => {
        async function loadMatch() {
            try {
                const data = await getMatchById(id);
                setMatch(data.data ?? data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadMatch();
    }, [id]);

    function sumarLocal() { setGolesLocal(golesLocal + 1) }
    function restarLocal() { if (golesLocal > 0) setGolesLocal(golesLocal - 1) }
    function sumarVisitante() { setGolesVisitante(golesVisitante + 1) }
    function restarVisitante() { if (golesVisitante > 0) setGolesVisitante(golesVisitante - 1) }

    async function confirmarPronostico() {
        try {
            setGuardando(true);
             const token = localStorage.getItem("token");

            await savePredicciones(id, golesLocal, golesVisitante, token);
            router.push("/predicciones");
        } catch (error) {
            console.error(error);
            alert("Error al guardar el pronóstico");
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

    return (
        <main className="min-h-screen bg-slate-900 px-4 py-10 text-white flex flex-col items-center gap-6">

            <article
                style={{ backgroundColor: "#212542", boxShadow: `0 4px 24px 0 ${color}22`, maxWidth: 480 }}
                className="w-full rounded-3xl overflow-hidden"
            >
                <div style={{ backgroundColor: color, height: "6px" }} />
                <div className="px-6 py-7 sm:px-10">
                    <p style={{ color }} className="text-center text-xs font-bold uppercase tracking-widest mb-1">
                        {match.league?.group} · {match.league?.round}
                    </p>
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                        {match.fixture?.venue} · {formatDate(match.fixture?.date)}
                    </p>
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-6xl font-black tracking-tighter leading-none text-white">{homeCode}</span>
                            <div className="mt-4 h-8 w-12 rounded border border-dashed border-slate-600" />
                            <span className="text-sm font-bold mt-3 text-white">{match.teams.home.name}</span>
                            <span className="text-xs text-slate-400">{homeCode3}</span>
                        </div>
                        <span className="shrink-0 text-lg font-bold text-slate-500">vs</span>
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <span className="text-6xl font-black tracking-tighter leading-none text-white">{awayCode}</span>
                            <div className="mt-4 h-8 w-12 rounded border border-dashed border-slate-600" />
                            <span className="text-sm font-bold mt-3 text-white">{match.teams.away.name}</span>
                            <span className="text-xs text-slate-400">{awayCode3}</span>
                        </div>
                    </div>
                </div>
            </article>

            <article
                style={{ backgroundColor: "#212542", maxWidth: 480 }}
                className="w-full rounded-3xl px-6 py-8 sm:px-10"
            >
                <p style={{ color }} className="text-center text-xs font-bold uppercase tracking-widest mb-6">
                    ¿Cuántos goles hace cada equipo?
                </p>
                <div className="flex items-center justify-around gap-4">
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {match.teams.home.name}
                        </span>
                        <div className="flex items-center gap-3">
                            <button onClick={restarLocal} style={{ borderColor: "#ffffff33" }} className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent">−</button>
                            <span style={{ color }} className="text-4xl font-black w-10 text-center">{golesLocal}</span>
                            <button onClick={sumarLocal} style={{ borderColor: "#ffffff33" }} className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent">+</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {match.teams.away.name}
                        </span>
                        <div className="flex items-center gap-3">
                            <button onClick={restarVisitante} style={{ borderColor: "#ffffff33" }} className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent">−</button>
                            <span style={{ color }} className="text-4xl font-black w-10 text-center">{golesVisitante}</span>
                            <button onClick={sumarVisitante} style={{ borderColor: "#ffffff33" }} className="w-10 h-10 rounded-xl border text-lg font-bold text-white bg-transparent">+</button>
                        </div>
                    </div>
                </div>
                <button
                    onClick={confirmarPronostico}
                    disabled={guardando}
                    style={{ backgroundColor: color }}
                    className="mt-8 w-full py-3 rounded-2xl font-bold text-sm uppercase tracking-widest text-white disabled:opacity-50"
                >
                    {guardando ? "Guardando..." : "Confirmar pronóstico"}
                </button>
            </article>

        </main>
    );
}