"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div>
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#5b3fd4] text-white font-semibold px-6 py-4 rounded-2xl shadow-lg">
          {toast}
        </div>
      )}
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Registrarse
        </button>
      </form>
    </div>
  )
}