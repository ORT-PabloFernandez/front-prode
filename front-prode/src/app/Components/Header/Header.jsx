export default function Header() {
  return (
    <header style={{ backgroundColor: '#5b3fd4' }} className="shadow">
      <div className="mx-auto flex h-20 items-center px-4 sm:px-6 lg:px-8 relative">

        {/* LOGO IZQUIERDA */}
        <div className="shrink-0">
          <a className="block" href="/">
            <img src="/image/prode.png" alt="Prode" className="h-12 w-auto" />
          </a>
        </div>

        {/* NAVBAR CENTRO */}
        <nav aria-label="Global" className="hidden md:flex absolute left-1/2 -translate-x-1/2">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}