const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// Configuração de armazenamento para o Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'atestados');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint para salvar o PDF de atestado
router.post('/salvar-pdf', upload.single('arquivo'), async (req, res) => {
  const { pacienteId, nomePaciente } = req.body;
  const arquivo = req.file;

  if (!pacienteId || !nomePaciente) {
    return res.status(400).json({ error: 'Paciente ID e Nome do Paciente são obrigatórios.' });
  }

  if (!arquivo) {
    return res.status(400).json({ error: 'Arquivo PDF não enviado.' });
  }

  try {
    const atestadoPDF = await prisma.atestadoPDF.create({
      data: {
        pacienteId,
        nomeArquivo: arquivo.filename,
        caminho: arquivo.path,
      },
    });

    res.status(201).json({ message: 'Atestado PDF salvo com sucesso!', atestadoPDF });
  } catch (error) {
    console.error('Erro ao salvar o PDF:', error);
    res.status(500).json({ error: 'Erro ao salvar o PDF no servidor.' });
  }
});

module.exports = router;
