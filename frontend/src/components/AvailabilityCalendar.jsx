import { useState } from "react";
import { DIAS, TURNOS } from "../data/salas.js";
import { PROFISSIONAIS } from "../data/admin.js";
import { IconChevronLeft, IconChevronRight } from "./icons.jsx";

// Gera uma ocupação FALSA pra uma sala numa semana.
// É "pseudo-aleatória": a mesma sala + mesma semana sempre dá o mesmo resultado.
// Depois isso vai ser substituído pelas reservas reais vindas do backend.
function ocupacaoFalsa(salaId, semana) {
  let semente = salaId * 9301 + semana * 49297 + 233280;
  const aleatorio = () => {
    semente = (semente * 9301 + 49297) % 233280;
    return semente / 233280;
  };

  const ocupacao = {};
  DIAS.forEach((dia) => {
    ocupacao[dia] = {};
    TURNOS.forEach((turno) => {
      const ocupado = aleatorio() < 0.35;
      ocupacao[dia][turno] = ocupado
        ? PROFISSIONAIS[Math.floor(aleatorio() * PROFISSIONAIS.length)]
        : null;
    });
  });
  return ocupacao;
}

// Datas (segunda a sábado) da semana atual + "semana" semanas pra frente/trás
function datasDaSemana(semana) {
  const hoje = new Date();
  const diaDaSemana = hoje.getDay(); // 0 = domingo
  const segunda = new Date(hoje);
  segunda.setDate(hoje.getDate() - (diaDaSemana === 0 ? 6 : diaDaSemana - 1) + semana * 7);
  return DIAS.map((_, i) => {
    const d = new Date(segunda);
    d.setDate(segunda.getDate() + i);
    return d;
  });
}

// Grade de disponibilidade (dias x turnos).
// "selecionados" e "onToggle" vêm do componente pai (RoomModal), que precisa
// saber o que foi escolhido pra calcular o total.
export default function AvailabilityCalendar({ sala, dark, role, logado, selecionados, onToggle }) {
  const [semana, setSemana] = useState(0);

  const ocupacao = ocupacaoFalsa(sala.id, semana);
  const datas = datasDaSemana(semana);
  const mes = datas[0].toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  return (
    <div>
      {/* Navegação entre semanas */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base" style={{ color: dark ? "#f0f4f8" : "#1a1a1a" }}>
          Disponibilidade
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm inline-block first-letter:uppercase" style={{ color: dark ? "#8a9ab5" : "#666" }}>
            {mes}
          </span>
          <div className="flex gap-1">
            {[
              { delta: -1, icone: <IconChevronLeft />, label: "Semana anterior" },
              { delta: 1, icone: <IconChevronRight />, label: "Próxima semana" },
            ].map((b) => (
              <button
                key={b.delta}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: dark ? "#2a3347" : "#f5f7fa", color: dark ? "#a8c4e8" : "#333" }}
                onClick={() => setSemana((s) => s + b.delta)}
                aria-label={b.label}
              >
                {b.icone}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grade */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="w-20 pb-3 text-left text-xs" style={{ color: dark ? "#8a9ab5" : "#999" }}>
                Turno
              </th>
              {DIAS.map((dia, i) => (
                <th key={dia} className="pb-3 text-center" style={{ color: dark ? "#c8d8ed" : "#333" }}>
                  <div className="text-xs">{dia}</div>
                  <div className="text-xs" style={{ color: dark ? "#8a9ab5" : "#999" }}>
                    {datas[i].getDate()}/{datas[i].getMonth() + 1}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TURNOS.map((turno) => (
              <tr key={turno}>
                <td className="py-2 pr-3 text-xs" style={{ color: dark ? "#8a9ab5" : "#555" }}>
                  <div>{turno}</div>
                  <div style={{ color: dark ? "#5a7a9e" : "#aaa", fontSize: 10 }}>R$ {sala.precos[turno]}</div>
                </td>
                {DIAS.map((dia, i) => {
                  const ocupante = ocupacao[dia][turno];
                  const data = datas[i];
                  const chave = `${data.toISOString().slice(0, 10)}|${turno}`;
                  const selecionado = selecionados.some((s) => s.chave === chave);

                  let estilo;
                  if (selecionado) estilo = { background: "#5B88C5", color: "white" };
                  else if (ocupante) estilo = { background: dark ? "#1e2533" : "#f0f0f0", color: dark ? "#4a5568" : "#bbb", cursor: "not-allowed" };
                  else estilo = { background: dark ? "#2a3347" : "#eef4fc", color: dark ? "#a8c4e8" : "#3d6aa8", cursor: "pointer" };

                  // O que aparece num horário ocupado depende de quem está vendo:
                  // admin vê o nome, profissional vê o nome borrado, visitante vê "Ocupado".
                  let textoOcupado = "Ocupado";
                  if (logado && role === "admin") textoOcupado = ocupante?.split(" ")[0];
                  if (logado && role === "usuario") textoOcupado = <span className="blur-[2px]">{ocupante?.split(" ")[0]}</span>;

                  return (
                    <td key={dia} className="px-1 py-1.5 text-center">
                      <button
                        className="w-full rounded-xl py-2.5 text-xs transition-all"
                        style={estilo}
                        disabled={Boolean(ocupante)}
                        onClick={() =>
                          onToggle({
                            chave,
                            dia,
                            data: `${data.getDate()}/${data.getMonth() + 1}`,
                            turno,
                            preco: sala.precos[turno],
                          })
                        }
                      >
                        {ocupante ? textoOcupado : selecionado ? "✓" : "Livre"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legenda */}
      <div className="flex gap-4 mt-4 text-xs" style={{ color: dark ? "#8a9ab5" : "#888" }}>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: dark ? "#2a3347" : "#eef4fc" }} />
          Disponível
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: "#5B88C5" }} />
          Selecionado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: dark ? "#1e2533" : "#f0f0f0" }} />
          Ocupado
        </span>
      </div>
    </div>
  );
}
