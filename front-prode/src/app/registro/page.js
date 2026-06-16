"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../../servicios/authService";

export default function Registro() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await register(
      name,
      email,
      password
    );

    setToast(data.message);
    setTimeout(() => {
      setToast("");
      router.push("/login");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10 text-white">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#5b3fd4] text-white font-semibold px-6 py-4 rounded-2xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="w-full max-w-sm">
        {/* Imagen del prode */}
        <div className="flex justify-center mb-8">
          <img src="/image/prode.png" alt="Prode" className="h-20 w-auto" />
        </div>

        <div className="bg-[#212542] rounded-3xl px-8 py-10 shadow-lg">
          <h1 className="text-3xl font-black text-center mb-1">Crear cuenta</h1>
          <p className="text-slate-400 text-sm text-center mb-8">Registrate para empezar a jugar</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#5b3fd4]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#5b3fd4]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#5b3fd4]"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-2xl bg-[#5b3fd4] hover:bg-[#4a32b0] transition font-bold text-sm uppercase tracking-widest text-white"
            >
              Registrarse
            </button>
          </form>

          <p className="text-slate-400 text-sm text-center mt-6">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-[#9d8bff] font-bold hover:underline">
              Ingresá
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
