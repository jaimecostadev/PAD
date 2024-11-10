const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todas as notas e evolução de um paciente
router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const notas = await prisma.notaEvolucao.findMany({ where: { pacienteId } });
    res.json(notas);
  } catch (error) {
    console.error('Erro ao buscar notas e evolução:', error);
    res.status(500).json({ error: 'Erro ao buscar notas e evolução.' });
  }
});

// Criar uma nova nota/evolução
router.post('/', async (req, res) => {
  const { pacienteId, nomeProfissional, dataRealizacao, profissao, resultado } = req.body;

  try {
    // Converte dataRealizacao para o formato Date no padrão esperado pelo Prisma
    const [day, month, year] = dataRealizacao.split('/');
    const dataUltimaAnotacao = new Date(`${year}-${month}-${day}`);

    // Verifica se a data é válida
    if (isNaN(dataUltimaAnotacao.getTime())) {
      return res.status(400).json({ error: 'Formato de data inválido. Use DD/MM/YYYY.' });
    }
 
    const nota = await prisma.notaEvolucao.create({
      data: {
        pacienteId,
        nomeProfissional,
        dataUltimaAnotacao,
        profissao,
        resultadoPesquisa: resultado,  // Corrigindo para resultadoPesquisa
      },
    });

    res.status(201).json(nota);
  } catch (error) {
    console.error('Erro ao criar nota/evolução:', error);
    res.status(500).json({ error: 'Erro ao criar nota/evolução' });
  }
});



// Atualizar uma nota/evolução
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const nota = await prisma.notaEvolucao.update({ where: { id }, data: req.body });
    res.json(nota);
  } catch (error) {
    console.error('Erro ao atualizar nota/evolução:', error);
    res.status(500).json({ error: 'Erro ao atualizar nota/evolução.' });
  }
});

// Deletar uma nota/evolução
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.notaEvolucao.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar nota/evolução:', error);
    res.status(500).json({ error: 'Erro ao deletar nota/evolução.' });
  }
});

module.exports = router;
