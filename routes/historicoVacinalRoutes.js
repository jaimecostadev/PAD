const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar histórico vacinal de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const vacinas = await prisma.historicoVacinal.findMany({ where: { pacienteId } });
    res.json(vacinas);
  } catch (error) {
    console.error('Erro ao buscar histórico vacinal:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico vacinal.' });
  }
});

// Criar histórico vacinal
router.post('/', async (req, res) => {
  const { dataUltimaVacina, ...vacinaData } = req.body;

  try {
    const formattedDate = new Date(dataUltimaVacina);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const vacina = await prisma.historicoVacinal.create({
      data: { ...vacinaData, dataUltimaVacina: formattedDate },
    });

    res.status(201).json(vacina);
  } catch (error) {
    console.error('Erro ao criar histórico vacinal:', error);
    res.status(500).json({ error: 'Erro ao criar histórico vacinal.' });
  }
});

// Atualizar histórico vacinal
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { dataUltimaVacina, ...vacinaData } = req.body;

  try {
    const formattedDate = new Date(dataUltimaVacina);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const vacina = await prisma.historicoVacinal.update({
      where: { id },
      data: { ...vacinaData, dataUltimaVacina: formattedDate },
    });

    res.json(vacina);
  } catch (error) {
    console.error('Erro ao atualizar histórico vacinal:', error);
    res.status(500).json({ error: 'Erro ao atualizar histórico vacinal.' });
  }
});

// Deletar histórico vacinal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.historicoVacinal.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar histórico vacinal:', error);
    res.status(500).json({ error: 'Erro ao deletar histórico vacinal.' });
  }
});

module.exports = router;
