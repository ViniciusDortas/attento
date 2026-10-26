// Dados falsos (mock) — depois virão do backend (tabela "salas").
// Nome, metragem, unidade e preços vêm das planilhas reais.
// Fotos, comodidades e descrições são provisórias: confirmar com a Attento.

export const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const TURNOS = ["Manhã", "Tarde", "Noite"];

const PRECOS_EUROPA = { "Manhã": 350, "Tarde": 450, "Noite": 350 };
const PRECOS_HORIZONTE = { "Manhã": 300, "Tarde": 330, "Noite": 300 };

const FOTO = {
  a: "https://images.unsplash.com/photo-1643877107082-8ee9da17c090?w=800&h=600&fit=crop&auto=format",
  b: "https://images.unsplash.com/photo-1594022519033-526d3d65e431?w=800&h=600&fit=crop&auto=format",
  c: "https://images.unsplash.com/photo-1706521778346-89b688c68b71?w=800&h=600&fit=crop&auto=format",
  d: "https://images.unsplash.com/photo-1747992021633-762a63985d01?w=800&h=600&fit=crop&auto=format",
  e: "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?w=800&h=600&fit=crop&auto=format",
  f: "https://images.unsplash.com/photo-1665231795856-769fb08a90bc?w=800&h=600&fit=crop&auto=format",
};

export const SALAS = [
  {
    id: 1,
    nome: "Sala Onda",
    metragem: "9,35 m²",
    unidade: "Jardim Europa",
    precos: PRECOS_EUROPA,
    fotos: [FOTO.a, FOTO.b, FOTO.c],
    comodidades: ["Ar-condicionado", "Wi-Fi", 'TV 40"', "Mesa e cadeiras", "Pia", "Armário"],
    descricao:
      "Sala climatizada no meio do corredor, com decoração neutra e iluminação natural. Ideal para consultas individuais, psicoterapia e nutrição.",
    disponivel: true,
    poucosHorarios: false,
  },
  {
    id: 2,
    nome: "Sala Areia",
    metragem: "9,84 m²",
    unidade: "Jardim Europa",
    precos: PRECOS_EUROPA,
    fotos: [FOTO.d, FOTO.a, FOTO.e],
    comodidades: ["Ar-condicionado", "Wi-Fi", "Maca clínica", "Mesa e cadeiras", "Pia", "Frigobar"],
    descricao:
      "Logo na entrada do espaço, com maca clínica. Ótima para dermatologistas, fisioterapeutas e clínicos gerais.",
    disponivel: true,
    poucosHorarios: true,
  },
  {
    id: 3,
    nome: "Sala Brisa",
    metragem: "8,00 m²",
    unidade: "Jardim Europa",
    precos: PRECOS_EUROPA,
    fotos: [FOTO.f, FOTO.b],
    comodidades: ["Ar-condicionado", "Wi-Fi", "Mesa e cadeiras", "Luminária clínica", "Pia"],
    descricao:
      "Consultório aconchegante, com paleta neutra e iluminação ajustável. Perfeito para psicólogos e terapeutas que buscam um ambiente tranquilo.",
    disponivel: true,
    poucosHorarios: false,
  },
  {
    id: 4,
    nome: "Sala Mar",
    metragem: "10,08 m²",
    unidade: "Jardim Europa",
    precos: PRECOS_EUROPA,
    fotos: [FOTO.e, FOTO.c, FOTO.a],
    comodidades: ["Ar-condicionado", "Wi-Fi", 'TV 32"', "Mesa e cadeiras", "Pia", "Maca"],
    descricao:
      "Sala ampla e versátil, com TV para exibição de exames. Indicada para nutricionistas, endocrinologistas e médicos em geral.",
    disponivel: true,
    poucosHorarios: true,
  },
  {
    id: 5,
    nome: "Sala Estrela",
    metragem: "10,67 m²",
    unidade: "Jardim Europa",
    precos: PRECOS_EUROPA,
    fotos: [FOTO.b, FOTO.c, FOTO.e],
    comodidades: ["Ar-condicionado", "Wi-Fi", 'TV 55"', "Maca premium", "Pia", "Armário"],
    descricao:
      "A maior sala da unidade, no canto do espaço. Atualmente de uso exclusivo de uma profissional.",
    disponivel: false,
    poucosHorarios: false,
  },
  {
    id: 6,
    nome: "Sala Duna",
    metragem: null, // metragem ainda não informada
    unidade: "Horizonte Jardins",
    precos: PRECOS_HORIZONTE,
    fotos: [FOTO.c, FOTO.d, FOTO.a],
    comodidades: ["Ar-condicionado", "Wi-Fi", "Mesa e cadeiras", "Pia", "Maca"],
    descricao:
      "Sala versátil no Horizonte Jardins. Indicada para nutricionistas, psicólogos e médicos em geral.",
    disponivel: true,
    poucosHorarios: false,
  },
  {
    id: 7,
    nome: "Sala Maré",
    metragem: null,
    unidade: "Horizonte Jardins",
    precos: PRECOS_HORIZONTE,
    fotos: [FOTO.e, FOTO.f],
    comodidades: ["Ar-condicionado", "Wi-Fi", "Cadeiras ergonômicas", "Mesa", "Pia", "Gaveteiro"],
    descricao:
      "Espaço clean e bem equipado, com área de espera integrada para acompanhantes. Ótimo para pediatras e ginecologistas.",
    disponivel: true,
    poucosHorarios: true,
  },
  {
    id: 8,
    nome: "Sala Costa",
    metragem: null,
    unidade: "Horizonte Jardins",
    precos: PRECOS_HORIZONTE,
    fotos: [FOTO.a, FOTO.e, FOTO.b],
    comodidades: ["Ar-condicionado", "Wi-Fi", "Mesa e cadeiras", "Pia", "Armário"],
    descricao:
      "Consultório iluminado e confortável, com boa procura durante toda a semana.",
    disponivel: true,
    poucosHorarios: false,
  },
];

// Menor preço entre os turnos — usado no "A partir de R$ ..."
export function precoMinimo(sala) {
  return Math.min(...Object.values(sala.precos));
}

// Texto "9,35 m² · Jardim Europa" (ou só a unidade, se não tiver metragem)
export function descricaoCurta(sala) {
  return sala.metragem ? `${sala.metragem} · ${sala.unidade}` : sala.unidade;
}
