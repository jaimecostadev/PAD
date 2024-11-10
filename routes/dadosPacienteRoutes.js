const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint para listar todos os dados dos pacientes
router.get('/dados-paciente', async (req, res) => {
  try {
    const dados = await prisma.dadosDoPaciente.findMany();
    res.json(dados);
  } catch (error) {
    console.error('Erro ao buscar dados dos pacientes:', error);
    res.status(500).json({ error: 'Erro ao buscar dados dos pacientes.' });
  }
});

// Endpoint para criar dados de paciente
router.post('/', async (req, res) => {
  const { pacienteId, ...dadosPaciente } = req.body;
  try {
    const dados = await prisma.dadosDoPaciente.create({
      data: {
        ...dadosPaciente,
        paciente: { connect: { id: pacienteId } },
      },
    });
    res.status(201).json(dados);
  } catch (error) {
    console.error('Erro ao criar dados do paciente:', error);
    res.status(500).json({ error: 'Erro ao criar dados do paciente' });
  }
});

// Endpoint para atualizar dados do paciente
router.put('/dados-paciente/:id', async (req, res) => {
  const { id } = req.params;
  const dadosPaciente = req.body;
  try {
    const dados = await prisma.dadosDoPaciente.update({
      where: { id },
      data: dadosPaciente,
    });
    res.json(dados);
  } catch (error) {
    console.error('Erro ao atualizar dados do paciente:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados do paciente' });
  }
});

// Endpoint para deletar dados do paciente
router.delete('/dados-paciente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dadosDoPaciente.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar dados do paciente:', error);
    res.status(500).json({ error: 'Erro ao deletar dados do paciente' });
  }
});

module.exports = router;
