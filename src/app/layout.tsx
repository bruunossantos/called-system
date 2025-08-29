import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BsHouseDoorFill, BsJournalText, BsPeopleFill } from 'react-icons/bs';
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
      <div className="mb-8 font-bold text-2xl">BSS</div>
      <nav>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-primary-color-hover transition-colors"
            >
              <BsHouseDoorFill size={20} />
              <span>Início</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/chamados"
              className="flex items-center gap-3 p-2 rounded hover:bg-primary-color-hover transition-colors"
            >
               <BsJournalText size={20} />
              <span>Chamados</span>
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-primary-color-hover transition-colors"
            >
              <BsPeopleFill size={20} />
              <span>Colaboradores</span>
            </a>
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
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
