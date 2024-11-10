const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Criar um novo registro SOAP
router.post('/', async (req, res) => { // Note que a rota POST é definida em '/'
    const { nomeCompleto, dataResultado, responsavelPelasRespostas, sintomasEQueixas, sinaisVitais, resultadoExames, diagnostico, proximasEtapas, pacienteId } = req.body;
  
    try {
      const novoSoap = await prisma.sOAP.create({
        data: {
          nomeCompleto,
          dataResultado: new Date(dataResultado),
          responsavelPelasRespostas,
          sintomasEQueixas,
          sinaisVitais,
          resultadoExames,
          diagnostico,
          proximasEtapas,
          paciente: { connect: { id: pacienteId } },
        },
      });
      res.status(201).json(novoSoap);
    } catch (error) {
      console.error("Erro ao criar registro SOAP:", error);
      res.status(500).json({ error: "Erro ao criar registro SOAP." });
    }
  });

// Obter todos os registros SOAP
router.get('/soap', async (req, res) => {
  try {
    const registrosSoap = await prisma.SOAP.findMany({
      include: { paciente: true },
    });
    res.json(registrosSoap);
  } catch (error) {
    console.error("Erro ao buscar registros SOAP:", error);
    res.status(500).json({ error: "Erro ao buscar registros SOAP." });
  }
});

// Obter um registro SOAP específico por ID
router.get('/soap/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const registroSoap = await prisma.SOAP.findUnique({
      where: { id },
      include: { paciente: true },
    });
    if (!registroSoap) {
      return res.status(404).json({ error: "Registro SOAP não encontrado." });
    }
    res.json(registroSoap);
  } catch (error) {
    console.error("Erro ao buscar registro SOAP:", error);
    res.status(500).json({ error: "Erro ao buscar registro SOAP." });
  }
});

// Atualizar um registro SOAP por ID
router.put('/soap/:id', async (req, res) => {
  const { id } = req.params;
  const { nomeCompleto, dataResultado, responsavelPelasRespostas, sintomasEQueixas, sinaisVitais, resultadoExames, diagnostico, proximasEtapas, pacienteId } = req.body;

  try {
    const registroAtualizado = await prisma.SOAP.update({
      where: { id },
      data: {
        nomeCompleto,
        dataResultado: new Date(dataResultado),
        responsavelPelasRespostas,
        sintomasEQueixas,
        sinaisVitais,
        resultadoExames,
        diagnostico,
        proximasEtapas,
        paciente: { connect: { id: pacienteId } },
      },
    });
    res.json(registroAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar registro SOAP:", error);
    res.status(500).json({ error: "Erro ao atualizar registro SOAP." });
  }
});

// Deletar um registro SOAP por ID
router.delete('/soap/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.SOAP.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar registro SOAP:", error);
    res.status(500).json({ error: "Erro ao deletar registro SOAP." });
  }
});

module.exports = router;
