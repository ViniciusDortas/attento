import attentoLogo from "../assets/attento-logo.png";
import { CONTATO } from "../data/unidades.js";

const LINKS_RAPIDOS = [
  { label: "Salas disponíveis", href: "#salas" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Unidades", href: "#unidades" },
  { label: "Contato", href: "#contato" },
];

const REDES = ["Instagram", "LinkedIn", "WhatsApp"];

export default function Footer() {
  return (
    <footer id="contato" className="px-6 lg:px-10 py-14" style={{ background: "#5B88C5" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div>
          <div className="mb-4">
            <img
              src={attentoLogo}
              alt="Attento Saúde Integral"
              style={{ height: 72, width: "auto", filter: "brightness(0) invert(1)" }}
            />
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Espaços profissionais para profissionais de saúde. Atenda seus pacientes com conforto e estrutura.
          </p>
        </div>

        <div>
          <h4 className="text-sm text-white mb-4">Links rápidos</h4>
          <div className="space-y-2">
            {LINKS_RAPIDOS.map((link) => (
              <div key={link.label}>
                <a href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm text-white mb-4">Contato</h4>
          <div className="space-y-2 text-sm text-white/70">
            <p>{CONTATO.email}</p>
            <p>{CONTATO.telefone}</p>
            <p>{CONTATO.cidade}</p>
          </div>
          <div className="flex gap-3 mt-5">
            {REDES.map((rede) => (
              <button
                key={rede}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs text-white/80 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.15)" }}
                title={rede}
              >
                {rede[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="max-w-5xl mx-auto pt-8 mt-8 flex flex-col lg:flex-row items-center justify-between gap-2 text-xs text-white/50"
        style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
      >
        <span>© 2026 Attento Saúde Integral. Todos os direitos reservados.</span>
        <span>Feito com cuidado para profissionais de saúde</span>
      </div>
    </footer>
  );
}
