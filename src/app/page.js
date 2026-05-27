"use client";
import { useRouter } from "next/navigation";
import matchesData from "./matches.json";

//SEPARE EN COMPONENTES TEAM Y MATCHCARD, PARA QUE QUEDEN MAS ORDENADOS Y SEAN REUTILIZABLES
// TEAM PARA MOSTRAR DATOS DE CADA EQUIPO 
// {
//   code: "MX"
//   flag: ""
//   name: "México"
// }
function Team({ team }) {

  console.log("TEAM:", team);
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
      <p className="text-5xl font-bold leading-none text-slate-100 sm:text-6xl">
        {team.code}
      </p>
      <div className="mt-4 h-8 w-12 rounded border border-dashed border-slate-600">
        {/* ACA VA LA BANDERA, PERO NO SE ENCUENTRA EN EL JSON, ASI QUE LO DEJO COMO UN DIV VACIO POR AHORA */}
      </div>
      <p className="mt-4 max-w-full truncate text-2xl font-bold text-slate-100">
        {team.name}
      </p>
    </div>
  );
}

//LA MISMA LOGICA QUE APRA TEAM PERO EN ESTE CASO PARA MOSTRAR EL PARTIDO USANDO TEAM COMPONENT PARA MOSTRAR AMBOS, OSEA ARRIBA SE LLENA INDIVIDUAL Y REUTILIZABLE
//INCLUYE INFORMACION DEL PARTIDO COMO GRUPO, ESTADIO, FECHA Y HORA
// {
//   "id": 2,
//   "group": "A",
//   "date": "2026-06-11",
//   "day": "Jueves",
//   "time": "22:00",
//   "timezone": "UTC-3",
//   "stadium": "Estadio Guadalajara",
//   "teamA": {
//     "code": "KR",
//     "name": "República de Corea",
//     "flag": ""
//   },
//   "teamB": {
//     "code": "CZ",
//     "name": "República Checa",
//     "flag": ""
//   }
// }

function MatchCard({ match }) {

  const router = useRouter();
  console.log("MATCH:", match);

  return (
    <article 
      className="rounded-3xl border border-slate-800 bg-slate-950 px-6 py-7 shadow-lg shadow-black/20 sm:px-10 cursor-pointer hover:bg-stone-700 transition"
      onClick={() => router.push(`/partido/${match.id}`)}>
      <p className="text-center text-sm font-bold uppercase tracking-wide text-slate-500 sm:text-base">
        Grupo {match.group} - {match.stadium} - {match.day} {match.date} -{" "}
        {match.time} hs
      </p>
      <div className="mt-10 flex items-center justify-between gap-4">
        <Team team={match.teamA} />
        <span className="shrink-0 text-xl font-bold uppercase text-slate-500">
          vs
        </span>
        <Team team={match.teamB} />
      </div>
    </article>
  );
}

export default function HomePage() {

  

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* ACA EN PANTALLA MEDIANA NOTEBOOK VA A MOSTRAR 2 COLUMNAS  md:grid-cols-2
      Y EN PANTALLA GRANDE VA A MOSTRAR 3 COLUMNAS ESO LO DEFINI CON GRID lg:grid-cols-3 */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* AHORA MUESTRA LOS 72 PARTIDOS DE LA PRIMERA RONDA. LA IDEA SERIA QUE HAGAMOS UNA PAGINADO PARA NO TENER TODO EN EL HOME, O PODEMOS HACER UN FILTRO QUE MUESTRE POR GRUPO, POR FECHA, POR PAIS, ETC. PERO POR AHORA LO DEJO ASI PARA MOSTRAR TODOS LOS PARTIDOS Y VER COMO QUEDA */}
        {matchesData.matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}

      </section>
    </main>
  );
}
