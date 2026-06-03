"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../servicios/authService";

export default function Registro() {
  
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await register(
      name,
      email,
      password
    );

    alert(data.message);

    router.push("/login");
  };

  return (
    <div>
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