const fs = require('fs');
const etudiants = require('./data.json');

exports.calculmoy = (req, res) => {
  const binaryData = fs.readFileSync('data.json');
  const data = JSON.parse(binaryData);
  //  Calcul de la moyenne pour chaque étudiant
  data.forEach((student) => {
    let sum = 0;
    student.modules.forEach((module) => {
      sum += module.note;
    });
    const result = sum / student.modules.length;
    student.moyenne = result;
  });
  // Envoyer la liste d' étudiants avec leurs moyennes
  res.json(data);
};

exports.afficher = (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const result = [];

  data.forEach((student) => {
    let minNote = Infinity;
    let maxNote = -Infinity;
    let minModule = null;
    let maxModule = null;

    student.modules.forEach((module) => {
      if (module.note < minNote) {
        minNote = module.note;
        minModule = module.module;
      }
      if (module.note > maxNote) {
        maxNote = module.note;
        maxModule = module.module;
      }
    });

    result.push({
      nom: student.nom,
      classe: student.classe,
      meilleureNote: { module: maxModule, note: maxNote },
      moindreNote: { module: minModule, note: minNote },
    });
  });

  res.json(result);
};

exports.moyenneGenerale = (req, res) => {
  let totalNotes = 0;
  let totalEtudiants = etudiants.length;

  for (let i = 0; i < totalEtudiants; i++) {
    totalNotes += etudiants[i].moyenne;
  }

  let moyenneGenerale = totalNotes / totalEtudiants;

  res.send(`La moyenne générale des etudiants est : ${moyenneGenerale}`);
};
