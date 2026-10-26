import { useState } from "react";
import { CONVENIENCIAS, TIPOS_CONVENIENCIA } from "../../data/admin.js";
import { Badge, CabecalhoTabela, Card, FiltroBotao, SectionTitle, clr } from "../../components/admin/ui.jsx";

const COR_DO_ITEM = { "Cápsula de Café": "blue", Cappuccino: "amber", Biscoito: "green" };

// Consumo de conveniências (café, biscoito...) por profissional.
export default function Conveniencias() {
  const [filtro, setFiltro] = useState("Todos");

  const filtradas = CONVENIENCIAS.filter((c) => filtro === "Todos" || c.item === filtro);
  const total = filtradas.reduce((s, c) => s + c.valor, 0);

  // Soma o valor por profissional: { "Ana Souza": 14, "Bruna Lima": 32, ... }
  const porProfissional = {};
  filtradas.forEach((c) => {
    porProfissional[c.profissional] = (porProfissional[c.profissional] ?? 0) + c.valor;
  });
  const ranking = Object.entries(porProfissional).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <SectionTitle title="Conveniências" subtitle="Consumo por profissional — cobrança mensal" />

      <div className="flex flex-wrap gap-2 mb-6">
        {["Todos", ...TIPOS_CONVENIENCIA].map((item) => (
          <FiltroBotao key={item} ativo={filtro === item} onClick={() => setFiltro(item)}>
            {item}
          </FiltroBotao>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {ranking.map(([profissional, valor]) => (
          <Card key={profissional}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm" style={{ color: clr.text }}>
                  {profissional}
                </div>
                <div className="text-xs mt-0.5" style={{ color: clr.sub }}>
                  {filtradas.filter((c) => c.profissional === profissional).length} consumos
                </div>
              </div>
              <div className="text-lg" style={{ color: clr.primary }}>
                R$ {valor}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <CabecalhoTabela colunas={["Item", "Profissional", "Qtd", "Data", "Valor"]} />
            <tbody>
              {filtradas.map((c) => (
                <tr key={c.id} style={{ borderBottom: `1px solid ${clr.border}` }}>
                  <td className="py-3 px-3">
                    <Badge label={c.item} color={COR_DO_ITEM[c.item]} />
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.text }}>
                    {c.profissional}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.sub }}>
                    {c.quantidade}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.sub }}>
                    {c.data}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.primary }}>
                    R$ {c.valor}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="py-3 px-3 text-right text-sm" style={{ color: clr.text }}>
                  Total
                </td>
                <td className="py-3 px-3" style={{ color: clr.primary }}>
                  R$ {total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
