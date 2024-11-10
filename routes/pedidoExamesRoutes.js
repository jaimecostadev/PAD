const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint para listar todos os exames
router.get('/exames', async (req, res) => {
  try {
    const exames = await prisma.exame.findMany(); // Buscando todos os exames do banco
    res.json(exames); // Enviando a lista de exames como resposta
  } catch (error) {
    console.error('Erro ao buscar exames:', error);
    res.status(500).json({ error: 'Erro ao buscar exames.' });
  }
});

// Endpoint para criar um novo pedido de exame
router.post('/pedido-exames', async (req, res) => {
  const { nomeCompleto, dataPedido, diagnosticoPrincipal, exames, pacienteId } = req.body;

  try {
    const pedido = await prisma.pedidoDeExames.create({
      data: {
        nomeCompleto,
        dataPedido: new Date(dataPedido), // Converte para objeto de data
        diagnosticoPrincipal,
        paciente: { connect: { id: pacienteId } },
        exames: {
          create: exames.map(exameId => ({
            exame: { connect: { id: exameId } }
          })),
        },
      },
    });
    res.status(201).json(pedido);
  } catch (error) {
    console.error('Erro ao criar pedido de exame:', error);
    res.status(500).json({ error: 'Erro ao criar pedido de exame' });
  }
});

// Endpoint para listar pedidos de exame
router.get('/pedido-exames', async (req, res) => {
  try {
    const pedidos = await prisma.pedidoDeExames.findMany({ 
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Limita a 10 resultados mais recentes
    });
    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos de exames:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos de exames' });
  }
});

module.exports = router;
