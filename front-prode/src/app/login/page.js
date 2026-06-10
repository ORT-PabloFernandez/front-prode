"use client";

import { useState } from "react";
import { login } from "../../servicios/authService";

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

    const data = await login(
      email,
      password
    );

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showToast("Login exitoso", "success");
      setTimeout(() => { window.location.href = "/"; }, 2000);
    } else {
      showToast("Email o contraseña incorrectos", "error");
    }
  };

  return (
    <div>
      {toast.message && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 font-semibold px-6 py-4 rounded-2xl shadow-lg text-white ${toast.type === "success" ? "bg-[#5b3fd4]" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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
          Ingresar
        </button>
      </form>
    </div>
  );
}