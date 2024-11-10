const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todo o histórico de consultas de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const consultas = await prisma.historicoConsulta.findMany({ where: { pacienteId } });
    res.json(consultas);
  } catch (error) {
    console.error('Erro ao buscar histórico de consultas:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico de consultas.' });
  }
});

// Criar uma nova entrada de consulta
router.post('/', async (req, res) => {
  try {
    const { dataConsulta, ...consultaData } = req.body;
    
    // Formata a data para o formato Date
    const [day, month, year] = dataConsulta.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`);
    
    const consulta = await prisma.historicoConsulta.create({
      data: { ...consultaData, dataConsulta: formattedDate },
    });

    res.status(201).json(consulta);
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(500).json({ error: 'Erro ao criar consulta.' });
  }
});

// Atualizar uma entrada de consulta
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await prisma.historicoConsulta.update({ where: { id }, data: req.body });
    res.json(consulta);
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    res.status(500).json({ error: 'Erro ao atualizar consulta.' });
  }
});

// Deletar uma entrada de consulta
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.historicoConsulta.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar consulta:', error);
    res.status(500).json({ error: 'Erro ao deletar consulta.' });
  }
});

module.exports = router;
