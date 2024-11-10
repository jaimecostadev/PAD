const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todas as internações e altas de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const internacoesAltas = await prisma.internacaoAlta.findMany({ where: { pacienteId } });
    res.json(internacoesAltas);
  } catch (error) {
    console.error('Erro ao buscar internações e altas:', error);
    res.status(500).json({ error: 'Erro ao buscar internações e altas.' });
  }
});

// Criar uma nova internação/alta
router.post('/', async (req, res) => {
  const { dataInternacao, ...internacaoAltaData } = req.body;

  try {
    // Verifique se dataInternacao está formatada corretamente antes de prosseguir
    const formattedDate = new Date(dataInternacao);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato YYYY-MM-DDTHH:MM:SS.' });
    }

    const internacaoAlta = await prisma.internacaoAlta.create({
      data: { ...internacaoAltaData, dataInternacao: formattedDate },
    });

    res.status(201).json(internacaoAlta);
  } catch (error) {
    console.error('Erro ao criar internação/alta:', error);
    res.status(500).json({ error: 'Erro ao criar internação/alta.' });
  }
});


// Atualizar uma internação/alta
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { dataInternacao, ...internacaoAltaData } = req.body;

    // Converte a data para o formato ISO
    const [day, month, year] = dataInternacao.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Use o formato DD/MM/YYYY.' });
    }

    const internacaoAlta = await prisma.internacaoAlta.update({
      where: { id },
      data: { ...internacaoAltaData, dataInternacao: formattedDate },
    });

    res.json(internacaoAlta);
  } catch (error) {
    console.error('Erro ao atualizar internação/alta:', error);
    res.status(500).json({ error: 'Erro ao atualizar internação/alta.' });
  }
});

// Deletar uma internação/alta
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.internacaoAlta.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar internação/alta:', error);
    res.status(500).json({ error: 'Erro ao deletar internação/alta.' });
  }
});

module.exports = router;
