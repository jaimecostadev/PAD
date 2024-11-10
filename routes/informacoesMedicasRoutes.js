const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Método POST para criar novas Informações Médicas
router.post('/', async (req, res) => {
  const {
    diagnosticoPrincipal,
    alergiasRestricoes,
    planoSaude,
    consultas,
    internacoes,
    dataUltimaConsulta,
    descricao,
    pacienteId
  } = req.body;

  try {
    const novaInformacaoMedica = await prisma.informacoesMedicas.create({
      data: {
        diagnosticoPrincipal,
        alergiasRestricoes,
        planoSaude,
        consultas,
        internacoes,
        dataUltimaConsulta: dataUltimaConsulta ? new Date(dataUltimaConsulta) : null,
        descricao,
        pacienteId,
      },
    });

    res.status(201).json(novaInformacaoMedica);
  } catch (error) {
    console.error('Erro ao cadastrar Informações Médicas:', error);
    res.status(500).json({ error: 'Erro ao cadastrar Informações Médicas' });
  }
});

// Método GET para listar Informações Médicas
router.get('/', async (req, res) => {
  try {
    const informacoesMedicas = await prisma.informacoesMedicas.findMany({
      include: { paciente: true },
    });
    res.json(informacoesMedicas);
  } catch (error) {
    console.error('Erro ao buscar Informações Médicas:', error);
    res.status(500).json({ error: 'Erro ao buscar Informações Médicas' });
  }
});

// Método PUT para atualizar Informações Médicas
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { diagnosticoPrincipal, alergiasRestricoes, planoSaude, consultas, internacoes, descricao } = req.body;

  try {
    const informacaoMedicaAtualizada = await prisma.informacoesMedicas.update({
      where: { id },
      data: {
        diagnosticoPrincipal,
        alergiasRestricoes,
        planoSaude,
        consultas,
        internacoes,
        descricao,
      },
    });

    res.json(informacaoMedicaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar Informações Médicas:', error);
    res.status(500).json({ error: 'Erro ao atualizar Informações Médicas' });
  }
});

// Método DELETE para excluir Informações Médicas
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.informacoesMedicas.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar Informações Médicas:', error);
    res.status(500).json({ error: 'Erro ao deletar Informações Médicas' });
  }
});

module.exports = router;
