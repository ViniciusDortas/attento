import { SALAS } from "../../data/salas.js";
import { CONTAS, HORAS_EXTRAS, TURNOS_FIXOS } from "../../data/admin.js";
import { Card, SectionTitle, clr } from "../../components/admin/ui.jsx";

// Visão geral do mês. Os números são calculados a partir dos dados falsos.
export default function Dashboard() {
  const salasOcupadasHoje = 3; // FALSO: depois vem do backend
  const receitaMes = HORAS_EXTRAS.reduce((s, e) => s + e.valor, 0) + 12800;
  const contasPendentes = CONTAS.filter((c) => !c.pago).length;

  const kpis = [
    { label: "Salas ocupadas hoje", value: `${salasOcupadasHoje}/${SALAS.length}`, sub: "2 unidades", color: clr.primary, icon: "🏥" },
    { label: "Receita do mês", value: `R$ ${receitaMes.toLocaleString("pt-BR")}`, sub: "Julho 2026", color: clr.green, icon: "💰" },
    { label: "Horas extras", value: String(HORAS_EXTRAS.length), sub: "registros em julho", color: clr.amber, icon: "⏱️" },
    {
      label: "Contas a vencer",
      value: contasPendentes === 0 ? "Tudo pago" : `${contasPendentes} pendentes`,
      sub: "este mês",
      color: contasPendentes === 0 ? clr.green : clr.red,
      icon: "📋",
    },
  ];

  return (
    <div>
      <SectionTitle title="Dashboard" subtitle="Visão geral — Julho 2026" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <Card key={k.label}>
            <div className="text-2xl mb-3">{k.icon}</div>
            <div className="text-2xl mb-1" style={{ color: k.color }}>
              {k.value}
            </div>
            <div className="text-xs" style={{ color: clr.text }}>
              {k.label}
            </div>
            <div className="text-xs" style={{ color: clr.sub }}>
              {k.sub}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm mb-4" style={{ color: clr.text }}>
            Ocupação atual por sala
          </h3>
          {SALAS.map((sala) => {
            // % de dias da semana que têm pelo menos um turno ocupado
            const dias = Object.values(TURNOS_FIXOS[sala.nome] ?? {});
            const diasOcupados = dias.filter((turnos) => Object.values(turnos).some((v) => v)).length;
            const pct = Math.round((diasOcupados / 6) * 100);
            return (
              <div key={sala.id} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: clr.text }}>{sala.nome}</span>
                  <span style={{ color: clr.sub }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: clr.bg }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: clr.primary }} />
                </div>
              </div>
            );
          })}
        </Card>

        <Card>
          <h3 className="text-sm mb-4" style={{ color: clr.text }}>
            Últimas horas extras
          </h3>
          <div className="space-y-2">
            {HORAS_EXTRAS.slice(0, 6).map((e) => (
              <div key={e.id} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${clr.border}` }}>
                <div>
                  <span className="text-sm" style={{ color: clr.text }}>
                    {e.profissional}
                  </span>
                  <span className="text-xs ml-2" style={{ color: clr.sub }}>
                    {e.sala} · {e.data}
                  </span>
                </div>
                <span className="text-sm" style={{ color: clr.primary }}>
                  R$ {e.valor}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
