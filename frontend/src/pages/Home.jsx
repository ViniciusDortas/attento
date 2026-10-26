import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { SALAS } from "../data/salas.js";
import { UNIDADES } from "../data/unidades.js";
import { cores } from "../components/tema.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import RoomCard from "../components/RoomCard.jsx";
import RoomModal from "../components/RoomModal.jsx";
import { IconSearch } from "../components/icons.jsx";

const PASSOS = [
  { passo: 1, icone: "🏢", titulo: "Escolha a sala", texto: "Navegue pelo catálogo e encontre o consultório ideal para sua especialidade." },
  { passo: 2, icone: "📅", titulo: "Veja os horários", texto: "Consulte a disponibilidade em tempo real por turno ou hora avulsa." },
  { passo: 3, icone: "✅", titulo: "Reserve", texto: "Confirme sua reserva diretamente pelo site ou, se preferir, solicite pelo WhatsApp." },
  { passo: 4, icone: "🩺", titulo: "Atenda seus pacientes", texto: "Chegue e encontre tudo pronto: equipado, climatizado e higienizado." },
];

export default function Home() {
  const { dark } = useApp();
  const c = cores(dark);

  const [salaAberta, setSalaAberta] = useState(null); // sala do modal (null = fechado)
  const [filtroUnidade, setFiltroUnidade] = useState("todas");

  // Campos da barra de busca (ainda não filtram nada — só guardam o valor)
  const [buscaUnidade, setBuscaUnidade] = useState("");
  const [buscaData, setBuscaData] = useState("");
  const [buscaTurno, setBuscaTurno] = useState("");

  const salasFiltradas = SALAS.filter((s) => filtroUnidade === "todas" || s.unidade === filtroUnidade);

  const estiloCampoBusca = (valor) => ({
    color: valor ? c.textMain : c.textSub,
    borderRight: `1px solid ${c.border}`,
  });

  return (
    <div style={{ background: c.bg, color: c.textMain, minHeight: "100vh" }}>
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative px-6 lg:px-10 pt-20 pb-24"
        style={{
          background: dark
            ? "linear-gradient(160deg, #0f1117 0%, #162035 100%)"
            : "linear-gradient(160deg, #f0f6ff 0%, #ffffff 60%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6"
            style={{ background: "#dce8f7", color: "#3d6aa8" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#5B88C5" }} />
            Plataforma de aluguel para profissionais de saúde
          </div>

          <h1 className="text-4xl lg:text-5xl leading-tight mb-5" style={{ color: c.textMain, letterSpacing: "-0.02em" }}>
            Encontre o consultório ideal para <span style={{ color: "#5B88C5" }}>atender seus pacientes</span>
          </h1>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: c.textSub }}>
            Alugue salas por hora, turno ou dia integral, em unidades equipadas e prontas para uso.
          </p>

          {/* Barra de busca */}
          <div
            className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden mx-auto max-w-2xl"
            style={{
              background: dark ? "#1e2533" : "white",
              boxShadow: dark ? "0 8px 40px rgba(0,0,0,0.5)" : "0 8px 40px rgba(91,136,197,0.18)",
              border: `1px solid ${c.border}`,
            }}
          >
            <select
              className="flex-1 px-5 py-4 text-sm bg-transparent outline-none border-0"
              style={estiloCampoBusca(buscaUnidade)}
              value={buscaUnidade}
              onChange={(e) => setBuscaUnidade(e.target.value)}
            >
              <option value="">Unidade</option>
              {UNIDADES.map((u) => (
                <option key={u.id}>{u.nome}</option>
              ))}
            </select>
            <input
              type="date"
              className="flex-1 px-5 py-4 text-sm bg-transparent outline-none border-0"
              style={estiloCampoBusca(buscaData)}
              value={buscaData}
              onChange={(e) => setBuscaData(e.target.value)}
            />
            <select
              className="flex-1 px-5 py-4 text-sm bg-transparent outline-none border-0"
              style={estiloCampoBusca(buscaTurno)}
              value={buscaTurno}
              onChange={(e) => setBuscaTurno(e.target.value)}
            >
              <option value="">Turno</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
              <option>Hora avulsa</option>
            </select>
            <button className="px-6 py-4 text-sm flex items-center justify-center gap-2 transition-colors text-white bg-[#5B88C5] hover:bg-[#3d6aa8]">
              <IconSearch />
              <span className="hidden lg:inline">Buscar</span>
            </button>
          </div>
        </div>

        {/* Círculos desfocados decorativos */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "#5B88C5", filter: "blur(80px)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
          style={{ background: "#5B88C5", filter: "blur(60px)", transform: "translate(-40%, 40%)" }}
        />
      </section>

      {/* ── Unidades ── */}
      <section id="unidades" className="px-6 lg:px-10 py-20" style={{ background: c.sectionBg }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl mb-2" style={{ color: c.textMain }}>
            Nossas Unidades
          </h2>
          <p className="text-sm mb-8" style={{ color: c.textSub }}>
            Escolha a unidade mais conveniente para você e seus pacientes
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {UNIDADES.map((u) => {
              const qtdSalas = SALAS.filter((s) => s.unidade === u.nome).length;
              const filtrando = filtroUnidade === u.nome;
              return (
                <button
                  key={u.id}
                  className="relative rounded-2xl overflow-hidden text-left transition-transform hover:-translate-y-1 group"
                  style={{ height: 240 }}
                  // Clicar filtra as salas por essa unidade; clicar de novo tira o filtro
                  onClick={() => setFiltroUnidade(filtrando ? "todas" : u.nome)}
                >
                  <img
                    src={u.imagem}
                    alt={u.nome}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl text-white mb-1">{u.nome}</h3>
                    <p className="text-sm text-white/75">{u.endereco}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(4px)" }}
                      >
                        {qtdSalas} salas disponíveis
                      </span>
                      {filtrando && (
                        <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#5B88C5", color: "white" }}>
                          Filtrando
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Salas ── */}
      <section id="salas" className="px-6 lg:px-10 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl mb-1" style={{ color: c.textMain }}>
                {filtroUnidade === "todas" ? "Todas as salas" : filtroUnidade}
              </h2>
              <p className="text-sm" style={{ color: c.textSub }}>
                {salasFiltradas.length} consultórios disponíveis
              </p>
            </div>

            {filtroUnidade !== "todas" && (
              <button
                className="text-sm px-4 py-2 rounded-xl transition-colors"
                style={{ background: c.softBg, color: c.softText }}
                onClick={() => setFiltroUnidade("todas")}
              >
                Ver todas
              </button>
            )}
          </div>

          {/* .map() = "pra cada sala da lista, desenhe um RoomCard" */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salasFiltradas.map((sala) => (
              <RoomCard key={sala.id} sala={sala} dark={dark} onSelect={setSalaAberta} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" className="px-6 lg:px-10 py-20" style={{ background: c.sectionBg }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl mb-2" style={{ color: c.textMain }}>
              Como funciona
            </h2>
            <p className="text-sm" style={{ color: c.textSub }}>
              Reserve seu consultório em 4 passos simples
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PASSOS.map((p) => (
              <div
                key={p.passo}
                className="relative rounded-2xl p-6 text-center"
                style={{ background: c.cardBg, border: `1px solid ${c.border}` }}
              >
                <div
                  className="w-8 h-8 rounded-full text-sm flex items-center justify-center mx-auto mb-3 absolute top-4 right-4"
                  style={{ background: "#dce8f7", color: "#5B88C5" }}
                >
                  {p.passo}
                </div>
                <div className="text-3xl mb-3 mt-2">{p.icone}</div>
                <h3 className="text-sm mb-2" style={{ color: c.textMain }}>
                  {p.titulo}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: c.textSub }}>
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal da sala: só aparece quando "salaAberta" não é null */}
      {salaAberta && <RoomModal sala={salaAberta} onClose={() => setSalaAberta(null)} />}
    </div>
  );
}
