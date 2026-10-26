import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext.jsx";
import { cores } from "./tema.js";
import Logo from "./Logo.jsx";
import { IconClose } from "./icons.jsx";

// Janela de login. ATENÇÃO: o login é FALSO — qualquer e-mail/senha entra.
// Quando o backend existir, o botão "Entrar" vai mandar e-mail e senha pra ele validar.
export default function LoginModal() {
  const { dark, entrar, fecharLogin, loginParaReserva } = useApp();
  const navigate = useNavigate();
  const [papel, setPapel] = useState("usuario"); // aba escolhida: profissional ou admin
  const c = cores(dark);

  function fazerLogin() {
    entrar(papel);
    fecharLogin();
    // Profissional vai pra área dele, a não ser que estivesse no meio de uma reserva
    if (papel === "usuario" && !loginParaReserva) navigate("/minha-conta");
  }

  const estiloInput = {
    background: dark ? "#2a3347" : "#f5f7fa",
    border: `1px solid ${c.border}`,
    color: c.textMain,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && fecharLogin()}
    >
      <div className="w-full max-w-sm rounded-3xl p-8" style={{ background: dark ? "#1e2533" : "white" }}>
        <div className="flex items-center justify-between mb-6">
          <Logo dark={dark} height={36} />
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: c.softBg, color: c.textSub }}
            onClick={fecharLogin}
            aria-label="Fechar"
          >
            <IconClose />
          </button>
        </div>

        <h2 className="text-lg mb-1" style={{ color: c.textMain }}>
          Bem-vindo de volta
        </h2>
        <p className="text-sm mb-6" style={{ color: c.textSub }}>
          Acesse sua conta para gerenciar reservas
        </p>

        {/* Abas: Profissional / Admin */}
        <div className="flex gap-2 mb-5 p-1 rounded-xl" style={{ background: dark ? "#2a3347" : "#f5f7fa" }}>
          {["usuario", "admin"].map((r) => (
            <button
              key={r}
              className="flex-1 py-2.5 rounded-lg text-sm transition-all"
              style={papel === r ? { background: "#5B88C5", color: "white" } : { background: "transparent", color: c.textSub }}
              onClick={() => setPapel(r)}
            >
              {r === "admin" ? "Admin" : "Profissional"}
            </button>
          ))}
        </div>

        <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3.5 rounded-xl text-sm mb-3 outline-none" style={estiloInput} />
        <input type="password" placeholder="Senha" className="w-full px-4 py-3.5 rounded-xl text-sm mb-5 outline-none" style={estiloInput} />

        <button className="w-full py-3.5 rounded-xl text-sm transition-colors text-white bg-[#5B88C5] hover:bg-[#3d6aa8]" onClick={fazerLogin}>
          Entrar
        </button>

        <p className="text-xs text-center mt-4" style={{ color: c.textSub }}>
          Não tem conta?{" "}
          <button
            type="button"
            className="cursor-pointer"
            style={{ color: "#5B88C5" }}
            onClick={() => {
              fecharLogin();
              navigate("/cadastro");
            }}
          >
            Cadastre-se grátis
          </button>
        </p>
      </div>
    </div>
  );
}
