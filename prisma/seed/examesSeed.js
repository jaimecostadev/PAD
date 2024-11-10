const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function examesSeed(prisma) {
  const exames = [
    { nome: "Hemograma" },
    { nome: "Glicemia em jejum" },
    { nome: "Colesterol total e frações" },
    { nome: "Ureia e creatinina" },
    { nome: "TGO (AST) e TGP (ALT)" },
    { nome: "TSH e T4 livre" },
    { nome: "Ácido úrico" },
    { nome: "Sumário de urina" },
    { nome: "Eletrocardiograma" },
    { nome: "Teste ergométrico" },
    { nome: "Ecocardiograma" },
    { nome: "Triglicerídeos" },
    { nome: "Sódio" },
    { nome: "Potássio" },
    { nome: "Magnésio" },
    { nome: "Cálcio sérico" },
    { nome: "Urocultura com antibiograma" },
    { nome: "Vitamina D" },
    { nome: "Vitamina B12" },
    { nome: "Ácido fólico" },
    { nome: "Exame completo" }
  ];

  // Insere cada exame no banco de dados
  for (const exame of exames) {
    await prisma.exame.create({
      data: exame
    });
  }

  console.log("Seed data for exames inserted successfully");
}

module.exports = examesSeed;
