import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { CONTATO } from "../data/unidades.js";
import { TURNOS, descricaoCurta, precoMinimo } from "../data/salas.js";
import AvailabilityCalendar from "./AvailabilityCalendar.jsx";
import { IconAC, IconCheck, IconClose, IconTV, IconWhatsapp, IconWifi } from "./icons.jsx";

// Escolhe o ícone de cada comodidade pelo começo do nome
function iconeComodidade(nome) {
  if (nome.startsWith("Wi-Fi")) return <IconWifi />;
  if (nome.startsWith("Ar")) return <IconAC />;
  if (nome.startsWith("TV")) return <IconTV />;
  return <IconCheck />;
}

// Janela com os detalhes da sala, a grade de horários e o resumo da reserva.
export default function RoomModal({ sala, onClose }) {
  const { dark, role, logado, abrirLogin } = useApp();
  const [fotoPrincipal, setFotoPrincipal] = useState(0);
  const [selecionados, setSelecionados] = useState([]); // horários escolhidos
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [codigoReserva] = useState(() => `ATT-${String(Date.now()).slice(-6)}`);

  const total = selecionados.reduce((soma, s) => soma + s.preco, 0);

  // Adiciona o horário se não estiver na lista; remove se já estiver.
  function alternarHorario(horario) {
    setSelecionados((lista) =>
      lista.some((s) => s.chave === horario.chave)
        ? lista.filter((s) => s.chave !== horario.chave)
        : [...lista, horario]
    );
  }

  function reservar() {
    if (!selecionados.length) return;
    if (!logado) {
      abrirLogin({ paraReserva: true });
      return;
    }
    setReservaConfirmada(true); // FALSO: depois isso vai salvar no backend
  }

  // Monta a mensagem e abre o WhatsApp numa nova aba
  function reservarPeloWhatsApp() {
    const mensagem = selecionados.length
      ? `Olá! Gostaria de reservar a ${sala.nome} (${sala.unidade}) nos seguintes horários:\n` +
        selecionados.map((s) => `• ${s.dia} ${s.data} — ${s.turno} (R$ ${s.preco})`).join("\n") +
        `\n\nTotal: R$ ${total}`
      : `Olá! Tenho interesse na ${sala.nome} (${sala.unidade}). Poderia me informar a disponibilidade?`;

    window.open(`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`, "_blank");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      // Clicar no fundo escuro (fora da janela) fecha o modal
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-4xl my-8 mx-4 rounded-3xl overflow-hidden"
        style={{ background: dark ? "#151b27" : "#ffffff" }}
      >
        {/* Fechar */}
        <button
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: dark ? "rgba(30,37,51,0.9)" : "rgba(255,255,255,0.9)", color: dark ? "#f0f4f8" : "#333" }}
          onClick={onClose}
          aria-label="Fechar"
        >
          <IconClose />
        </button>

        {/* Galeria */}
        <div className="relative" style={{ height: 360, background: "#dce8f7" }}>
          <img src={sala.fotos[fotoPrincipal]} alt={sala.nome} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {sala.fotos.map((foto, i) => (
              <button
                key={i}
                onClick={() => setFotoPrincipal(i)}
                className="rounded-xl overflow-hidden border-2 transition-all"
                style={{ width: 64, height: 44, borderColor: i === fotoPrincipal ? "#5B88C5" : "transparent" }}
              >
                <img src={foto} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-0 flex-col lg:flex-row">
          {/* Esquerda: detalhes + grade */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-2xl mb-1" style={{ color: dark ? "#f0f4f8" : "#1a1a1a" }}>
                  {sala.nome}
                </h2>
                <p className="text-sm" style={{ color: dark ? "#8a9ab5" : "#666" }}>
                  {descricaoCurta(sala)}
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full mt-1" style={{ background: "#dce8f7", color: "#3d6aa8" }}>
                {sala.unidade}
              </span>
            </div>

            <p className="text-sm leading-relaxed mt-4 mb-6" style={{ color: dark ? "#9aacbf" : "#555" }}>
              {sala.descricao}
            </p>

            {/* Comodidades */}
            <div className="mb-6">
              <h3 className="text-sm mb-3" style={{ color: dark ? "#c8d8ed" : "#333" }}>
                Comodidades
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {sala.comodidades.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm" style={{ color: dark ? "#9aacbf" : "#555" }}>
                    <span style={{ color: "#5B88C5" }}>{iconeComodidade(item)}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t" style={{ borderColor: dark ? "#2a3347" : "#edf0f5" }}>
              <AvailabilityCalendar
                sala={sala}
                dark={dark}
                role={role}
                logado={logado}
                selecionados={selecionados}
                onToggle={alternarHorario}
              />
            </div>
          </div>

          {/* Direita: resumo da reserva */}
          <div
            className="lg:w-80 p-6 lg:sticky lg:top-0 lg:self-start lg:max-h-screen overflow-y-auto"
            style={{
              borderLeft: dark ? "1px solid #2a3347" : "1px solid #edf0f5",
              background: dark ? "#1a2132" : "#fafbfd",
            }}
          >
            <div
              className="rounded-2xl p-5"
              style={{
                background: dark ? "#1e2533" : "#ffffff",
                boxShadow: dark ? "none" : "0 2px 16px rgba(91,136,197,0.1)",
                border: dark ? "1px solid #2a3347" : "1px solid #edf0f5",
              }}
            >
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl" style={{ color: dark ? "#a8c4e8" : "#5B88C5" }}>
                  R$ {precoMinimo(sala)}
                </span>
                <span className="text-sm" style={{ color: dark ? "#8a9ab5" : "#999" }}>
                  / turno
                </span>
              </div>

              {reservaConfirmada ? (
                <div className="mb-5 rounded-xl bg-green-50 p-4 text-center">
                  <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <IconCheck />
                  </span>
                  <p className="text-sm text-green-800">Reserva confirmada</p>
                  <p className="mt-1 text-xs text-green-700">Código {codigoReserva}</p>
                  <p className="mt-3 text-xs leading-relaxed text-green-700">
                    Os horários foram adicionados à sua conta. Você pode acompanhar a reserva e o pagamento no painel profissional.
                  </p>
                </div>
              ) : selecionados.length > 0 ? (
                <div className="mb-4">
                  <p className="text-xs mb-2" style={{ color: dark ? "#c8d8ed" : "#333" }}>
                    Horários selecionados
                  </p>
                  <div className="space-y-2">
                    {selecionados.map((s) => (
                      <div key={s.chave} className="flex justify-between text-sm" style={{ color: dark ? "#9aacbf" : "#555" }}>
                        <span>
                          {s.dia} {s.data} — {s.turno}
                        </span>
                        <span>R$ {s.preco}</span>
                      </div>
                    ))}
                    <div
                      className="flex justify-between text-sm pt-2 border-t"
                      style={{ borderColor: dark ? "#2a3347" : "#edf0f5", color: dark ? "#f0f4f8" : "#1a1a1a" }}
                    >
                      <span>Total</span>
                      <span>R$ {total}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-center py-4 mb-4" style={{ color: dark ? "#5a7a9e" : "#bbb" }}>
                  Selecione os turnos desejados no calendário
                </p>
              )}

              {!reservaConfirmada && (
                <button
                  className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ background: "#5B88C5", color: "white" }}
                  onClick={reservar}
                  disabled={!selecionados.length}
                >
                  <IconCheck />
                  {logado ? "Confirmar reserva" : "Entrar para reservar"}
                </button>
              )}

              <button
                className="mt-3 w-full rounded-xl border py-3 text-sm transition-colors"
                style={{ borderColor: "#25D366", color: dark ? "#70e59c" : "#159447", background: "transparent" }}
                onClick={reservarPeloWhatsApp}
              >
                <span className="flex items-center justify-center gap-2">
                  <IconWhatsapp />
                  {reservaConfirmada ? "Falar sobre esta reserva" : "Reservar pelo WhatsApp"}
                </span>
              </button>

              <p className="text-xs text-center mt-3" style={{ color: dark ? "#5a7a9e" : "#999" }}>
                Reserve diretamente pelo site ou, se preferir, fale conosco.
              </p>
            </div>

            {/* Tabela de preços */}
            <div className="mt-4 p-4 rounded-xl" style={{ background: dark ? "#2a3347" : "#f0f6ff" }}>
              <p className="text-xs mb-2" style={{ color: dark ? "#a8c4e8" : "#3d6aa8" }}>
                Tabela de preços
              </p>
              {TURNOS.map((t) => (
                <div key={t} className="flex justify-between text-xs py-1" style={{ color: dark ? "#8a9ab5" : "#666" }}>
                  <span>{t}</span>
                  <span>R$ {sala.precos[t]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
