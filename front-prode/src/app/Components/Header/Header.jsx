"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [estaLogueado, setEstaLogueado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setEstaLogueado(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setEstaLogueado(false);

    router.push("/");
  };

  /*cambie los href sacandole el page.js */
  return (
    <header style={{ backgroundColor: "#5b3fd4" }} className="shadow">
      <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-4 lg:px-4">
        <a className="block" href="/">
          <img src="/image/prode.png" alt="Prode" className="h-12 w-auto" />
        </a>
        {/* ACA SAQUE # Y PUSE / PARA QUE ME LLEVE A LA PAGINA PRINCIPAL CUANDO TOQUE EL LOGO, SI DEJO # NO HACE NADA */}
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>prode
        </a>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {/* //PARTIDO NO MOSTRARIA EN EL HEADER XQ LLEVA AL ID DEL PARTIDO QUE VA A LLEVARME AHI CUANDO TOQUE EL PARTIDO AL CUAL QUEREMOS INGRESAR */}
              {/* <li>
                <a
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  href="/partido/page.js"   
                >
                  partido
                </a>
              </li> */}
              <li>
                <a
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  href="/predicciones"
                >
                  predicciones
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* NAVBAR CENTRO */}
        <nav
          aria-label="Global"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2"
        >
          <ul className="flex items-center gap-6">
            <li>
              <a
                className="text-[18px] font-semibold text-white transition hover:text-white/70"
                href="/partido"
              >
                Partido
              </a>
            </li>
            <li>
              <a
                className="text-[18px] font-semibold text-white transition hover:text-white/70"
                href="/predicciones"
              >
                Predicciones
              </a>
            </li>
          </ul>
        </nav>

        {/* BOTONES DERECHA */}
        <div className="ml-auto flex items-center gap-4">
          {!estaLogueado ? (
            <>
              <a
                className="text-[18px] font-semibold text-white transition hover:text-white/70"
                href="/login"
              >
                ingresar
              </a>

              <a
                className="hidden text-[18px] font-semibold text-white transition hover:text-white/70 sm:block"
                href="/registro"
              >
                registrarse
              </a>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-[18px] font-semibold text-white transition hover:text-white/70"
            >
              cerrar sesión
            </button>
          )}

          <button className="block text-white transition hover:text-white/70 md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
