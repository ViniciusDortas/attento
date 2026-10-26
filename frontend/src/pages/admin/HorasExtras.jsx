import { useState } from "react";
import { SALAS } from "../../data/salas.js";
import { HORAS_EXTRAS } from "../../data/admin.js";
import { Badge, BotaoPrimario, CabecalhoTabela, Card, CampoSelect, CampoTexto, SectionTitle, clr } from "../../components/admin/ui.jsx";

const FORM_VAZIO = { data: "", dia: "", horario: "", sala: SALAS[0].nome, profissional: "", valor: "" };

// Lista de horas extras (reservas avulsas) com cadastro e exclusão.
export default function HorasExtras() {
  const [extras, setExtras] = useState(HORAS_EXTRAS);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState(FORM_VAZIO);

  const mudar = (campo) => (valor) => setForm((f) => ({ ...f, [campo]: valor }));

  function adicionar() {
    if (!form.profissional || !form.data) return;
    setExtras((lista) => [...lista, { ...form, id: Date.now(), valor: Number(form.valor) }]);
    setMostrarForm(false);
    setForm(FORM_VAZIO);
  }

  const total = extras.reduce((s, e) => s + e.valor, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <SectionTitle title="Horas Extras" subtitle={`${extras.length} registros · Total R$ ${total}`} />
        <BotaoPrimario className="mt-1" onClick={() => setMostrarForm((m) => !m)}>
          + Adicionar
        </BotaoPrimario>
      </div>

      {mostrarForm && (
        <Card className="mb-6">
          <h3 className="mb-4 text-sm" style={{ color: clr.text }}>
            Novo registro
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <CampoTexto label="Data" placeholder="DD/MM/AAAA" value={form.data} onChange={mudar("data")} />
            <CampoTexto label="Dia" placeholder="Seg, Ter..." value={form.dia} onChange={mudar("dia")} />
            <CampoTexto label="Horário" placeholder="14H" value={form.horario} onChange={mudar("horario")} />
            <CampoTexto label="Profissional" placeholder="Nome" value={form.profissional} onChange={mudar("profissional")} />
            <CampoTexto label="Valor (R$)" type="number" placeholder="0" value={form.valor} onChange={mudar("valor")} />
            <CampoSelect label="Sala" value={form.sala} onChange={mudar("sala")} opcoes={SALAS.map((s) => s.nome)} />
          </div>
          <BotaoPrimario className="mt-4 px-6 py-2.5" onClick={adicionar}>
            Salvar
          </BotaoPrimario>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <CabecalhoTabela colunas={["Data", "Dia", "Horário", "Sala", "Profissional", "Valor", ""]} />
            <tbody>
              {extras.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-[#f5f7fa]" style={{ borderBottom: `1px solid ${clr.border}` }}>
                  <td className="py-3 px-3" style={{ color: clr.text }}>
                    {e.data}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.sub }}>
                    {e.dia}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.sub }}>
                    {e.horario}
                  </td>
                  <td className="py-3 px-3">
                    <Badge label={e.sala} color="blue" />
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.text }}>
                    {e.profissional}
                  </td>
                  <td className="py-3 px-3" style={{ color: clr.primary }}>
                    R$ {e.valor}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      className="text-xs px-2 py-1 rounded-lg transition-colors"
                      style={{ color: clr.sub, background: clr.bg }}
                      onClick={() => setExtras((lista) => lista.filter((x) => x.id !== e.id))}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="py-3 px-3 text-right text-sm" style={{ color: clr.text }}>
                  Total
                </td>
                <td className="py-3 px-3 text-base" style={{ color: clr.primary }}>
                  R$ {total}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
