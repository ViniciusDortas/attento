import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { clr } from "../../components/admin/ui.jsx";
import Logo from "../../components/Logo.jsx";

// Itens do menu lateral. "path" é o final da URL: /admin/salas, /admin/contas...
const NAV_ITEMS = [
  { path: "dashboard", label: "Dashboard", icon: "◉" },
  { path: "salas", label: "Salas", icon: "🏥" },
  { path: "reservas", label: "Reservas", icon: "📅" },
  { path: "extras", label: "Horas Extras", icon: "⏱️" },
  { path: "conveniencias", label: "Conveniências", icon: "☕" },
  { path: "contas", label: "Contas", icon: "📋" },
  { path: "pagamentos", label: "Pagamentos", icon: "💳" },
  { path: "relatorios", label: "Relatórios", icon: "📊" },
];

// Moldura do painel: barra lateral + barra do topo.
// O <Outlet /> é onde aparece a seção da URL atual.
export default function AdminLayout() {
  const [menuAberto, setMenuAberto] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const secaoAtual = NAV_ITEMS.find((item) => pathname.endsWith(item.path));

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: clr.bg }}>
      {/* Barra lateral */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden"
        style={{ width: menuAberto ? 240 : 64, background: clr.sidebar, borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", minHeight: 64 }}
        >
          {menuAberto && <Logo dark height={32} />}
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-auto"
            style={{ background: "rgba(255,255,255,0.08)", color: clr.sidebarText }}
            onClick={() => setMenuAberto((a) => !a)}
            aria-label={menuAberto ? "Recolher menu" : "Expandir menu"}
          >
            {menuAberto ? "←" : "→"}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            // NavLink é um link que sabe se está "ativo" (se a URL atual é a dele)
            <NavLink
              key={item.path}
              to={item.path}
              className="w-full flex items-center px-4 py-3 text-sm transition-all"
              style={({ isActive }) =>
                isActive
                  ? { background: clr.sidebarActive, color: "white", borderLeft: `3px solid ${clr.primary}` }
                  : { color: clr.sidebarText, borderLeft: "3px solid transparent" }
              }
            >
              <span className="text-base flex-shrink-0" style={{ width: 24 }}>
                {item.icon}
              </span>
              {menuAberto && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", color: clr.sidebarText }}
            onClick={() => navigate("/")}
          >
            <span className="flex-shrink-0" style={{ width: 24 }}>
              ←
            </span>
            {menuAberto && <span className="ml-3">Sair do painel</span>}
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 overflow-y-auto">
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: "rgba(245,247,250,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${clr.border}` }}
        >
          <div>
            <span className="text-sm" style={{ color: clr.text }}>
              {secaoAtual?.label}
            </span>
            <span className="text-xs ml-2" style={{ color: clr.sub }}>
              Attento Saúde Integral · Aracaju, SE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: clr.primaryLight, color: clr.primaryDark }}>
              Admin
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs" style={{ background: clr.primary }}>
              A
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
