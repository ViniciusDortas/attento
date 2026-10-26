// Cores do site público. Recebe "dark" (true/false) e devolve a paleta certa.
// Uso: const c = cores(dark);  →  style={{ color: c.textMain }}

export const AZUL = "#5B88C5";
export const AZUL_ESCURO = "#3d6aa8";
export const AZUL_CLARO = "#dce8f7";

export function cores(dark) {
  return {
    bg: dark ? "#0f1117" : "#ffffff",
    sectionBg: dark ? "#141a24" : "#f5f7fa",
    textMain: dark ? "#f0f4f8" : "#1a1a1a",
    textSub: dark ? "#8a9ab5" : "#666",
    textMuted: dark ? "#8a9ab5" : "#999",
    border: dark ? "#2a3347" : "#edf0f5",
    cardBg: dark ? "#1e2533" : "#ffffff",
    softBg: dark ? "#2a3347" : "#f0f4f8",
    softText: dark ? "#a8c4e8" : AZUL,
  };
}
