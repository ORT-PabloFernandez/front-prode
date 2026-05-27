"use client";
import { useRouter } from "next/navigation";
import matchesData from "./matches.json";
import MatchesList from "@/app/Components/listaPartidos/listapartidos"



export default function HomePage() {

  

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white sm:px-6 lg:px-8">
      <MatchesList />
    </main>
  );
}
