import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prode",
  description: "Aplicacion de predicciones deportivas",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}