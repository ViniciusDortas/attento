import { Navigate, Route, Routes } from "react-router";
import { useApp } from "./context/AppContext.jsx";
import LoginModal from "./components/LoginModal.jsx";
import Home from "./pages/Home.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import MinhaConta from "./pages/MinhaConta.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import GestaoSalas from "./pages/admin/GestaoSalas.jsx";
import GradeReservas from "./pages/admin/GradeReservas.jsx";
import HorasExtras from "./pages/admin/HorasExtras.jsx";
import Conveniencias from "./pages/admin/Conveniencias.jsx";
import ContasMensais from "./pages/admin/ContasMensais.jsx";
import Pagamentos from "./pages/admin/Pagamentos.jsx";
import Relatorios from "./pages/admin/Relatorios.jsx";

// Só deixa entrar quem está logado com o papel certo. Se não, volta pra home.
function RotaProtegida({ role, children }) {
  const app = useApp();
  if (!app.logado || app.role !== role) return <Navigate to="/" replace />;
  return children;
}

// Mapa de rotas: cada URL mostra uma página.
export default function App() {
  const { loginAberto } = useApp();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/minha-conta"
          element={
            <RotaProtegida role="usuario">
              <MinhaConta />
            </RotaProtegida>
          }
        />

        {/* Painel admin: o AdminLayout tem a barra lateral, e o <Outlet />
            dentro dele mostra a seção da rota filha (dashboard, salas, ...) */}
        <Route
          path="/admin"
          element={
            <RotaProtegida role="admin">
              <AdminLayout />
            </RotaProtegida>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="salas" element={<GestaoSalas />} />
          <Route path="reservas" element={<GradeReservas />} />
          <Route path="extras" element={<HorasExtras />} />
          <Route path="conveniencias" element={<Conveniencias />} />
          <Route path="contas" element={<ContasMensais />} />
          <Route path="pagamentos" element={<Pagamentos />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>

        {/* Qualquer outra URL volta pra home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* O modal de login fica fora das rotas porque pode abrir de qualquer página */}
      {loginAberto && <LoginModal />}
    </>
  );
}
