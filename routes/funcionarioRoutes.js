const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define a pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Define o nome único do arquivo
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo não suportado. Apenas JPEG e PNG são permitidos.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  // Limite de 5MB
  fileFilter: fileFilter
});

// Endpoint para cadastrar um novo funcionário com upload de foto
router.post('/', upload.single('foto'), async (req, res) => {
  const { nome, email, senha, crm, cargo } = req.body;
  const foto = req.file ? req.file.filename : null;

  try {
    // Verificar se o e-mail foi fornecido
    if (!email) {
      return res.status(400).json({ error: 'O campo de e-mail é obrigatório.' });
    }

    // Verificar se o e-mail já existe no banco
    const funcionarioExistente = await prisma.funcionario.findUnique({
      where: { email },
    });

    if (funcionarioExistente) {
      return res.status(400).json({ error: 'O e-mail já está em uso.' });
    }

    // Criptografar a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar novo funcionário
    const novoFuncionario = await prisma.funcionario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        crm,
        cargo,
        foto,
      },
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    res.status(500).json({ error: 'Erro ao criar funcionário.' });
  }
});

module.exports = router;

// Listar todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        res.json(funcionarios);
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        res.status(500).json({ error: 'Erro ao buscar funcionários.' });
    }
});

// Obter um funcionário específico por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: { id },
        });
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado.' });
        }
        res.json(funcionario);
    } catch (error) {
        console.error('Erro ao buscar funcionário:', error);
        res.status(500).json({ error: 'Erro ao buscar funcionário.' });
    }
});

// Atualizar um funcionário por ID
router.put('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, foto, crm, cargo } = req.body;

  try {
    const dadosAtualizados = {
      nome,
      email,
      foto,
      crm,
      cargo,
    };

    // Criptografa a senha se ela foi enviada
    if (senha) {
      dadosAtualizados.senha = await bcrypt.hash(senha, 10);
    }

    const funcionarioAtualizado = await prisma.funcionario.update({
      where: { id },
      data: dadosAtualizados,
    });

    res.json(funcionarioAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({ error: 'Erro ao atualizar funcionário.' });
  }
});

// Deletar um funcionário por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.funcionario.delete({
            where: { id },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        res.status(500).json({ error: 'Erro ao deletar funcionário.' });
    }
});

module.exports = router;