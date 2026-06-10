"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MatchesList from "@/app/Components/listaPartidos/listapartidos";

export default function HomePage() {
  const router = useRouter();
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setLogueado(true);
    }
  }, [router]);

  if (!logueado) return null;

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white sm:px-6 lg:px-8">
      <MatchesList />
    </main>
  );
}
