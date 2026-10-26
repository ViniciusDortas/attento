import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext.jsx";
import { cores } from "./tema.js";
import Logo from "./Logo.jsx";
import { IconDownload, IconMoon, IconSun } from "./icons.jsx";

const LINKS = [
  { label: "Salas", href: "#salas" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Unidades", href: "#unidades" },
];

export default function Header() {
  const { dark, alternarTema, logado, role, sair, abrirLogin } = useApp();
  const navigate = useNavigate();
  const c = cores(dark);

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10"
      style={{
        height: 68,
        background: dark ? "rgba(15,17,23,0.92)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      <Logo dark={dark} />

      {/* Menu (só aparece em telas grandes) */}
      <nav className="hidden lg:flex items-center gap-8">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: c.textMain }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {/* Botão do modo escuro */}
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: c.softBg, color: c.softText }}
          onClick={alternarTema}
          aria-label="Alternar modo escuro"
        >
          {dark ? <IconSun /> : <IconMoon />}
        </button>

        {/* Botões extras do admin */}
        {logado && role === "admin" && (
          <>
            <button
              className="hidden lg:flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl transition-colors text-white bg-[#5B88C5] hover:bg-[#3d6aa8]"
              onClick={() => navigate("/admin")}
            >
              Painel Admin
            </button>
            <button
              className="hidden lg:flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl transition-colors"
              style={{ background: c.softBg, color: c.softText }}
              aria-label="Baixar relatório"
            >
              <IconDownload />
            </button>
          </>
        )}

        {logado ? (
          <div className="flex items-center gap-2">
            {role === "usuario" && (
              <button
                className="hidden text-sm px-4 py-2 rounded-xl transition-colors sm:block text-white bg-[#5B88C5] hover:bg-[#3d6aa8]"
                onClick={() => navigate("/minha-conta")}
              >
                Meus consumos
              </button>
            )}
            <span
              className="hidden lg:block text-xs px-2.5 py-1 rounded-full"
              style={{ background: "#dce8f7", color: "#3d6aa8" }}
            >
              {role === "admin" ? "Admin" : "Profissional"}
            </span>
            <button
              className="text-sm px-4 py-2 rounded-xl transition-colors"
              style={{ background: "transparent", color: c.textSub, border: `1px solid ${c.border}` }}
              onClick={sair}
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            className="text-sm px-5 py-2.5 rounded-full transition-colors text-white bg-[#5B88C5] hover:bg-[#3d6aa8]"
            onClick={() => abrirLogin()}
          >
            Entrar / Cadastrar
          </button>
        )}
      </div>
    </header>
  );
}
