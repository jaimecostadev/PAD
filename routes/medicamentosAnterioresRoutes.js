const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os medicamentos anteriores de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const medicamentos = await prisma.medicamentoAnterior.findMany({ where: { pacienteId } });
    res.json(medicamentos);
  } catch (error) {
    console.error('Erro ao buscar medicamentos anteriores:', error);
    res.status(500).json({ error: 'Erro ao buscar medicamentos anteriores.' });
  }
});

// Criar um novo registro de medicamento anterior
router.post('/', async (req, res) => {
  const { dataRegistro, ...medicamentoData } = req.body;
  
  try {
    const formattedDate = new Date(dataRegistro);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const medicamento = await prisma.medicamentoAnterior.create({
      data: { ...medicamentoData, dataRegistro: formattedDate },
    });

    res.status(201).json(medicamento);
  } catch (error) {
    console.error('Erro ao criar medicamento anterior:', error);
    res.status(500).json({ error: 'Erro ao criar medicamento anterior.' });
  }
});

// Atualizar um medicamento anterior
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { dataRegistro, ...medicamentoData } = req.body;

    const formattedDate = new Date(dataRegistro);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const medicamento = await prisma.medicamentoAnterior.update({
      where: { id },
      data: { ...medicamentoData, dataRegistro: formattedDate },
    });

    res.json(medicamento);
  } catch (error) {
    console.error('Erro ao atualizar medicamento anterior:', error);
    res.status(500).json({ error: 'Erro ao atualizar medicamento anterior.' });
  }
});

// Deletar um medicamento anterior
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.medicamentoAnterior.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar medicamento anterior:', error);
    res.status(500).json({ error: 'Erro ao deletar medicamento anterior.' });
  }
});

module.exports = router;
