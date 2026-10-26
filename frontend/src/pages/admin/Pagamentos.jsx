import { Fragment, useState } from "react";
import { PAGAMENTOS } from "../../data/admin.js";
import { UNIDADES, CONTATO } from "../../data/unidades.js";
import { Badge, CabecalhoTabela, Card, FiltroBotao, SectionTitle, clr, reais } from "../../components/admin/ui.jsx";

const MESES = ["Junho 2026", "Julho 2026", "Agosto 2026", "Setembro 2026"];

// Mensalidade de cada profissional (turnos + extras + conveniências).
// Clicar numa linha abre os detalhes; dá pra marcar como pago ou cobrar no WhatsApp.
export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState(PAGAMENTOS);
  const [filtro, setFiltro] = useState("todos"); // todos | pendentes | pagos
  const [mes, setMes] = useState("Julho 2026");
  const [filtroUnidade, setFiltroUnidade] = useState("Todas");
  const [abertoId, setAbertoId] = useState(null);

  const filtrados = pagamentos
    .filter((p) => {
      if (filtro === "pendentes" && p.pago) return false;
      if (filtro === "pagos" && !p.pago) return false;
      if (filtroUnidade !== "Todas" && p.unidade !== filtroUnidade) return false;
      return true;
    })
    .sort((a, b) => Number(a.pago) - Number(b.pago)); // pendentes primeiro

  const pendentes = pagamentos.filter((p) => !p.pago);
  const totalPendente = pendentes.reduce((s, p) => s + p.totalDevido, 0);
  const totalRecebido = pagamentos.filter((p) => p.pago).reduce((s, p) => s + p.totalDevido, 0);

  function alternarPago(id) {
    setPagamentos((lista) =>
      lista.map((p) =>
        p.id === id ? { ...p, pago: !p.pago, dataPagamento: !p.pago ? new Date().toLocaleDateString("pt-BR") : null } : p
      )
    );
  }

  function cobrarNoWhatsApp(p) {
    const texto = `Olá ${p.profissional}! Sua mensalidade de R$ ${p.totalDevido} referente a ${p.mes} (${p.sala}) está pendente. Vencimento: ${p.vencimento}. Por favor, efetue o pagamento.`;
    window.open(`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank");
  }

  const kpis = [
    { label: "Total recebido", value: `R$ ${totalRecebido.toLocaleString("pt-BR")}`, color: clr.green, icon: "✅" },
    { label: "Pendente", value: `R$ ${totalPendente.toLocaleString("pt-BR")}`, color: clr.red, icon: "⚠️" },
    { label: "Profissionais", value: String(pagamentos.length), color: clr.primary, icon: "👩‍⚕️" },
    { label: "Inadimplentes", value: String(pendentes.length), color: pendentes.length > 0 ? clr.red : clr.green, icon: "🔴" },
  ];

  const caixinha = { background: clr.card, border: `1px solid ${clr.border}` };

  return (
    <div>
      <SectionTitle title="Pagamentos de Profissionais" subtitle={`${pendentes.length} pendentes · ${mes}`} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <Card key={k.label}>
            <div className="text-xl mb-2">{k.icon}</div>
            <div className="text-xl" style={{ color: k.color }}>
              {k.value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: clr.sub }}>
              {k.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <select
          className="px-4 py-2 rounded-xl text-sm outline-none"
          style={{ background: clr.bg, border: `1px solid ${clr.border}`, color: clr.text }}
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        >
          {MESES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <FiltroBotao ativo={filtro === "todos"} onClick={() => setFiltro("todos")}>
          Todos
        </FiltroBotao>
        <FiltroBotao ativo={filtro === "pendentes"} corAtiva={clr.red} onClick={() => setFiltro("pendentes")}>
          ⚠️ Pendentes ({pendentes.length})
        </FiltroBotao>
        <FiltroBotao ativo={filtro === "pagos"} corAtiva={clr.green} onClick={() => setFiltro("pagos")}>
          ✅ Pagos
        </FiltroBotao>

        {UNIDADES.map((u) => (
          <FiltroBotao
            key={u.id}
            ativo={filtroUnidade === u.nome}
            onClick={() => setFiltroUnidade(filtroUnidade === u.nome ? "Todas" : u.nome)}
          >
            {u.nome}
          </FiltroBotao>
        ))}
      </div>

      {/* Aviso de pendências */}
      {filtro !== "pagos" && pendentes.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl mb-6" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm" style={{ color: clr.redText }}>
              {pendentes.length} profissionais com pagamento pendente
            </p>
            <p className="text-xs" style={{ color: clr.red }}>
              Total em aberto: R$ {reais(totalPendente)}
            </p>
          </div>
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <CabecalhoTabela
              colunas={["Profissional", "Especialidade", "Sala", "Turnos Fixos", "Extras", "Conveniências", "Total", "Vencimento", "Status", ""]}
            />
            <tbody>
              {filtrados.map((p) => {
                const aberto = abertoId === p.id;
                return (
                  // Fragment = agrupa as 2 linhas (principal + detalhe) sem criar elemento extra
                  <Fragment key={p.id}>
                    <tr
                      className={`transition-colors cursor-pointer ${p.pago ? "hover:bg-[#f5f7fa]" : ""}`}
                      style={{
                        borderBottom: aberto ? "none" : `1px solid ${clr.border}`,
                        background: p.pago ? undefined : "#fffbfb",
                      }}
                      onClick={() => setAbertoId(aberto ? null : p.id)}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          {!p.pago && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: clr.red }} />}
                          <span style={{ color: p.pago ? clr.text : clr.redText }}>{p.profissional}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: clr.sub }}>
                        {p.especialidade}
                      </td>
                      <td className="py-3 px-3">
                        <Badge label={p.sala} color="blue" />
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap" style={{ color: clr.sub }}>
                        {p.turnosFixos > 0 ? `R$ ${p.turnosFixos}` : "—"}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap" style={{ color: clr.sub }}>
                        {p.horasExtras > 0 ? `R$ ${p.horasExtras}` : "—"}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap" style={{ color: clr.sub }}>
                        {p.conveniencias > 0 ? `R$ ${p.conveniencias}` : "—"}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap" style={{ color: p.pago ? clr.primary : clr.redText }}>
                        R$ {p.totalDevido.toLocaleString("pt-BR")}
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: clr.sub }}>
                        {p.vencimento}
                      </td>
                      <td className="py-3 px-3">
                        <Badge label={p.pago ? `Pago ${p.dataPagamento ?? ""}` : "Pendente"} color={p.pago ? "green" : "red"} />
                      </td>
                      <td className="py-3 px-3">
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                          style={p.pago ? { background: clr.redBg, color: clr.redText } : { background: clr.greenBg, color: clr.greenText }}
                          onClick={(e) => {
                            e.stopPropagation(); // não abre/fecha a linha
                            alternarPago(p.id);
                          }}
                        >
                          {p.pago ? "Estornar" : "Marcar pago"}
                        </button>
                      </td>
                    </tr>

                    {aberto && (
                      <tr style={{ borderBottom: `1px solid ${clr.border}` }}>
                        <td colSpan={10} className="px-4 pb-4 pt-2" style={{ background: p.pago ? clr.bg : "#fff5f5" }}>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                              ["Turnos fixos", p.turnosFixos],
                              ["Horas extras", p.horasExtras],
                              ["Conveniências", p.conveniencias],
                            ].map(([label, valor]) => (
                              <div key={label} className="p-3 rounded-xl" style={caixinha}>
                                <div className="text-xs mb-1" style={{ color: clr.sub }}>
                                  {label}
                                </div>
                                <div style={{ color: clr.primary }}>R$ {valor}</div>
                              </div>
                            ))}
                            <div
                              className="p-3 rounded-xl"
                              style={{
                                background: p.pago ? "#f0fdf4" : "#fef2f2",
                                border: `1px solid ${p.pago ? "#bbf7d0" : "#fecaca"}`,
                              }}
                            >
                              <div className="text-xs mb-1" style={{ color: clr.sub }}>
                                Total a receber
                              </div>
                              <div className="text-lg" style={{ color: p.pago ? clr.green : clr.redText }}>
                                R$ {p.totalDevido}
                              </div>
                            </div>
                          </div>
                          {!p.pago && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                className="px-4 py-2 rounded-xl text-sm"
                                style={{ background: clr.greenBg, color: clr.greenText }}
                                onClick={() => alternarPago(p.id)}
                              >
                                ✓ Confirmar recebimento de R$ {p.totalDevido}
                              </button>
                              <button
                                className="px-4 py-2 rounded-xl text-sm"
                                style={{ background: clr.bg, color: clr.sub, border: `1px solid ${clr.border}` }}
                                onClick={() => cobrarNoWhatsApp(p)}
                              >
                                📲 Cobrar via WhatsApp
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
