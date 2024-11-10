// prisma/medicamentosSeed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function medicamentosSeed() {
  const medicamentos = [
    { nome: "Alopurinol comp. 100mg", descricao: "Antigotoso" },
    { nome: "Alopurinol comp. 100mg", descricao: "Antigotoso" },
    { nome: "Alopurinol comp. 300mg", descricao: "Antigotoso" },
    { nome: "Diclofenaco comp. 50mg", descricao: "Anti-inflamatório e antireumático" },
    { nome: "Dipirona 500mg/mL -gotas", descricao: "Analgésico e antipirético" },
    { nome: "Ibuprofeno gotas 50mg/mL", descricao: "Anti-inflamatório e antireumático" },
    { nome: "Nimesulida 100mg", descricao: "Anti-inflamatório e antireumático" },
    { nome: "Paracetamol 200mg/mL", descricao: "Analgésico e antipirético" },
    { nome: "Prednisona comp. 5mg", descricao: "Corticóides" },
    { nome: "Prednisona comp. 20mg", descricao: "Corticóides" },
    { nome: "Prednisolona 3mg/mL xarope", descricao: "Corticoides" },
    { nome: "Dexclorfeniramina comprimido 2mg", descricao: "Anti-histaminico" },
    { nome: "Loratadina 1mg/mL- xarope", descricao: "Anti-histaminico de 2 geração" },
    { nome: "Loratadina comp. 10mg", descricao: "Anti-histaminico de 2 geração" },
    { nome: "Prednisolona 3mg/mL xarope", descricao: "Corticoides" },
    { nome: "Prednisona comp. 5mg", descricao: "Corticóides" },
    { nome: "Prednisona comp. 20mg", descricao: "Corticóides" },
    { nome: "Salbutamol 0,04%- xarope", descricao: "Agonistas seletivos β-2- adrenérgicos" },
    { nome: "Cimetidina comp. 200mg", descricao: "Anti-secretores" },
    { nome: "Hidroxido de Aluminio susp oral", descricao: "Anti-ácidos" },
    { nome: "Hioscina 10mg/mL", descricao: "Antiespasmodico" },
    { nome: "Metoclopramida comp. 10mg", descricao: "Propulsivos" },
    { nome: "Oleo mineral c/ 100mL", descricao: "Laxante" },
    { nome: "Omeprazol cáps.20mg", descricao: "Anti-secretores" },
    { nome: "Ranitidina comp. 150mg", descricao: "Anti-secretores" },
    { nome: "Acido fólico 5mg comp.", descricao: "Preparações antianêmicas" },
    { nome: "Complexo B comp.", descricao: "Vitaminas" },
    { nome: "Polivitamico e Minerais comp.", descricao: "Vitaminas" },
    { nome: "Polivitaminico gotas", descricao: "Vitaminas" },
    { nome: "Tiamina comp. 300mg", descricao: "Vitaminas" },
    { nome: "Aciclovir comp. 250mg", descricao: "Antiviral" },
    { nome: "Amoxicilina cáps. 500mg", descricao: "Penicilinas" },
    { nome: "Amoxicilina 250mg/5mL", descricao: "Penicilinas" },
    { nome: "Azitromicina comp. 500mg", descricao: "Macrolidicos" },
    { nome: "Azitromicina 40mg/mL", descricao: "Macrolidicos" },
    { nome: "Cefalexina cáps. 500mg", descricao: "Cefalosporina 1 geração" },
    { nome: "Cefalexina susp. Oral 250mg/5mL", descricao: "Cefalosporina 1 geração" },
    { nome: "Cetoconazol comp. 200mg", descricao: "Antifúngicos" },
    { nome: "Cloranfenicol colírio", descricao: "Anfenicois" },
    { nome: "Fluconazol cáps. 150mg", descricao: "Antifúngicos" },
    { nome: "Itraconazol caps 100mg", descricao: "Antifúngicos" },
    { nome: "Sulfametoxazol + Trimetoprima comp. 400: 80mg", descricao: "Sulfonamidas" },
    { nome: "Sulfametoxazol + Trimetoprima susp. Oral 200:40mg/5mL", descricao: "Sulfonamidas" },
    { nome: "Mebendazol comp. 100mg", descricao: "Anti-helminticos" },
    { nome: "Mebendazol susp.", descricao: "Anti-helminticos" },
    { nome: "Metronidazol comp. 250mg", descricao: "Antiprotozoários" },
    { nome: "Metronidazol susp. Oral 4%", descricao: "Antiprotozoários" },
    { nome: "Glibenclamida comp. 5mg", descricao: "Sulfoniuréias" },
    { nome: "Glicazida 30mg", descricao: "Sulfoniuréias" },
    { nome: "Insulina Humana NPH 100IU/mL", descricao: "Insulina" },
    { nome: "Insulina Humana Regular 100UI/mL", descricao: "Insulina" },
    { nome: "Metformina comp. 500 e 850mg", descricao: "Biguanidas" },
    { nome: "Cetoconazol 2% creme", descricao: "Antifungicos" },
    { nome: "Dexametasona creme 0,1%", descricao: "Corticosteroides" },
    { nome: "Neomicina Ass Bacitracina", descricao: "Antibacterino Ass" },
    { nome: "Cloranfenicol 4% C/5mL", descricao: "Antibióticos" },
    { nome: "Fluormetalona 0,1% c/5mL", descricao: "Corticoide" },
    { nome: "Neomicina/ Polimixina B/", descricao: "Antibacteriano Ass" },
    { nome: "Lidocaína/ Acetonida sol. Otológica", descricao: "Associação de anestésico e corticosteroide" },
    { nome: "Levotiroxina comp. 50mcg", descricao: "Hormonios tiroidianos" },
    { nome: "Levotiroxina comp. 100mcg", descricao: "Hormonios tiroidianos" },
    { nome: "Àcido Acetilsalicilico comp. 100mg", descricao: "Antitrombóticos" },
    { nome: "Anlodipino comp. 5mg", descricao: "Bloq. Canal de cálcio" },
    { nome: "Atenolol comp. 50 e 100mg", descricao: "B-Bloqueadores" },
    { nome: "Captopril comp. 25mg", descricao: "Inibidor da ECA" },
    { nome: "Carvedilol comp. 6,25mg", descricao: "B-Bloqueadores" },
    { nome: "Carvedilol comp. 25mg", descricao: "B-Bloqueadores" },
    { nome: "Cumarina 15mg Troxerrutina 90mg", descricao: "Hemostipticos" },
    { nome: "Enalapril comp. 20mg", descricao: "Inibidoe da ECA" },
    { nome: "Espironolactona 100mg", descricao: "Diurético poupador K" },
    { nome: "Furosemida comp. 40mg", descricao: "Diureticos de Alça" },
    { nome: "Hidroclorotiazida comp. 25mg", descricao: "Diuréticos tiazídicos" },
    { nome: "Metildopa comp. 250mg", descricao: "Agonista α2 de ação centra" },
    { nome: "Nifedipino comp. 20mg", descricao: "Bloq. Canal de cálcio" },
    { nome: "Propranolol comp. 40mg", descricao: "Antiarritmicos" },
    { nome: "Sinvastatina comp. 20mg e 40mg", descricao: "Antilipemicos" },
    { nome: "Varfarina comp. 5mg", descricao: "Anticoagulante" },
    { nome: "DIU", descricao: "Contraceptivo" },
    { nome: "Etinilestradiol 0,03mg + Levonorgestrel 0,15mg drágea", descricao: "Contraceptico hormonal" },
    { nome: "Levonorgestrel comp. 0,75mg", descricao: "Contraceptico emergência" },
    { nome: "Medroxiprogesterona injet 150mg/mL", descricao: "Contraceptico hormonal" },
    { nome: "Metronidazol geléia vaginal 10%", descricao: "Antiprotozoário" },
    { nome: "Miconazol creme vaginal 2%", descricao: "Antifúngico" }
  ];
 
  try {
    for (const medicamento of medicamentos) {
      await prisma.medicamentoPrescricao.create({
        data: medicamento,
      });
    }
    console.log('Medicamentos seed executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar a seed de medicamentos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute a função
medicamentosSeed();
