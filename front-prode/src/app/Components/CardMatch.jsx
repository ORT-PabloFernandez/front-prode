import { useRouter } from "next/navigation";

// CADA GRUPO TIENE UN COLOR DISTINTO PARA LA FRANJA Y LA SOMBRA DE LA CARD
const GROUP_COLORS = {
    A: "#ff6b35",
    B: "#4ecdc4",
    C: "#45b7d1",
    D: "#96ceb4",
    E: "#feca57",
    F: "#ff9ff3",
    G: "#54a0ff",
    H: "#5b3fd4",
    I: "#00d2d3",
    J: "#ff6b6b",
    K: "#48dbfb",
    L: "#1dd1a1",
};

function MatchCard({ match, predicho = false }) {
    const router = useRouter();

    const groupLetter = match.league.group?.replace("Group ", "").trim() ?? "A";
    const color = GROUP_COLORS[groupLetter] ?? "#5b3fd4";

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.toLocaleString("es-AR", { day: "numeric", timeZone: "America/New_York" });
        const month = date.toLocaleString("es-AR", { month: "short", timeZone: "America/New_York" }).replace(".", "").toUpperCase();
        const hour = date.toLocaleString("es-AR", { hour: "numeric", hour12: false, timeZone: "America/New_York" });
        return `${day} ${month} ${hour} HS`;
    };

    const homeCode2 = match.teams.home.name.slice(0, 2).toUpperCase();
    const awayCode2 = match.teams.away.name.slice(0, 2).toUpperCase();

    return (
        <article
            onClick={() => router.push(`/partido/${match.fixture.id}`)}
            style={{
                backgroundColor: "#212542",
                boxShadow: `0 4px 24px 0 ${color}22`,
            }}
            className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
        >
            {/* FRANJA DE COLOR SEGUN GRUPO */}
            <div style={{ backgroundColor: color, height: "6px" }} />
            <div className="px-6 py-7 sm:px-10">
                {/* BADGE SI YA PRONOSTIQUE ESTE PARTIDO */}
                {predicho && (
                    <div className="flex justify-center mb-3">
                        <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            ✓ Ya pronosticaste
                        </span>
                    </div>
                )}
                <p
                    style={{ color }}
                    className="text-center text-xs font-bold uppercase tracking-widest mb-1"
                >
                    {match.league.group} · {match.league.round}
                </p>
                <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                    {match.fixture.venue} · {formatDate(match.fixture.date)}
                </p>

                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-6xl font-black tracking-tighter leading-none text-white">
                            {homeCode2}
                        </span>
                        <img src={match.teams.home.flag} alt={match.teams.home.name} onError={(e) => { e.currentTarget.style.display = "none" }} className="mt-4 h-8 w-12 object-contain rounded" />
                        <span className="text-sm font-bold mt-3 text-white">{match.teams.home.name}</span>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-slate-500">vs</span>

                    <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-6xl font-black tracking-tighter leading-none text-white">
                            {awayCode2}
                        </span>
                        <img src={match.teams.away.flag} alt={match.teams.away.name} onError={(e) => { e.currentTarget.style.display = "none" }} className="mt-4 h-8 w-12 object-contain rounded" />
                        <span className="text-sm font-bold mt-3 text-white">{match.teams.away.name}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default MatchCard;
