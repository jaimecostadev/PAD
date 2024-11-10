const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os procedimentos realizados de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const procedimentos = await prisma.procedimentoRealizado.findMany({ where: { pacienteId } });
    res.json(procedimentos);
  } catch (error) {
    console.error('Erro ao buscar procedimentos realizados:', error);
    res.status(500).json({ error: 'Erro ao buscar procedimentos realizados.' });
  }
});

// Criar um procedimento realizado
router.post('/', async (req, res) => {
  try {
    console.log("Recebido no backend:", req.body); // Log para verificar os dados recebidos

    const { dataProcedimento, ...procedimentoData } = req.body;

    // Verificar e converter a data
    const [day, month, year] = dataProcedimento.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    if (isNaN(new Date(formattedDate).getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const procedimento = await prisma.procedimentoRealizado.create({
      data: { ...procedimentoData, dataProcedimento: new Date(formattedDate) },
    });

    res.status(201).json(procedimento);
  } catch (error) {
    console.error('Erro ao criar procedimento realizado:', error);
    res.status(500).json({ error: 'Erro ao criar procedimento realizado.' });
  }
});



// Atualizar um procedimento realizado
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const procedimento = await prisma.procedimentoRealizado.update({ where: { id }, data: req.body });
    res.json(procedimento);
  } catch (error) {
    console.error('Erro ao atualizar procedimento realizado:', error);
    res.status(500).json({ error: 'Erro ao atualizar procedimento realizado.' });
  }
});

// Deletar um procedimento realizado
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.procedimentoRealizado.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar procedimento realizado:', error);
    res.status(500).json({ error: 'Erro ao deletar procedimento realizado.' });
  }
});

module.exports = router;
