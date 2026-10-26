import { useState } from "react";
import { CONTAS } from "../../data/admin.js";
import { UNIDADES } from "../../data/unidades.js";
import { Badge, CabecalhoTabela, Card, FiltroBotao, SectionTitle, clr, reais } from "../../components/admin/ui.jsx";

const MESES = ["Junho 2026", "Julho 2026", "Agosto 2026", "Setembro 2026"];

// Contas fixas de cada unidade (energia, água, internet...).
// Clicar no selo "Pago/Pendente" alterna o status.
export default function ContasMensais() {
  const [contas, setContas] = useState(CONTAS);
  const [filtroUnidade, setFiltroUnidade] = useState("Todas");
  const [mes, setMes] = useState("Julho 2026"); // ainda não filtra: só existem dados de julho

  const filtradas = contas.filter((c) => filtroUnidade === "Todas" || c.unidade === filtroUnidade);
  const totalPago = filtradas.filter((c) => c.pago).reduce((s, c) => s + c.valor, 0);
  const totalPendente = filtradas.filter((c) => !c.pago).reduce((s, c) => s + c.valor, 0);

  function alternarPago(id) {
    setContas((lista) => lista.map((c) => (c.id === id ? { ...c, pago: !c.pago } : c)));
  }

  return (
    <div>
      <SectionTitle title="Contas Mensais" subtitle="Despesas fixas por unidade" />

      <div className="flex flex-wrap gap-3 mb-6">
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

        {["Todas", ...UNIDADES.map((u) => u.nome)].map((u) => (
          <FiltroBotao key={u} ativo={filtroUnidade === u} onClick={() => setFiltroUnidade(u)}>
            {u}
          </FiltroBotao>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="text-xs mb-1" style={{ color: clr.sub }}>
            Total pago
          </div>
          <div className="text-2xl" style={{ color: clr.green }}>
            R$ {reais(totalPago)}
          </div>
        </Card>
        <Card>
          <div className="text-xs mb-1" style={{ color: clr.sub }}>
            Pendente
          </div>
          <div className="text-2xl" style={{ color: totalPendente > 0 ? clr.red : clr.green }}>
            {totalPendente > 0 ? `R$ ${reais(totalPendente)}` : "Tudo pago ✓"}
          </div>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <CabecalhoTabela colunas={["Unidade", "Descrição", "Referência", "Valor", "Vencimento", "Status"]} />
            <tbody>
              {filtradas.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-[#f5f7fa]" style={{ borderBottom: `1px solid ${clr.border}` }}>
                  <td className="py-3 px-3">
                    <Badge label={c.unidade === "Jardim Europa" ? "Europa" : "Horizonte"} color="blue" />
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.text }}>
                    {c.descricao}
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: clr.sub }}>
                    {c.referencia || "—"}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap" style={{ color: clr.text }}>
                    R$ {reais(c.valor)}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.sub }}>
                    {c.vencimento}
                  </td>
                  <td className="py-3 px-3">
                    <button onClick={() => alternarPago(c.id)} title="Clique para alterar">
                      <Badge label={c.pago ? "Pago" : "Pendente"} color={c.pago ? "green" : "red"} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
