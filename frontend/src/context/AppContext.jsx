import { createContext, useContext, useEffect, useState } from "react";

// Contexto = um "estado global": qualquer componente dentro do <AppProvider>
// consegue ler e alterar esses valores usando o hook useApp().
const AppContext = createContext(null);

// Lê o usuário salvo no navegador (pra não deslogar ao recarregar a página).
function lerUsuarioSalvo() {
  try {
    return JSON.parse(localStorage.getItem("attento-usuario"));
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  // Modo escuro ligado/desligado
  const [dark, setDark] = useState(false);

  // Usuário logado: null (ninguém) ou { role: "admin" | "usuario" }
  // ATENÇÃO: login falso! Depois o backend vai validar e-mail e senha.
  const [usuario, setUsuario] = useState(lerUsuarioSalvo);

  // Modal de login aberto/fechado + se o login veio do botão "reservar"
  const [loginAberto, setLoginAberto] = useState(false);
  const [loginParaReserva, setLoginParaReserva] = useState(false);

  // Coloca/tira a classe "dark" no <body> sempre que "dark" mudar
  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  // Salva o usuário no navegador sempre que ele mudar
  useEffect(() => {
    try {
      if (usuario) localStorage.setItem("attento-usuario", JSON.stringify(usuario));
      else localStorage.removeItem("attento-usuario");
    } catch {
      // navegador bloqueou o armazenamento: tudo bem, só não persiste
    }
  }, [usuario]);

  const valor = {
    dark,
    alternarTema: () => setDark((d) => !d),

    usuario,
    logado: usuario !== null,
    role: usuario?.role ?? "usuario",
    entrar: (role) => setUsuario({ role }),
    sair: () => setUsuario(null),

    loginAberto,
    loginParaReserva,
    abrirLogin: ({ paraReserva = false } = {}) => {
      setLoginParaReserva(paraReserva);
      setLoginAberto(true);
    },
    fecharLogin: () => setLoginAberto(false),
  };

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

// Hook pra usar o contexto: const { dark, logado } = useApp();
export function useApp() {
  return useContext(AppContext);
}
