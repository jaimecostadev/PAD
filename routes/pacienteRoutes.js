const express = require('express');
const router = express.Router();
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

// Endpoint para cadastrar um novo paciente com upload de foto
router.post('/', upload.single('foto'), async (req, res) => {
  const {
    nome,
    dataNascimento,
    idade,
    sexo,
    altura,
    peso,
    endereco,
    telefoneContato,
    telefoneEmergencia,
    diagnosticoPrincipal,
    alergiasRestricoes,
    planoSaude,
    consultasRecentes,
    internacoesRecentes,
    dataUltimaConsulta,
    descricao,
    funcionarioId,
    cpf // Adicione cpf aqui para extrair o valor do req.body
  } = req.body;

  const foto = req.file ? req.file.filename : null;
  const alturaMetros = parseFloat(altura);
  const pesoKg = parseFloat(peso);
  let imc = null;
  if (alturaMetros && pesoKg) {
    imc = pesoKg / (alturaMetros * alturaMetros);
    imc = parseFloat(imc.toFixed(1));
  }

  const dataUltimaConsultaFormatada = new Date(dataUltimaConsulta.split('/').reverse().join('-'));
  if (isNaN(dataUltimaConsultaFormatada)) {
    return res.status(400).json({ error: "Data da última consulta é inválida." });
  }

  try {
    const novoPaciente = await prisma.paciente.create({
      data: {
        nome,
        dataNascimento: new Date(dataNascimento),
        idade: parseInt(idade, 10),
        sexo,
        altura: alturaMetros,
        peso: pesoKg,
        imc,
        foto,
        endereco,
        telefoneContato,
        telefoneEmergencia,
        funcionario: { connect: { id: funcionarioId } },
        cpf // Aqui o cpf já está extraído corretamente
      },
    });

    const novaInformacaoMedica = await prisma.informacoesMedicas.create({
      data: {
        diagnosticoPrincipal,
        alergiasRestricoes,
        planoSaude,
        consultas: consultasRecentes === 'Sim',
        internacoes: internacoesRecentes === 'Sim',
        dataUltimaConsulta: dataUltimaConsultaFormatada,
        descricao,
        paciente: { connect: { id: novoPaciente.id } },
      },
    });

    res.status(201).json({ novoPaciente, novaInformacaoMedica });
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    res.status(500).json({ error: 'Erro ao cadastrar paciente', details: error.message });
  }
});


// Método GET para listar pacientes
router.get('/', async (req, res) => {
  const { funcionarioId } = req.query;

  try {
    const pacientes = await prisma.paciente.findMany({
      where: funcionarioId ? { funcionarioId } : {},
    });
    res.json(pacientes);
  } catch (error) {
    console.error('Erro ao buscar Pacientes:', error.message);
    res.status(500).json({ error: 'Erro ao buscar Pacientes', details: error.message });
  }
});

// Método GET para buscar paciente por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
      include: { informacoesMedicas: true },
    });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    const { id: _, funcionarioId, informacoesMedicas, ...pacienteData } = paciente;
    const informacoesMedicasData = informacoesMedicas.map(({ id, pacienteId, ...rest }) => rest);

    res.json({ ...pacienteData, informacoesMedicas: informacoesMedicasData });
  } catch (error) {
    console.error('Erro ao buscar informações do paciente:', error);
    res.status(500).json({ error: 'Erro ao buscar informações do paciente' });
  }
});

// Método PUT para atualizar um paciente
router.put('/:id', upload.single('foto'), async (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, sexo, altura, peso, endereco, telefoneContato, telefoneEmergencia } = req.body;

  let foto = null;
  if (req.file) {
    foto = req.file.filename;
  }

  try {
    const pacienteAtualizado = await prisma.paciente.update({
      where: { id },
      data: {
        nome,
        dataNascimento: new Date(dataNascimento),
        sexo,
        altura: parseFloat(altura),
        peso: parseFloat(peso),
        foto: foto || undefined,
        endereco,
        telefoneContato,
        telefoneEmergencia,
      },
    });

    res.json(pacienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).json({ error: 'Erro ao atualizar paciente' });
  }
});

// Método DELETE para excluir um paciente e informações médicas
router.delete('/', async (req, res) => {
  try {
    await prisma.informacoesMedicas.deleteMany();
    await prisma.paciente.deleteMany();
    res.status(200).json({ message: 'Todos os pacientes e informações médicas foram deletados com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar pacientes:', error);
    res.status(500).json({ error: 'Erro ao deletar pacientes' });
  }
});

module.exports = router;
