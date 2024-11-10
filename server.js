const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

// Importação das rotas
const pacienteRoutes = require('./routes/pacienteRoutes'); 
const authRoutes = require('./routes/authRoutes');
const informacoesMedicasRoutes = require('./routes/informacoesMedicasRoutes');
const pedidoExamesRoutes = require('./routes/pedidoExamesRoutes');
const prescricaoMedicaRoutes = require('./routes/prescricaoMedicaRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const soapRoutes = require('./routes/soapRoutes');
const atestadoRoutes = require('./routes/atestadoRoutes');
const dadosPaciente = require('./routes/dadosPacienteRoutes');
const examesRealizadosRoutes = require('./routes/examesRealizadosRoutes');
const historicoVacinalRoutes = require('./routes/historicoVacinalRoutes');
const medicamentosAnterioresRoutes = require('./routes/medicamentosAnterioresRoutes');
const internacoesAltasRoutes = require('./routes/internacoesAltasRoutes');
const procedimentosRealizadosRoutes = require('./routes/procedimentosRealizadosRoutes');
const historicoConsultasRoutes = require('./routes/historicoConsultasRoutes');
const notasEvolucaoRoutes = require('./routes/notasEvolucaoRoutes');


// Configuração de arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registro das rotas
app.use('/auth', authRoutes);
app.use('/pacientes', pacienteRoutes); 
app.use('/informacoesmedicas', informacoesMedicasRoutes);
app.use('/pedido-exames', pedidoExamesRoutes);
app.use('/prescricao-medica', prescricaoMedicaRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/soap', soapRoutes);
app.use('/atestado', atestadoRoutes);
app.use('/dados', dadosPaciente);
app.use('/exames-realizados', examesRealizadosRoutes);
app.use('/historico-vacinal', historicoVacinalRoutes);
app.use('/medicamentos-anteriores', medicamentosAnterioresRoutes);
app.use('/internacoes-altas', internacoesAltasRoutes);
app.use('/procedimentos-realizados', procedimentosRealizadosRoutes);
app.use('/historico-consultas', historicoConsultasRoutes);
app.use('/notas-evolucao', notasEvolucaoRoutes);


// Inicia o servidor
app.listen(PORT, () => { 
  console.log(`Servidor rodando na porta ${PORT}`);
});
