import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { BsHouseDoorFill, BsJournalText, BsPeopleFill } from "react-icons/bs";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sistema de Chamados",
  description: "Sistema interno de chamados",
};

function Sidebar() {
  return (
    <aside className="w-64 bg-primary-color rounded-r-[20px] text-white p-4 shadow-md">
      <div className="mb-12">
        <Image
          src="/logo-brss.png"
          alt="Logo BSS"
          width={130}
          height={44}
          priority
        />
      </div>

      <nav>
        <ul>
          <li className="mb-2">
            <Link
              href="/"
              className="flex items-center gap-3 p-2 rounded hover:bg-primary-color-hover transition-colors"
            >
              <BsHouseDoorFill size={20} />
              <span>Início</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/chamados"
              className="flex items-center gap-3 p-2 rounded hover:bg-primary-color-hover transition-colors"
            >
              <BsJournalText size={20} />
              <span>Chamados</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-primary-color-hover transition-colors"
            >
              <BsPeopleFill size={20} />
              <span>Colaboradores</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="flex h-screen bg-page-bg">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
