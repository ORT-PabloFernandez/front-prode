"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "../../servicios/authService";
import { refreshCache } from "../../servicios/matches.servicios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      try {
        await refreshCache(data.token);
      } catch (error) {
        console.error("no se pudo refrescar", error);
      }

      showToast("Login exitoso", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      showToast("Email o contraseña incorrectos", "error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10 text-white">
      {toast.message && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 font-semibold px-6 py-4 rounded-2xl shadow-lg text-white ${toast.type === "success" ? "bg-[#5b3fd4]" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-sm">
        {/* Imagen del prode */}
        <div className="flex justify-center mb-8">
          <img src="/image/prode.png" alt="Prode" className="h-20 w-auto" />
        </div>

        <div className="bg-[#212542] rounded-3xl px-8 py-10 shadow-lg">
          <h1 className="text-3xl font-black text-center mb-1">Ingresar</h1>
          <p className="text-slate-400 text-sm text-center mb-8">
            Entrá para cargar tus pronósticos
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Email
              </label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#5b3fd4]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Contraseña
              </label>
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
              Ingresar
            </button>
          </form>

          <p className="text-slate-400 text-sm text-center mt-6">
            ¿No tenés cuenta?{" "}
            <Link
              href="/registro"
              className="text-[#9d8bff] font-bold hover:underline"
            >
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
