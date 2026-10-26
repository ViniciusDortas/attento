import { CONTAS, CONVENIENCIAS, HORAS_EXTRAS } from "../../data/admin.js";
import { Card, SectionTitle, clr, reais } from "../../components/admin/ui.jsx";

// Resumo financeiro do mês: receitas - despesas = lucro.
export default function Relatorios() {
  const receitaTurnos = 12800; // FALSO: depois vem da soma dos turnos fixos
  const receitaExtras = HORAS_EXTRAS.reduce((s, e) => s + e.valor, 0);
  const receitaConveniencias = CONVENIENCIAS.reduce((s, c) => s + c.valor, 0);
  const totalContas = CONTAS.reduce((s, c) => s + c.valor, 0);
  const lucro = receitaTurnos + receitaExtras + receitaConveniencias - totalContas;

  const corLucro = lucro > 0 ? clr.green : clr.red;

  const linhas = [
    { label: "Receita de Turnos Fixos", valor: receitaTurnos, sinal: "+ ", cor: clr.primary },
    { label: "Horas Extras", valor: receitaExtras, sinal: "+ ", cor: clr.primary },
    { label: "Conveniências", valor: receitaConveniencias, sinal: "+ ", cor: clr.primary },
    { label: "Contas / Despesas", valor: totalContas, sinal: "− ", cor: clr.red },
    { label: "Lucro Líquido", valor: lucro, sinal: "= ", cor: corLucro, total: true },
  ];

  const cards = [
    { label: "Receita Turnos", value: receitaTurnos, color: clr.primary },
    { label: "Horas Extras", value: receitaExtras, color: clr.green },
    { label: "Conveniências", value: receitaConveniencias, color: clr.amber },
    { label: "Despesas", value: totalContas, color: clr.red },
    { label: "Lucro Líquido", value: lucro, color: corLucro },
  ];

  // FALSO: a exportação de verdade ainda precisa ser feita
  const exportar = (tipo) => alert(`Exportando relatório em ${tipo}...\n(integração real a ser configurada)`);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <SectionTitle title="Relatórios Financeiros" subtitle="Resumo mensal — Julho 2026" />
        <div className="flex gap-2 mt-1">
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-colors"
            style={{ background: clr.primaryLight, color: clr.primaryDark }}
            onClick={() => exportar("PDF")}
          >
            ↓ PDF
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-colors"
            style={{ background: clr.greenBg, color: clr.greenText }}
            onClick={() => exportar("Excel")}
          >
            ↓ Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((k) => (
          <Card key={k.label}>
            <div className="text-xs mb-2" style={{ color: clr.sub }}>
              {k.label}
            </div>
            <div className="text-xl" style={{ color: k.color }}>
              R$ {reais(k.value)}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-sm mb-4" style={{ color: clr.text }}>
          Demonstrativo financeiro
        </h3>
        <table className="w-full text-sm">
          <tbody>
            {linhas.map((l, i) => (
              <tr
                key={l.label}
                style={{
                  borderBottom: i < linhas.length - 1 ? `1px solid ${clr.border}` : "none",
                  background: l.total ? clr.bg : "transparent",
                }}
              >
                <td className="py-3 px-3" style={{ color: l.total ? clr.text : clr.sub }}>
                  {l.label}
                </td>
                <td className="py-3 px-3 text-right" style={{ color: l.cor }}>
                  {l.sinal}R$ {reais(l.valor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
