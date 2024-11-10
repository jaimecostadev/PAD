const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint para listar todos os medicamentos
router.get('/medicamentos', async (req, res) => {
    try {
      const medicamentos = await prisma.medicamentoPrescricao.findMany();
      console.log('Medicamentos encontrados:', medicamentos); // Adicione um log
      res.json(medicamentos);
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
      res.status(500).json({ error: "Erro ao buscar medicamentos." });
    }
  });

// Endpoint para criar uma nova prescrição médica
router.post('/prescricao-medica', async (req, res) => {
  const { nomePaciente, dataPedido, diagnosticoPrincipal, doseEvia, frequencia, duracaoDoTratamento, comentarios, pacienteId, medicamentos } = req.body;

  try {
    const novaPrescricao = await prisma.prescricaoMedica.create({
      data: {
        nomePaciente,
        dataPedido: new Date(dataPedido),
        diagnosticoPrincipal,
        doseEvia,
        frequencia,
        duracaoDoTratamento,
        comentarios,
        paciente: { connect: { id: pacienteId } },
        medicamentos: {
          create: medicamentos.map((medicamentoId) => ({
            medicamento: { connect: { id: medicamentoId } }
          }))
        }
      },
      include: {
        medicamentos: true,
      }
    });
    res.status(201).json(novaPrescricao);
  } catch (error) {
    console.error("Erro ao criar prescrição médica:", error);
    res.status(500).json({ error: "Erro ao criar prescrição médica." });
  }
});

// Endpoint para buscar prescrições médicas de um paciente específico
router.get('/prescricoes/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;

  try {
    const prescricoes = await prisma.prescricaoMedica.findMany({
      where: { pacienteId },
      include: {
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
    });
    res.json(prescricoes);
  } catch (error) {
    console.error("Erro ao buscar prescrições médicas:", error);
    res.status(500).json({ error: "Erro ao buscar prescrições médicas." });
  }
});

// Endpoint para buscar medicamentos de prescrição com filtro por nome ou descrição
router.get('/prescricaoMedicamentos', async (req, res) => {
  try {
    const { search } = req.query;
    let medicamentos;

    if (search) {
      // Busca pelo nome ou descrição do medicamento
      medicamentos = await prisma.medicamentoPrescricao.findMany({
        where: {
          OR: [
            { nome: { contains: search, mode: 'insensitive' } },
            { descricao: { contains: search, mode: 'insensitive' } }
          ]
        }
      });
    } else {
      // Retorna todos os medicamentos
      medicamentos = await prisma.medicamentoPrescricao.findMany();
    }

    res.json(medicamentos);
  } catch (error) {
    console.error('Erro ao buscar medicamentos de prescrição:', error);
    res.status(500).json({ message: 'Erro ao buscar medicamentos de prescrição' });
  }
});

module.exports = router;
