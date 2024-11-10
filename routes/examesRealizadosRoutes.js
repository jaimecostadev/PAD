const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os exames realizados de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const exames = await prisma.exameRealizado.findMany({ where: { pacienteId } });
    res.json(exames);
  } catch (error) {
    console.error('Erro ao buscar exames realizados:', error);
    res.status(500).json({ error: 'Erro ao buscar exames realizados.' });
  }
});

// Criar um exame realizado
router.post('/', async (req, res) => {
  const { dataRealizacao, ...exameData } = req.body;

  try {
    const formattedDate = new Date(dataRealizacao);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const exame = await prisma.exameRealizado.create({
      data: { ...exameData, dataRealizacao: formattedDate },
    });

    res.status(201).json(exame);
  } catch (error) {
    console.error('Erro ao criar exame realizado:', error);
    res.status(500).json({ error: 'Erro ao criar exame realizado.' });
  }
});

// Atualizar um exame realizado
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { dataRealizacao, ...exameData } = req.body;

  try {
    const formattedDate = new Date(dataRealizacao);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const exame = await prisma.exameRealizado.update({
      where: { id },
      data: { ...exameData, dataRealizacao: formattedDate },
    });

    res.json(exame);
  } catch (error) {
    console.error('Erro ao atualizar exame realizado:', error);
    res.status(500).json({ error: 'Erro ao atualizar exame realizado.' });
  }
});

// Deletar um exame realizado
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.exameRealizado.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar exame realizado:', error);
    res.status(500).json({ error: 'Erro ao deletar exame realizado.' });
  }
});

module.exports = router;
