const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Endpoint para Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const funcionario = await prisma.funcionario.findUnique({
      where: { email }
    });

    if (!funcionario) {
      return res.status(400).json({ error: 'Email ou senha incorretos' });
    }

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Email ou senha incorretos' });
    }

    // Verifica se o usuário é admin
    const isAdmin = email === 'chefe@' && senha === 'chefe';

    res.status(200).json({ 
      message: 'Login bem-sucedido', 
      isAdmin,
      funcionarioId: funcionario.id
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;