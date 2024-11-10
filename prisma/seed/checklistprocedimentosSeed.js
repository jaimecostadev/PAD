const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checklistprocedimentosSeed(prisma) {
  // Equipamentos Respiratórios
  const respiratorios = [
    { nome: "Cilindro de oxigênio medicinal com regulador de pressão e fluxômetro" },
    { nome: "Concentrador de oxigênio portátil" },
    { nome: "Aspirador clínico portátil" },
    { nome: "Máscara de oxigênio (NBZ, Venturi)" },
    { nome: "Umidificador para oxigênio" },
    { nome: "Ambu (reanimador manual)" },
    { nome: "Nebulizador ou inalador" },
    { nome: "Conjunto de máscara para nebulização com extensão" }
  ];

  // Equipamentos de Monitoramento
  const monitoramento = [
    { nome: "Estetoscópio" },
    { nome: "Esfigmomanômetro (manual ou digital)" },
    { nome: "Oxímetro de pulso digital" },
    { nome: "Termômetro (infravermelho, digital ou de mercúrio)" },
    { nome: "Glicosímetro com lancetas e tiras reagentes" },
    { nome: "Balança para monitoramento de peso" }
  ];

  // Equipamentos de Suporte e Mobilidade
  const suporteMobilidade = [
    { nome: "Cama hospitalar (manual ou motorizada) com grades de segurança" },
    { nome: "Colchão pneumático ou colchão de ar (para prevenção de úlceras por pressão)" },
    { nome: "Poltrona reclinável ou de descanso" },
    { nome: "Mesa de refeições sobre leito" },
    { nome: "Andador, bengala ou muletas (se necessário)" },
    { nome: "Cadeira de rodas (convencional ou motorizada)" },
    { nome: "Suporte para soro ou medicamentos intravenosos" }
  ];

  // Equipamentos para Procedimentos
  const procedimentos = [
    { nome: "Aspirador de secreções portátil" },
    { nome: "Vacuômetro para aspiração" },
    { nome: "Seringas e agulhas descartáveis" },
    { nome: "Equipos para administração de soro" },
    { nome: "Kit de curativos (tesoura, pinça, ataduras, etc.)" },
    { nome: "Coletor de perfurocortantes" },
    { nome: "Aparelho de sucção de secreções" },
    { nome: "Bombas de infusão (para medicação ou nutrição enteral)" }
  ];

  // Equipamentos de Higiene e Conforto
  const higieneConforto = [
    { nome: "Comadre e papagaio (urinol)" },
    { nome: "Almofadas de posicionamento (para conforto e prevenção de úlceras)" },
    { nome: "Almofadas para suporte de membros (braços e pernas)" },
    { nome: "Aquecedor de ambiente ou ventilador (dependendo da estação)" },
    { nome: "Fraldas geriátricas de acordo com a necessidade do paciente" },
    { nome: "Aparadores de cabelo e barba (se necessário)" }
  ];

  // Equipamentos de Reabilitação
  const reabilitacao = [
    { nome: "Aparelho de fisioterapia respiratória (exercitador pulmonar)" },
    { nome: "Faixas elásticas e pesos para exercícios de mobilidade" },
    { nome: "Aparelho para eletroestimulação muscular (se necessário)" },
    { nome: "Bicicleta ergométrica para exercícios de baixo impacto" }
  ];

  // Equipamentos de Emergência
  const emergencia = [
    { nome: "Desfibrilador Externo Automático (DEA)" },
    { nome: "Mala de primeiros socorros" },
    { nome: "Kit de reanimação (com máscaras e tubo de oxigênio portátil)" },
    { nome: "Aparelho de ventilação mecânica (para casos específicos)" }
  ];

  // Equipamentos Adicionais
  const adicionais = [
    { nome: "Cadeira de banho" },
    { nome: "Sistema de elevação de paciente (guincho)" },
    { nome: "Carrinho para transporte de medicamentos e insumos" },
    { nome: "Bomba de sucção portátil para nutrição enteral" },
    { nome: "Monitor multiparâmetro (para monitoramento contínuo de sinais vitais)" }
  ];

  async function createChecklistItems(items, categoria) {
    for (const item of items) {
      await prisma.checkList.create({
        data: {
          nome: item.nome,
          descricao: categoria
        }
      });
    }
  }

  // Inserindo os dados no banco
  await createChecklistItems(respiratorios, "Equipamentos Respiratórios");
  await createChecklistItems(monitoramento, "Equipamentos de Monitoramento");
  await createChecklistItems(suporteMobilidade, "Equipamento de Suporte e Mobilidade");
  await createChecklistItems(procedimentos, "Equipamentos para Procedimentos");
  await createChecklistItems(higieneConforto, "Equipamentos de Higiene e Conforto");
  await createChecklistItems(reabilitacao, "Equipamentos de Reabilitação");
  await createChecklistItems(emergencia, "Equipamentos de Emergência");
  await createChecklistItems(adicionais, "Equipamentos Adicionais");
  
  console.log("Seed data for checklist inserted successfully");
}

// Exporta a função sem chamar `main`
module.exports = checklistprocedimentosSeed;
