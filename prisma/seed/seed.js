const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Importando cada seed
const checklistprocedimentosSeed = require('./checklistprocedimentosSeed');
const examesSeed = require('./examesSeed');
const medicamentosSeed = require('./medicamentosSeed');
const solicitacaocompraSeed = require('./solicitacaocompraSeed');


async function main() {
  console.log('Iniciando seeding...');

  // Executando cada seed em sequência
  await checklistprocedimentosSeed(prisma);
  console.log('Seed de checklistprocedimentos concluído.');

  await examesSeed(prisma);
  console.log('Seed de exames concluído.');

  await medicamentosSeed(prisma);
  console.log('Seed de medicamentos concluído.');

  await solicitacaocompraSeed(prisma);
  console.log('Seed de solicitacaocompra concluído.');

  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
