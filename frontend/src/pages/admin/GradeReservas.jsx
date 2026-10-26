import { useState } from "react";
import { SALAS, DIAS_SEMANA, TURNOS } from "../../data/salas.js";
import { PROFISSIONAIS, TURNOS_FIXOS } from "../../data/admin.js";
import { Card, FiltroBotao, SectionTitle, clr } from "../../components/admin/ui.jsx";

const MANUTENCAO = "🔧 Manutenção";

// Grade semanal de turnos fixos de cada sala. Clicar numa célula abre
// uma janelinha pra liberar, marcar manutenção ou (re)alocar um profissional.
export default function GradeReservas() {
  const [salaSelecionada, setSalaSelecionada] = useState(SALAS[0].nome);
  const [grades, setGrades] = useState(TURNOS_FIXOS);
  const [celula, setCelula] = useState(null); // { dia, turno, atual } ou null

  const grade = grades[salaSelecionada];

  // Troca o valor de UMA célula sem alterar o objeto antigo
  // (no React, o estado deve ser trocado por um objeto novo, nunca modificado direto).
  function definirCelula(valor) {
    const { dia, turno } = celula;
    setGrades((atual) => ({
      ...atual,
      [salaSelecionada]: {
        ...atual[salaSelecionada],
        [dia]: { ...atual[salaSelecionada][dia], [turno]: valor },
      },
    }));
    setCelula(null);
  }

  return (
    <div>
      <SectionTitle title="Grade de Reservas" subtitle="Turnos fixos semanais — Setembro 2026" />

      <div className="flex flex-wrap gap-2 mb-6">
        {SALAS.map((s) => (
          <FiltroBotao key={s.id} ativo={salaSelecionada === s.nome} onClick={() => setSalaSelecionada(s.nome)}>
            {s.nome}
          </FiltroBotao>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 pr-4 text-xs w-20" style={{ color: clr.sub }}>
                  Turno
                </th>
                {DIAS_SEMANA.map((dia) => (
                  <th key={dia} className="text-center py-3 px-2 text-xs" style={{ color: clr.text }}>
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TURNOS.map((turno) => (
                <tr key={turno}>
                  <td className="py-2 pr-4">
                    <span className="text-xs" style={{ color: clr.sub }}>
                      {turno}
                    </span>
                  </td>
                  {DIAS_SEMANA.map((dia) => {
                    const valor = grade[dia][turno];
                    const manutencao = valor === MANUTENCAO;
                    const vazio = !valor;
                    return (
                      <td key={dia} className="px-1 py-1.5">
                        <button
                          className="w-full rounded-xl py-2.5 px-2 text-xs transition-all hover:opacity-80"
                          style={
                            manutencao
                              ? { background: clr.amberBg, color: clr.amberText }
                              : vazio
                              ? { background: clr.bg, color: "#bbb", border: `1px dashed ${clr.border}` }
                              : { background: clr.primaryLight, color: clr.primaryDark }
                          }
                          onClick={() => setCelula({ dia, turno, atual: valor })}
                        >
                          {vazio ? "+" : valor}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 mt-4 text-xs" style={{ color: clr.sub }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: clr.primaryLight }} />
            Alocado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border" style={{ borderColor: clr.border }} />
            Disponível
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: clr.amberBg }} />
            Manutenção
          </span>
        </div>
      </Card>

      {/* Janelinha de ação da célula */}
      {celula && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setCelula(null)}
        >
          <div
            className="rounded-2xl p-6 w-80 max-h-[85vh] overflow-y-auto"
            style={{ background: clr.card }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-1" style={{ color: clr.text }}>
              {celula.dia} — {celula.turno}
            </h3>
            <p className="text-sm mb-4" style={{ color: clr.sub }}>
              {celula.atual ? `Atual: ${celula.atual}` : "Horário livre"}
            </p>

            {celula.atual && (
              <>
                <button
                  className="w-full py-2.5 rounded-xl text-sm mb-2 transition-colors"
                  style={{ background: clr.redBg, color: clr.redText }}
                  onClick={() => definirCelula("")}
                >
                  Liberar horário
                </button>
                <button
                  className="w-full py-2.5 rounded-xl text-sm mb-2 transition-colors"
                  style={{ background: clr.amberBg, color: clr.amberText }}
                  onClick={() => definirCelula(MANUTENCAO)}
                >
                  Marcar como manutenção
                </button>
              </>
            )}

            <div className="mt-2">
              <p className="text-xs mb-2" style={{ color: clr.sub }}>
                {celula.atual ? "Realocar para:" : "Atribuir profissional:"}
              </p>
              {PROFISSIONAIS.map((p) => (
                <button
                  key={p}
                  className="w-full py-2 rounded-xl text-sm mb-1 text-left px-3 transition-colors bg-[#f5f7fa] hover:bg-[#dce8f7]"
                  style={{ color: clr.text }}
                  onClick={() => definirCelula(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
