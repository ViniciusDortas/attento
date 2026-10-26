import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext.jsx";
import Logo from "../components/Logo.jsx";
import { IconCheck } from "../components/icons.jsx";

// Dados FALSOS do profissional logado — depois virão do backend
// (as reservas e consumos dele, filtrados pelo id do usuário).
const PROFISSIONAL = { nome: "Dra. Marina Costa", iniciais: "MC" };

const TURNOS_RESERVADOS = [
  { data: "03/10/2026", sala: "Sala Onda", turno: "Manhã", valor: 350 },
  { data: "17/10/2026", sala: "Sala Brisa", turno: "Noite", valor: 350 },
];

const CONSUMOS = [
  { data: "03/10/2026", descricao: "2 Cápsulas de café", valor: 4 },
  { data: "17/10/2026", descricao: "Cappuccino e biscoito", valor: 7 },
];

const soma = (lista) => lista.reduce((total, item) => total + item.valor, 0);
const reais = (valor) => `R$ ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

// Cabeçalho reaproveitado nas duas tabelas
function CabecalhoSecao({ id, titulo, subtitulo, icone }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#edf0f4] px-5 py-5 sm:px-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf4fd] text-[#5B88C5]">{icone}</span>
      <div>
        <h2 id={id} className="text-[#273448]">
          {titulo}
        </h2>
        <p className="mt-0.5 text-xs text-[#8a96a8]">{subtitulo}</p>
      </div>
    </div>
  );
}

// Tabela genérica: recebe as colunas e as linhas.
// Em celular mostra uma lista; em telas maiores (sm:) mostra a tabela.
function TabelaFatura({ colunas, linhas, subtotal }) {
  return (
    <>
      {/* Celular */}
      <div className="divide-y divide-[#edf0f4] sm:hidden">
        {linhas.map((linha, i) => (
          <article key={i} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-[#344054]">{linha[1]}</p>
                <p className="mt-1 text-xs text-[#7c8798]">{linha[0]}</p>
              </div>
              <p className="shrink-0 text-sm text-[#273448]">{linha[linha.length - 1]}</p>
            </div>
          </article>
        ))}
        <div className="flex items-center justify-between bg-[#fafbfd] px-5 py-4 text-sm">
          <span className="text-[#697386]">Subtotal</span>
          <span className="text-[#273448]">{subtotal}</span>
        </div>
      </div>

      {/* Telas maiores */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-140 text-left">
          <thead>
            <tr className="bg-[#fafbfd] text-xs uppercase tracking-wide text-[#7c8798]">
              {colunas.map((col, i) => (
                <th key={col} className={`px-6 py-3.5 ${i === colunas.length - 1 ? "text-right" : ""}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf0f4]">
            {linhas.map((linha, i) => (
              <tr key={i} className="text-sm text-[#4f5b6c] transition hover:bg-[#fafbfd]">
                {linha.map((celula, j) => (
                  <td
                    key={j}
                    className={`px-6 py-4 ${j === 0 ? "whitespace-nowrap text-[#344054]" : ""} ${
                      j === linha.length - 1 ? "whitespace-nowrap text-right text-[#273448]" : ""
                    }`}
                  >
                    {celula}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#e4e9f0] bg-[#fafbfd] text-sm">
              <td colSpan={colunas.length - 1} className="px-6 py-4 text-[#697386]">
                Subtotal
              </td>
              <td className="px-6 py-4 text-right text-[#273448]">{subtotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default function MinhaConta() {
  const { sair } = useApp();
  const navigate = useNavigate();
  const [pixGerado, setPixGerado] = useState(false);

  const totalTurnos = soma(TURNOS_RESERVADOS);
  const totalConsumos = soma(CONSUMOS);

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#172033]">
      <header className="border-b border-[#e7ecf2] bg-white">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-xl p-1 transition-opacity hover:opacity-75"
            aria-label="Voltar para o catálogo"
          >
            <Logo />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm text-[#344054]">{PROFISSIONAL.nome}</p>
              <p className="text-xs text-[#7c8798]">Profissional</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce8f7] text-sm text-[#3d6aa8]">
              {PROFISSIONAL.iniciais}
            </div>
            <button
              type="button"
              onClick={sair}
              className="ml-1 rounded-xl border border-[#dfe5ed] px-3.5 py-2 text-xs text-[#5f6b7a] transition hover:border-[#b9c9dc] hover:bg-[#f7f9fc]"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#5B88C5] transition hover:text-[#3d6aa8]"
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Voltar para salas
            </button>
            <h1 className="text-2xl tracking-[-0.02em] text-[#172033] sm:text-3xl">Meus Consumos e Contas</h1>
            <p className="mt-2 text-sm text-[#697386]">Acompanhe suas reservas, conveniências e pagamentos.</p>
          </div>
          <span className="self-start rounded-full bg-[#eaf6ef] px-3.5 py-2 text-xs text-[#26834a] sm:self-auto">
            Fatura em aberto
          </span>
        </div>

        {/* Fatura atual */}
        <section aria-labelledby="fatura-titulo">
          <h2 id="fatura-titulo" className="mb-4 text-lg text-[#273448]">
            Fatura Atual
          </h2>
          <div className="relative overflow-hidden rounded-3xl border border-[#dbe7f6] bg-white p-5 shadow-[0_12px_35px_rgba(55,95,150,0.09)] sm:p-8">
            <div aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#e8f1fc]" />
            <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf4fd] text-[#5B88C5]">
                  <svg width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="2" width="18" height="20" rx="2" />
                    <path d="M7 7h10M7 11h10M7 15h5" />
                  </svg>
                </div>
                <p className="text-sm text-[#697386]">Total a Pagar</p>
                <p className="mt-1 text-3xl tracking-[-0.03em] text-[#172033] sm:text-4xl">{reais(totalTurnos + totalConsumos)}</p>
                <p className="mt-3 flex items-center gap-2 text-xs text-[#7c8798]">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Vencimento em 25 de outubro de 2026
                </p>
              </div>

              <div className="w-full md:w-auto md:min-w-52">
                <button
                  type="button"
                  onClick={() => setPixGerado(true)}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#5B88C5] px-6 text-sm text-white shadow-[0_10px_24px_rgba(91,136,197,0.25)] transition hover:-translate-y-0.5 hover:bg-[#4d79b5] active:translate-y-0"
                >
                  {pixGerado ? (
                    <>
                      <IconCheck />
                      Pix gerado
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m12 3 4 4-4 4-4-4 4-4ZM7 8l4 4-4 4-4-4 4-4ZM17 8l4 4-4 4-4-4 4-4ZM12 13l4 4-4 4-4-4 4-4Z" />
                      </svg>
                      Gerar Pix
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-xs text-[#8a96a8]">Pagamento seguro e confirmação rápida</p>
              </div>
            </div>

            {pixGerado && (
              <div className="relative mt-6 flex items-start gap-3 rounded-xl border border-[#cfe4d7] bg-[#f0faf4] p-4 text-sm text-[#267343]">
                <span className="mt-0.5">
                  <IconCheck />
                </span>
                <p>Código Pix gerado. Finalize o pagamento no aplicativo do seu banco.</p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 space-y-8">
          <section className="overflow-hidden rounded-2xl border border-[#e4e9f0] bg-white shadow-[0_6px_24px_rgba(27,45,73,0.04)]">
            <CabecalhoSecao
              titulo="Turnos Reservados"
              subtitulo="Reservas incluídas na fatura atual"
              icone={
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
              }
            />
            <TabelaFatura
              colunas={["Data", "Consultório", "Turno", "Valor"]}
              linhas={TURNOS_RESERVADOS.map((t) => [
                t.data,
                t.sala,
                <span key="turno" className="rounded-full bg-[#f1f5fa] px-3 py-1 text-xs text-[#5f6b7a]">
                  {t.turno}
                </span>,
                reais(t.valor),
              ])}
              subtotal={reais(totalTurnos)}
            />
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#e4e9f0] bg-white shadow-[0_6px_24px_rgba(27,45,73,0.04)]">
            <CabecalhoSecao
              titulo="Conveniências Extras"
              subtitulo="Itens consumidos durante seus atendimentos"
              icone={
                <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M4 8h16l-1.5 12h-13L4 8Z" />
                  <path d="M8 8a4 4 0 0 1 8 0" />
                </svg>
              }
            />
            <TabelaFatura
              colunas={["Data", "Descrição", "Valor"]}
              linhas={CONSUMOS.map((c) => [c.data, c.descricao, reais(c.valor)])}
              subtotal={reais(totalConsumos)}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
