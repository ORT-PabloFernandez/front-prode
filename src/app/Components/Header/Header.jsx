export default function Header() {


  return (
    <header className="bg-black shadow">
      <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-4 lg:px-4">
        {/* ACA SAQUE # Y PUSE / PARA QUE ME LLEVE A LA PAGINA PRINCIPAL CUANDO TOQUE EL LOGO, SI DEJO # NO HACE NADA */}
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>prode</a>
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
                    href="/predicciones/page.js"
                >
                  predicciones
                </a>
              </li>

            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="/login/page.js"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                href="/registro/page.js"
              >
                Register
              </a>
            </div>

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
      </div>
    </header>
  );
}