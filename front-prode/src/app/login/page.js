"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../servicios/authService";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(
      email,
      password
    );

    if (data.token) {
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login exitoso");

      window.location.href = "/";

    } else {
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <div>
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