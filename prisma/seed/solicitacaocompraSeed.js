const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function solicitacaocompraSeed(prisma) {
  // Dados para a tabela Insumo
  const insumos = [
    { nome: "Soro fisiológico 0.9% 500ml", descricao: "Soro fisiológico" },
    { nome: "Creme barreira 100ml", descricao: "Creme barreira" },
    { nome: "Fralda desc adulto tam g / pct/c 30", descricao: "Fralda descartável para adulto" },
    { nome: "Algodão hidrófilo 500g", descricao: "Algodão hidrófilo" },
    { nome: "Avental desc. Com manga longa", descricao: "Avental descartável" },
    { nome: "Perneira", descricao: "Perneira" },
    { nome: "Fio de aço para serra cirúrgica", descricao: "Fio de aço" },
    { nome: "Máscara N95", descricao: "Máscara N95" },
    { nome: "Álcool 70% 1L", descricao: "Álcool 70%" },
    { nome: "Sabonete líquido neutro 1L", descricao: "Sabonete líquido neutro" },
    { nome: "Kit curativo estéril", descricao: "Kit curativo estéril" },
    { nome: "Luva para procedimento latex s/pó cx c/100", descricao: "Luva para procedimento" },
    { nome: "Gaze em rolo 10cm", descricao: "Gaze em rolo" },
    { nome: "Gaze individual estéril 10cm x 10cm", descricao: "Gaze individual estéril" },
    { nome: "Sonda nelaton estéril nº8 e nº10", descricao: "Sonda nelaton estéril" },
    { nome: "Esparadrapo branco 10cm", descricao: "Esparadrapo branco" },
    { nome: "Cateter de oxigênio nasal adulto", descricao: "Cateter de oxigênio" },
    { nome: "Seringa 20ml", descricao: "Seringa 20ml" },
    { nome: "Tela não aderente", descricao: "Tela não aderente" },
    { nome: "Sonda vesical foley nº18", descricao: "Sonda vesical foley" },
    { nome: "Glicose intravenosa", descricao: "Glicose IV" },
    { nome: "Tubo endotraqueal", descricao: "Tubo endotraqueal" },
    { nome: "Esparadrapo impermeável 1m", descricao: "Esparadrapo impermeável" },
    { nome: "Lenço umedecido infantil 48 unidades", descricao: "Lenço umedecido" },
    { nome: "Sabonete antisséptico 1L", descricao: "Sabonete antisséptico" },
    { nome: "Álcool em gel 70%", descricao: "Álcool em gel" },
    { nome: "Luva para exame latex", descricao: "Luva para exame" }
    // Adicione outros insumos conforme necessário
  ];

  const medicamentos = [
    { nome: "Sertralina 50mg", descricao: "Sertralina 50mg" },
    { nome: "Lactulona 667mg ", descricao: "Lactulona 667mg " },
    { nome: "Simeticona 125mg ", descricao: "Simeticona 125mg " },
    { nome: "Vitamina D3 5000UI ", descricao: "Vitamina D3 5000UI " },
    { nome: "Citoneurin 500mcg ", descricao: "Citoneurin 500mcg " },
    { nome: "Rehidrat 450ml ", descricao: "Rehidrat 450ml " },
    { nome: "Sustagen (Adulto) ", descricao: "Sustagen (Adulto) " },
    { nome: "Trazodona 50mg ", descricao: "Trazodona 50mg " },
    { nome: "Rivotril 2mg ", descricao: "Rivotril 2mg " },
    { nome: "Dipirona 500mg", descricao: "Dipirona 500mg" },
    { nome: "Pregabalina 75mg", descricao: "Pregabalina 75mg" },
    { nome: "Bromoprida 10mg", descricao: "Bromoprida 10mg" },
    { nome: "Ceftriaxona 01mg", descricao: "Ceftriaxona 01mg" },
    { nome: "Florastor 200mg", descricao: "Florastor 200mg" },
    { nome: "Saf-Gel 85g", descricao: "Saf-Gel 85g" },
    { nome: "Clonazepam 2,5mg", descricao: "Clonazepam 2,5mg" },
    { nome: "Diosmin 450/50mg", descricao: "Diosmin 450/50mg" },
    { nome: "Duloretina 30mg", descricao: "Duloretina 30mg" },
    { nome: "Puran T4 50mg", descricao: "Puran T4 50mg" },
    { nome: "Sinvastatina 40mg", descricao: "Sinvastatina 40mg" },
    { nome: "Simeticona", descricao: "Simeticona" },
    { nome: "Brometo de Escopolamina 10mg", descricao: "Brometo de Escopolamina 10mg" },
    { nome: "Dipirona 1G", descricao: "Dipirona 1G" },
    { nome: "Atropina 1%", descricao: "Atropina 1%" },
    { nome: "Seakalm (Melatonina 600mg)", descricao: "Seakalm (Melatonina 600mg)" },
    { nome: "Sabultamol spray", descricao: "Sabultamol spray" },
    { nome: "Glineon 500mg", descricao: "Glineon 500mg" },
    { nome: "Lactulose xarope", descricao: "Lactulose xarope" },
    { nome: "Omeprazol 40mg", descricao: "Omeprazol 40mg" },
    { nome: "Acetilcisteína Xarope 40mg", descricao: "Acetilcisteína Xarope 40mg" },

    // Adicione os outros medicamentos aqui
  ];

  // Dados para a tabela Equipamento
  const equipamentos = [
    { nome: "Cilindro de oxigênio medicinal", descricao: "Cilindro para fornecimento de oxigênio" },
    { nome: "Concentrador de oxigênio portátil", descricao: "Dispositivo portátil para fornecer oxigênio" },
    { nome: "Aspirador clínico portátil", descricao: "Aspirador para uso clínico" },
    { nome: "Copo de Aspirador", descricao: "Copo para acoplar ao aspirador clínico" },
    { nome: "Umidificador de 250ml para oxigênio", descricao: "Umidificador para uso com oxigênio" },
    { nome: "Máscara de NBZ para cilindro", descricao: "Máscara de nebulização para cilindro de oxigênio" },
    { nome: "Máscara Venturi", descricao: "Máscara para controle de fluxo de oxigênio" },
    { nome: "Ambu", descricao: "Dispositivo para ventilação manual" },
    { nome: "Narizinho para TQT", descricao: "Nariz artificial para traqueostomia" },
    { nome: "Conector T (para TQT)", descricao: "Conector T para traqueostomia" },
    { nome: "TQT Nº 8,5", descricao: "Tubo de traqueostomia número 8,5" },
    { nome: "Sonda GTT Nº 24", descricao: "Sonda gástrica número 24" },
    { nome: "Vacuômetro", descricao: "Equipamento para medir pressão de vácuo" },
    { nome: "Suporte de soro", descricao: "Suporte para pendurar bolsas de soro" },
    { nome: "Fluxômetro para oxigênio", descricao: "Dispositivo para controlar o fluxo de oxigênio" },
    { nome: "Adaptador para oxigênio (umidificador e aspirador)", descricao: "Adaptador para umidificação e aspiração com oxigênio" },
    { nome: "Manômetro para oxigênio", descricao: "Medidor de pressão para cilindro de oxigênio" },
    { nome: "Estetoscópio", descricao: "Equipamento para escutar sons corporais" },
    { nome: "Esfigmomanômetro", descricao: "Aparelho para medir pressão arterial" },
    { nome: "Oxímetro Digital de Mesa", descricao: "Oxímetro para monitoramento de oxigênio no sangue" },
    { nome: "Glicosímetro", descricao: "Equipamento para medir glicose no sangue" },
    { nome: "Termômetro", descricao: "Instrumento para medir temperatura corporal" },
    { nome: "Cama Hospitalar", descricao: "Cama ajustável para uso hospitalar" },
    { nome: "Colchão Pneumático", descricao: "Colchão com pressão alternada para prevenir úlceras" },
    { nome: "Armário", descricao: "Armário para armazenamento hospitalar" },
    { nome: "Frasco de dieta enteral", descricao: "Frasco para administração de dieta enteral" },
    { nome: "Equipos macro gotas p/ Nutrição Enteral", descricao: "Equipos para administração de nutrição enteral" },
    { nome: "Sondas para aspiração nº12", descricao: "Sondas de aspiração número 12" },
    { nome: "Cx c/ 100 Lancetas para o Glicosímetro", descricao: "Lancetas para uso com glicosímetro" },
    { nome: "Cx c/ 25 Fitas reagentes para Glicosímetro", descricao: "Fitas para medir glicose no glicosímetro" },
    { nome: "Óculos de proteção", descricao: "Equipamento para proteção ocular" },
    { nome: "Coletor de perfuro cortante de 07 Litros", descricao: "Recipiente para descarte de materiais perfurocortantes" },
    { nome: "Látex para aspiração 2M", descricao: "Tubo de látex para aspiração, comprimento de 2 metros" },
    { nome: "Fita micropore 10 cm x 10m", descricao: "Fita adesiva microporosa, 10 cm x 10 m" }
];

  // Inserindo os dados no banco
  await prisma.insumo.createMany({ data: insumos });
  await prisma.medicamentoSolicitacao.createMany({ data: medicamentos });
  await prisma.equipamento.createMany({ data: equipamentos });

  console.log("Seed data inserted successfully");
}


  module.exports = solicitacaocompraSeed;
