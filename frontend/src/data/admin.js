// Dados falsos (mock) do painel admin — depois virão do backend.
// A ESTRUTURA e os VALORES seguem as planilhas reais da Attento,
// mas os nomes dos profissionais são fictícios (o repositório pode ser público).

// ─── Profissionais (tabela "profissionais") ─────────────────────────────────
export const PROFISSIONAIS = [
  "Ana Souza",
  "Bruna Lima",
  "Dr. Carlos Melo",
  "Dr. Diego Alves",
  "Eduardo Rocha",
  "Fabiana Torres",
  "Gabriel Neves",
  "Helena Dias",
  "Igor Matos",
  "Joana Sampaio",
  "Karina Lopes",
  "Lucas Fontes",
  "Mônica Reis",
  "Dr. Nelson Pinto",
  "Patrícia Gomes",
];

// ─── Turnos fixos semanais (tabela "reservas", tipo = fixo) ─────────────────
// Formato: sala → dia → turno → profissional ("" = livre)
function semanaVazia() {
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const semana = {};
  dias.forEach((dia) => {
    semana[dia] = { "Manhã": "", "Tarde": "", "Noite": "" };
  });
  return semana;
}

function montarGrade(alocacoes) {
  const semana = semanaVazia();
  alocacoes.forEach(([dia, turno, profissional]) => {
    semana[dia][turno] = profissional;
  });
  return semana;
}

export const TURNOS_FIXOS = {
  "Sala Onda": montarGrade([
    ["Segunda", "Manhã", "Ana Souza"],
    ["Segunda", "Tarde", "Ana Souza"],
    ["Terça", "Tarde", "Bruna Lima"],
    ["Quarta", "Manhã", "Bruna Lima"],
    ["Quarta", "Tarde", "Dr. Carlos Melo"],
    ["Quinta", "Tarde", "Dr. Diego Alves"],
    ["Sexta", "Manhã", "Eduardo Rocha"],
  ]),
  "Sala Areia": montarGrade([
    ["Segunda", "Tarde", "Gabriel Neves"],
    ["Segunda", "Noite", "Gabriel Neves"],
    ["Terça", "Tarde", "Gabriel Neves"],
    ["Terça", "Noite", "Gabriel Neves"],
    ["Quarta", "Tarde", "Helena Dias"],
    ["Quinta", "Manhã", "Igor Matos"],
    ["Quinta", "Tarde", "Joana Sampaio"],
    ["Sexta", "Tarde", "Gabriel Neves"],
    ["Sábado", "Manhã", "Gabriel Neves"],
  ]),
  "Sala Brisa": montarGrade([
    ["Terça", "Manhã", "Lucas Fontes"],
    ["Terça", "Tarde", "Karina Lopes"],
    ["Quinta", "Manhã", "Lucas Fontes"],
    ["Quinta", "Tarde", "Fabiana Torres"],
    ["Sexta", "Tarde", "Joana Sampaio"],
  ]),
  "Sala Mar": montarGrade([
    ["Segunda", "Manhã", "Eduardo Rocha"],
    ["Terça", "Manhã", "Patrícia Gomes"],
    ["Terça", "Tarde", "Patrícia Gomes"],
    ["Quarta", "Tarde", "Patrícia Gomes"],
    ["Quinta", "Manhã", "Karina Lopes"],
    ["Quinta", "Tarde", "Karina Lopes"],
    ["Sexta", "Manhã", "Fabiana Torres"],
    ["Sexta", "Tarde", "Patrícia Gomes"],
  ]),
  "Sala Estrela": montarGrade([
    // Sala exclusiva de uma profissional
    ["Segunda", "Manhã", "Uso exclusivo"],
  ]),
  "Sala Duna": montarGrade([
    ["Terça", "Tarde", "Mônica Reis"],
    ["Quinta", "Tarde", "Dr. Nelson Pinto"],
    ["Quinta", "Noite", "Dr. Nelson Pinto (hora extra)"],
  ]),
  "Sala Maré": montarGrade([
    ["Quarta", "Manhã", "Patrícia Gomes"],
    ["Quarta", "Tarde", "Patrícia Gomes"],
    ["Quarta", "Noite", "Eduardo Rocha"],
    ["Quinta", "Manhã", "Patrícia Gomes"],
    ["Quinta", "Tarde", "Patrícia Gomes"],
  ]),
  "Sala Costa": montarGrade([
    ["Segunda", "Manhã", "Mônica Reis"],
    ["Segunda", "Tarde", "Dr. Nelson Pinto"],
    ["Segunda", "Noite", "Dr. Nelson Pinto"],
    ["Terça", "Manhã", "Mônica Reis"],
    ["Terça", "Tarde", "Mônica Reis"],
    ["Quarta", "Manhã", "Mônica Reis"],
    ["Quarta", "Tarde", "Mônica Reis"],
    ["Quinta", "Manhã", "Mônica Reis"],
    ["Quinta", "Tarde", "Ana Souza"],
    ["Sexta", "Manhã", "Mônica Reis"],
    ["Sexta", "Tarde", "Patrícia Gomes"],
  ]),
};

// ─── Horas extras (tabela "reservas", tipo = avulso) ────────────────────────
export const HORAS_EXTRAS = [
  { id: 1, data: "01/07/2026", dia: "Qua", horario: "10H", sala: "Sala Areia", profissional: "Fabiana Torres", valor: 40 },
  { id: 2, data: "03/07/2026", dia: "Sex", horario: "15H", sala: "Sala Areia", profissional: "Fabiana Torres", valor: 10 },
  { id: 3, data: "03/07/2026", dia: "Sex", horario: "16H", sala: "Sala Areia", profissional: "Fabiana Torres", valor: 40 },
  { id: 4, data: "10/07/2026", dia: "Sex", horario: "11H", sala: "Sala Areia", profissional: "Fabiana Torres", valor: 10 },
  { id: 5, data: "10/07/2026", dia: "Sex", horario: "14H", sala: "Sala Areia", profissional: "Fabiana Torres", valor: 10 },
  { id: 6, data: "13/07/2026", dia: "Seg", horario: "16H", sala: "Sala Areia", profissional: "Joana Sampaio", valor: 40 },
  { id: 7, data: "15/07/2026", dia: "Qua", horario: "10H", sala: "Sala Areia", profissional: "Fabiana Torres", valor: 40 },
  { id: 8, data: "15/07/2026", dia: "Qua", horario: "18H", sala: "Sala Areia", profissional: "Helena Dias", valor: 40 },
  { id: 9, data: "01/07/2026", dia: "Qua", horario: "16H", sala: "Sala Mar", profissional: "Karina Lopes", valor: 50 },
  { id: 10, data: "10/07/2026", dia: "Sex", horario: "15H", sala: "Sala Mar", profissional: "Karina Lopes", valor: 50 },
  { id: 11, data: "03/07/2026", dia: "Sex", horario: "12H", sala: "Sala Mar", profissional: "Fabiana Torres", valor: 40 },
  { id: 12, data: "03/07/2026", dia: "Sex", horario: "14H", sala: "Sala Mar", profissional: "Fabiana Torres", valor: 40 },
  { id: 13, data: "10/07/2026", dia: "Sex", horario: "13H", sala: "Sala Mar", profissional: "Igor Matos", valor: 50 },
  { id: 14, data: "15/07/2026", dia: "Qua", horario: "14H", sala: "Sala Duna", profissional: "Lucas Fontes", valor: 40 },
  { id: 15, data: "22/07/2026", dia: "Qua", horario: "15H", sala: "Sala Duna", profissional: "Patrícia Gomes", valor: 40 },
  { id: 16, data: "16/07/2026", dia: "Qui", horario: "17H", sala: "Sala Mar", profissional: "Joana Sampaio", valor: 50 },
];

// ─── Conveniências (tabela "consumos") ──────────────────────────────────────
export const TIPOS_CONVENIENCIA = ["Cápsula de Café", "Cappuccino", "Biscoito"];

export const CONVENIENCIAS = [
  { id: 1, item: "Cápsula de Café", profissional: "Ana Souza", quantidade: 2, data: "15/07/2026", valor: 4 },
  { id: 2, item: "Cápsula de Café", profissional: "Ana Souza", quantidade: 3, data: "22/07/2026", valor: 6 },
  { id: 3, item: "Cápsula de Café", profissional: "Ana Souza", quantidade: 1, data: "24/07/2026", valor: 2 },
  { id: 4, item: "Cápsula de Café", profissional: "Ana Souza", quantidade: 1, data: "27/07/2026", valor: 2 },
  { id: 5, item: "Cápsula de Café", profissional: "Bruna Lima", quantidade: 2, data: "28/07/2026", valor: 4 },
  { id: 6, item: "Cápsula de Café", profissional: "Bruna Lima", quantidade: 1, data: "28/07/2026", valor: 2 },
  { id: 7, item: "Cápsula de Café", profissional: "Bruna Lima", quantidade: 2, data: "30/07/2026", valor: 4 },
  { id: 8, item: "Cápsula de Café", profissional: "Helena Dias", quantidade: 5, data: "30/07/2026", valor: 10 },
  { id: 9, item: "Cápsula de Café", profissional: "Eduardo Rocha", quantidade: 10, data: "30/07/2026", valor: 20 },
  { id: 10, item: "Cápsula de Café", profissional: "Joana Sampaio", quantidade: 1, data: "31/07/2026", valor: 2 },
  { id: 11, item: "Cappuccino", profissional: "Bruna Lima", quantidade: 1, data: "03/07/2026", valor: 5 },
  { id: 12, item: "Cappuccino", profissional: "Bruna Lima", quantidade: 1, data: "10/07/2026", valor: 5 },
  { id: 13, item: "Cappuccino", profissional: "Bruna Lima", quantidade: 1, data: "17/07/2026", valor: 5 },
  { id: 14, item: "Cappuccino", profissional: "Dr. Carlos Melo", quantidade: 1, data: "17/07/2026", valor: 5 },
  { id: 15, item: "Cappuccino", profissional: "Dr. Carlos Melo", quantidade: 1, data: "20/07/2026", valor: 5 },
  { id: 16, item: "Cappuccino", profissional: "Joana Sampaio", quantidade: 1, data: "31/07/2026", valor: 5 },
  { id: 17, item: "Cappuccino", profissional: "Dr. Carlos Melo", quantidade: 1, data: "31/07/2026", valor: 5 },
  { id: 18, item: "Cappuccino", profissional: "Dr. Carlos Melo", quantidade: 1, data: "07/08/2026", valor: 5 },
  { id: 19, item: "Cappuccino", profissional: "Dr. Carlos Melo", quantidade: 2, data: "13/08/2026", valor: 10 },
  { id: 20, item: "Biscoito", profissional: "Bruna Lima", quantidade: 2, data: "07/07/2026", valor: 4 },
  { id: 21, item: "Biscoito", profissional: "Mônica Reis", quantidade: 5, data: "07/07/2026", valor: 10 },
  { id: 22, item: "Biscoito", profissional: "Mônica Reis", quantidade: 2, data: "14/07/2026", valor: 4 },
  { id: 23, item: "Biscoito", profissional: "Bruna Lima", quantidade: 2, data: "30/07/2026", valor: 4 },
  { id: 24, item: "Biscoito", profissional: "Mônica Reis", quantidade: 1, data: "07/08/2026", valor: 2 },
];

// ─── Contas mensais (tabela "contas") — valores reais de Julho/2026 ────────
export const CONTAS = [
  { id: 1, unidade: "Jardim Europa", descricao: "Energia", referencia: "Salas 524 e 525", valor: 677.01, vencimento: "26/06/2026", pago: true },
  { id: 2, unidade: "Jardim Europa", descricao: "Água", referencia: "", valor: 158.08, vencimento: "01/07/2026", pago: true },
  { id: 3, unidade: "Jardim Europa", descricao: "Internet Marvitel", referencia: "", valor: 122.99, vencimento: "10/07/2026", pago: true },
  { id: 4, unidade: "Jardim Europa", descricao: "Condomínio Europa 524", referencia: "", valor: 881.51, vencimento: "10/07/2026", pago: true },
  { id: 5, unidade: "Jardim Europa", descricao: "Condomínio Europa 525", referencia: "", valor: 675.45, vencimento: "10/07/2026", pago: true },
  { id: 6, unidade: "Jardim Europa", descricao: "IPTU Europa 524", referencia: "", valor: 388.06, vencimento: "08/07/2026", pago: true },
  { id: 7, unidade: "Jardim Europa", descricao: "IPTU Europa 525", referencia: "", valor: 302.38, vencimento: "08/07/2026", pago: true },
  { id: 8, unidade: "Jardim Europa", descricao: "Cartão Empresarial", referencia: "", valor: 2520.45, vencimento: "12/07/2026", pago: false },
  { id: 9, unidade: "Jardim Europa", descricao: "Plano TIM Contato Geral", referencia: "", valor: 47.99, vencimento: "07/07/2026", pago: true },
  { id: 10, unidade: "Horizonte Jardins", descricao: "Energia", referencia: "", valor: 100.11, vencimento: "01/07/2026", pago: true },
  { id: 11, unidade: "Horizonte Jardins", descricao: "Internet YO", referencia: "", valor: 74.47, vencimento: "10/07/2026", pago: true },
  { id: 12, unidade: "Horizonte Jardins", descricao: "Condomínio Horizonte", referencia: "", valor: 642.44, vencimento: "05/07/2026", pago: false },
  { id: 13, unidade: "Horizonte Jardins", descricao: "IPTU Horizonte", referencia: "", valor: 250.02, vencimento: "08/07/2026", pago: true },
];

// ─── Pagamentos dos profissionais (mensalidades) ────────────────────────────
function pagamento(id, profissional, especialidade, sala, unidade, turnosFixos, horasExtras, conveniencias, pago, dataPagamento, vencimento) {
  return {
    id,
    profissional,
    especialidade,
    sala,
    unidade,
    turnosFixos,
    horasExtras,
    conveniencias,
    totalDevido: turnosFixos + horasExtras + conveniencias,
    pago,
    dataPagamento,
    vencimento,
    mes: "Julho 2026",
  };
}

export const PAGAMENTOS = [
  pagamento(1, "Ana Souza", "Psicóloga", "Sala Onda", "Jardim Europa", 2800, 0, 14, true, "05/07/2026", "05/07/2026"),
  pagamento(2, "Bruna Lima", "Nutricionista", "Sala Onda", "Jardim Europa", 800, 60, 39, false, null, "10/07/2026"),
  pagamento(3, "Dr. Carlos Melo", "Clínico Geral", "Sala Onda", "Jardim Europa", 450, 0, 30, false, null, "10/07/2026"),
  pagamento(4, "Dr. Diego Alves", "Ortopedista", "Sala Onda", "Jardim Europa", 450, 0, 0, true, "08/07/2026", "05/07/2026"),
  pagamento(5, "Eduardo Rocha", "Fisioterapeuta", "Sala Onda", "Jardim Europa", 350, 0, 20, false, null, "10/07/2026"),
  pagamento(6, "Fabiana Torres", "Dermatologista", "Sala Areia", "Jardim Europa", 1750, 150, 0, true, "12/07/2026", "10/07/2026"),
  pagamento(7, "Joana Sampaio", "Endocrinologista", "Sala Areia / Mar", "Jardim Europa", 900, 210, 7, false, null, "10/07/2026"),
  pagamento(8, "Helena Dias", "Psicóloga", "Sala Areia", "Jardim Europa", 450, 40, 10, true, "20/07/2026", "20/07/2026"),
  pagamento(9, "Karina Lopes", "Nutricionista", "Sala Mar", "Jardim Europa", 900, 100, 0, false, null, "15/07/2026"),
  pagamento(10, "Patrícia Gomes", "Psicóloga", "Sala Mar", "Jardim Europa", 1800, 40, 0, true, "07/07/2026", "05/07/2026"),
  pagamento(11, "Igor Matos", "Terapeuta", "Sala Areia", "Jardim Europa", 350, 50, 0, true, "14/07/2026", "14/07/2026"),
  pagamento(12, "Mônica Reis", "Nutricionista", "Sala Costa", "Horizonte Jardins", 2700, 0, 16, false, null, "10/07/2026"),
  pagamento(13, "Dr. Nelson Pinto", "Médico Geral", "Sala Duna / Costa", "Horizonte Jardins", 1290, 40, 0, true, "09/07/2026", "05/07/2026"),
  pagamento(14, "Lucas Fontes", "Ortopedista", "Sala Brisa", "Jardim Europa", 700, 40, 0, false, null, "22/07/2026"),
];
