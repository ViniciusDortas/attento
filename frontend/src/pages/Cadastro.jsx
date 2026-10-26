import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext.jsx";
import Logo from "../components/Logo.jsx";
import { IconChevronDown, IconEye } from "../components/icons.jsx";

const ESPECIALIDADES = ["Medicina", "Psicologia", "Nutrição", "Fisioterapia", "Fonoaudiologia", "Outra especialidade"];

// Classes repetidas dos campos do formulário
const CLASSE_INPUT =
  "h-13 w-full rounded-xl border border-[#dfe5ed] bg-white px-4 text-sm text-[#172033] outline-none transition placeholder:text-[#9aa4b2] hover:border-[#b9c9dc] focus:border-[#5B88C5] focus:ring-4 focus:ring-[#5B88C5]/10";

// Um campo com rótulo em cima
function Campo({ rotulo, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#344054]">{rotulo}</span>
      {children}
    </label>
  );
}

// Página de cadastro do profissional. ATENÇÃO: cadastro FALSO —
// depois o formulário vai ser enviado pro backend salvar no banco.
export default function Cadastro() {
  const { entrar, abrirLogin, loginParaReserva } = useApp();
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function irParaLogin() {
    navigate("/");
    abrirLogin();
  }

  function criarConta(evento) {
    evento.preventDefault(); // impede o navegador de recarregar a página
    entrar("usuario");
    navigate(loginParaReserva ? "/" : "/minha-conta");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faff] px-5 py-8 text-[#172033] sm:py-12">
      <div aria-hidden="true" className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#dce8f7]/70 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#e8f1fc] blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="self-start rounded-xl p-1 transition-opacity hover:opacity-75"
          aria-label="Voltar para o início"
        >
          <Logo height={46} />
        </button>

        <div className="flex flex-1 items-center justify-center py-8">
          <section className="w-full max-w-lg rounded-[2rem] border border-white bg-white/95 p-6 shadow-[0_24px_70px_rgba(55,95,150,0.14)] backdrop-blur sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4fd] text-[#5B88C5]">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M19 8v6M16 11h6" />
                </svg>
              </div>
              <h1 className="text-2xl tracking-[-0.02em] text-[#172033] sm:text-3xl">Crie sua conta profissional</h1>
              <p className="mt-2 text-sm leading-relaxed text-[#697386]">
                Preencha seus dados para começar a reservar consultórios.
              </p>
            </div>

            <form className="space-y-5" onSubmit={criarConta}>
              <Campo rotulo="Nome completo">
                <input type="text" name="nome" autoComplete="name" required placeholder="Digite seu nome completo" className={CLASSE_INPUT} />
              </Campo>

              <Campo rotulo="E-mail">
                <input type="email" name="email" autoComplete="email" required placeholder="voce@exemplo.com" className={CLASSE_INPUT} />
              </Campo>

              <Campo rotulo="Especialidade">
                <span className="relative block">
                  <select name="especialidade" required defaultValue="" className={`${CLASSE_INPUT} appearance-none pr-11 invalid:text-[#9aa4b2]`}>
                    <option value="" disabled>
                      Selecione sua especialidade
                    </option>
                    {ESPECIALIDADES.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#5B88C5]">
                    <IconChevronDown />
                  </span>
                </span>
              </Campo>

              <Campo rotulo="Número do registro">
                <input type="text" name="registro" required placeholder="Ex.: CRM/SE 12345" className={CLASSE_INPUT} />
              </Campo>

              <Campo rotulo="Crie uma senha">
                <span className="relative block">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    name="senha"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="Mínimo de 8 caracteres"
                    className={`${CLASSE_INPUT} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha((v) => !v)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#7b8798] transition hover:bg-[#f1f5fa] hover:text-[#5B88C5]"
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <IconEye open={mostrarSenha} />
                  </button>
                </span>
              </Campo>

              <button
                type="submit"
                className="mt-2 h-13 w-full rounded-xl bg-[#5B88C5] text-sm text-white shadow-[0_10px_24px_rgba(91,136,197,0.28)] transition hover:-translate-y-0.5 hover:bg-[#4d79b5] hover:shadow-[0_14px_28px_rgba(91,136,197,0.32)] active:translate-y-0"
              >
                Criar Conta
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#697386]">
              Já tem conta?{" "}
              <button type="button" onClick={irParaLogin} className="text-[#5B88C5] transition hover:text-[#3d6aa8] hover:underline">
                Fazer login
              </button>
            </p>
          </section>
        </div>

        <p className="text-center text-xs text-[#8a96a8]">© 2026 Attento Saúde Integral</p>
      </div>
    </main>
  );
}
