// Peças visuais reaproveitadas em todas as telas do painel admin.

// Paleta do painel
export const clr = {
  primary: "#5B88C5",
  primaryDark: "#3d6aa8",
  primaryLight: "#dce8f7",
  bg: "#f5f7fa",
  card: "#ffffff",
  border: "#e8edf5",
  text: "#1a1a1a",
  sub: "#7a8aa0",
  green: "#22c55e",
  greenBg: "#dcfce7",
  greenText: "#15803d",
  red: "#ef4444",
  redBg: "#fee2e2",
  redText: "#b91c1c",
  amber: "#f59e0b",
  amberBg: "#fef3c7",
  amberText: "#92400e",
  sidebar: "#1a2540",
  sidebarText: "#c8d8ed",
  sidebarActive: "#2e3f66",
};

// Formata número como dinheiro: 1234.5 → "1.234,50"
export const reais = (valor) => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

// Selo colorido (ex.: "Pago", "Pendente")
export function Badge({ label, color }) {
  const mapa = {
    green: { bg: clr.greenBg, text: clr.greenText },
    red: { bg: clr.redBg, text: clr.redText },
    amber: { bg: clr.amberBg, text: clr.amberText },
    blue: { bg: clr.primaryLight, text: clr.primaryDark },
  };
  const c = mapa[color];
  return (
    <span className="text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap" style={{ background: c.bg, color: c.text }}>
      {label}
    </span>
  );
}

// Caixa branca com borda e sombra
export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{ background: clr.card, border: `1px solid ${clr.border}`, boxShadow: "0 1px 8px rgba(91,136,197,0.07)" }}
    >
      {children}
    </div>
  );
}

// Título + subtítulo de cada seção
export function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl" style={{ color: clr.text }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm mt-0.5" style={{ color: clr.sub }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Botão-filtro (pílula). "ativo" pinta de azul.
export function FiltroBotao({ ativo, onClick, children, corAtiva = clr.primary }) {
  return (
    <button
      className="px-4 py-2 rounded-xl text-sm transition-all"
      style={ativo ? { background: corAtiva, color: "white" } : { background: clr.bg, color: clr.sub, border: `1px solid ${clr.border}` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Botão azul principal
export function BotaoPrimario({ onClick, children, className = "" }) {
  return (
    <button className={`px-4 py-2 rounded-xl text-sm text-white ${className}`} style={{ background: clr.primary }} onClick={onClick}>
      {children}
    </button>
  );
}

// Campo de texto com rótulo
export function CampoTexto({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="text-xs block mb-1" style={{ color: clr.sub }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
        style={{ border: `1px solid ${clr.border}`, background: clr.bg, color: clr.text }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Campo de seleção com rótulo
export function CampoSelect({ label, value, onChange, opcoes }) {
  return (
    <div>
      <label className="text-xs block mb-1" style={{ color: clr.sub }}>
        {label}
      </label>
      <select
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
        style={{ border: `1px solid ${clr.border}`, background: clr.bg, color: clr.text }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {opcoes.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

// Cabeçalho de tabela simples
export function CabecalhoTabela({ colunas }) {
  return (
    <thead>
      <tr style={{ borderBottom: `1px solid ${clr.border}` }}>
        {colunas.map((h, i) => (
          <th key={i} className="text-left py-3 px-3 text-xs whitespace-nowrap" style={{ color: clr.sub }}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}
