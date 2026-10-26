import { useState } from "react";
import { SALAS, TURNOS } from "../../data/salas.js";
import { UNIDADES } from "../../data/unidades.js";
import { Badge, BotaoPrimario, Card, CampoSelect, CampoTexto, SectionTitle, clr } from "../../components/admin/ui.jsx";

const STATUS = [
  { value: "ativa", label: "Ativa", cor: "green" },
  { value: "manutencao", label: "Manutenção", cor: "amber" },
  { value: "inativa", label: "Inativa", cor: "red" },
];

// Formato que o painel usa: uma sala com preços editáveis e status
const SALAS_INICIAIS = SALAS.map((s) => ({
  id: s.id,
  nome: s.nome,
  metragem: s.metragem ?? "—",
  unidade: s.unidade,
  precos: { ...s.precos },
  status: "ativa",
}));

const SALA_VAZIA = { nome: "", metragem: "", unidade: "Jardim Europa", precos: { "Manhã": "", "Tarde": "", "Noite": "" } };

// Formulário de edição que aparece dentro do card da sala
function FormEdicao({ sala, onSalvar, onCancelar }) {
  const [form, setForm] = useState({ ...sala, precos: { ...sala.precos } });

  const mudar = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }));
  const mudarPreco = (turno, valor) => setForm((f) => ({ ...f, precos: { ...f.precos, [turno]: valor } }));

  function salvar() {
    const precos = {};
    TURNOS.forEach((t) => (precos[t] = Number(form.precos[t]) || 0));
    onSalvar({ ...form, precos });
  }

  return (
    <div className="mt-4 space-y-3 pt-4" style={{ borderTop: `1px solid ${clr.border}` }}>
      <div className="grid grid-cols-2 gap-2">
        <CampoTexto label="Nome" value={form.nome} onChange={(v) => mudar("nome", v)} />
        <CampoTexto label="Metragem" value={form.metragem} onChange={(v) => mudar("metragem", v)} />
        <div className="col-span-2">
          <CampoSelect label="Status" value={form.status} onChange={(v) => mudar("status", v)} opcoes={STATUS} />
        </div>
      </div>
      <div>
        <label className="text-xs block mb-1" style={{ color: clr.sub }}>
          Valores por turno (R$)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TURNOS.map((t) => (
            <input
              key={t}
              type="number"
              className="px-3 py-2 rounded-xl text-sm outline-none text-center"
              style={{ border: `1px solid ${clr.border}`, background: clr.bg, color: clr.text }}
              placeholder={t}
              value={form.precos[t]}
              onChange={(e) => mudarPreco(t, e.target.value)}
            />
          ))}
        </div>
        <div className="flex justify-between px-1 mt-1">
          {TURNOS.map((t) => (
            <span key={t} className="text-xs" style={{ color: clr.sub, width: "33%", textAlign: "center" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button className="flex-1 py-2 rounded-xl text-sm text-white" style={{ background: clr.primary }} onClick={salvar}>
          Salvar
        </button>
        <button
          className="px-4 py-2 rounded-xl text-sm"
          style={{ background: clr.bg, color: clr.sub, border: `1px solid ${clr.border}` }}
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function GestaoSalas() {
  const [salas, setSalas] = useState(SALAS_INICIAIS);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [nova, setNova] = useState(SALA_VAZIA);

  function salvarEdicao(atualizada) {
    setSalas((lista) => lista.map((s) => (s.id === atualizada.id ? atualizada : s)));
    setEditandoId(null);
  }

  function adicionarSala() {
    if (!nova.nome) return;
    const precos = {};
    TURNOS.forEach((t) => (precos[t] = Number(nova.precos[t]) || 0));
    setSalas((lista) => [...lista, { ...nova, id: Date.now(), metragem: nova.metragem || "—", precos, status: "ativa" }]);
    setMostrarNova(false);
    setNova(SALA_VAZIA);
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <SectionTitle title="Gestão de Salas" subtitle="Aracaju, SE — 2 unidades" />
        <BotaoPrimario className="mt-1" onClick={() => setMostrarNova((m) => !m)}>
          + Nova sala
        </BotaoPrimario>
      </div>

      {mostrarNova && (
        <Card className="mb-6">
          <h3 className="text-sm mb-4" style={{ color: clr.text }}>
            Adicionar sala
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <CampoTexto label="Nome" value={nova.nome} onChange={(v) => setNova((n) => ({ ...n, nome: v }))} />
            <CampoTexto label="Metragem" value={nova.metragem} onChange={(v) => setNova((n) => ({ ...n, metragem: v }))} />
            <CampoSelect
              label="Unidade"
              value={nova.unidade}
              onChange={(v) => setNova((n) => ({ ...n, unidade: v }))}
              opcoes={UNIDADES.map((u) => u.nome)}
            />
            {TURNOS.map((t) => (
              <CampoTexto
                key={t}
                label={`${t} (R$)`}
                type="number"
                value={nova.precos[t]}
                onChange={(v) => setNova((n) => ({ ...n, precos: { ...n.precos, [t]: v } }))}
              />
            ))}
          </div>
          <BotaoPrimario className="mt-4 px-6 py-2.5" onClick={adicionarSala}>
            Adicionar
          </BotaoPrimario>
        </Card>
      )}

      {UNIDADES.map((unidade) => {
        const salasDaUnidade = salas.filter((s) => s.unidade === unidade.nome);
        return (
          <div key={unidade.id} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base" style={{ color: clr.text }}>
                {unidade.nome}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: clr.primaryLight, color: clr.primaryDark }}>
                {salasDaUnidade.length} salas
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {salasDaUnidade.map((sala) => {
                const status = STATUS.find((s) => s.value === sala.status);
                const editando = editandoId === sala.id;
                return (
                  <Card key={sala.id}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 style={{ color: clr.text }}>{sala.nome}</h3>
                        <p className="text-xs mt-0.5" style={{ color: clr.sub }}>
                          {sala.metragem}
                        </p>
                      </div>
                      <Badge label={status.label} color={status.cor} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl text-center" style={{ background: clr.bg }}>
                      {TURNOS.map((t) => (
                        <div key={t}>
                          <div className="text-xs" style={{ color: clr.sub }}>
                            {t}
                          </div>
                          <div className="text-sm" style={{ color: clr.primary }}>
                            R$ {sala.precos[t]}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full py-2 rounded-xl text-sm transition-colors"
                      style={
                        editando
                          ? { background: clr.bg, color: clr.sub, border: `1px solid ${clr.border}` }
                          : { background: clr.primaryLight, color: clr.primaryDark }
                      }
                      onClick={() => setEditandoId(editando ? null : sala.id)}
                    >
                      {editando ? "Cancelar edição" : "✏️ Editar sala"}
                    </button>

                    {editando && <FormEdicao sala={sala} onSalvar={salvarEdicao} onCancelar={() => setEditandoId(null)} />}
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
