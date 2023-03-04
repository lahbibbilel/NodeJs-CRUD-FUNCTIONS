const fs = require('fs');
const Joi = require('joi');

exports.getData = (req, res) => {
  const binaryData = fs.readFileSync('data.json');
  const data = JSON.parse(binaryData);

  res.json(data);
};

exports.createStudent = async (req, res) => {
  const newData = req.body;
  const schema = Joi.object({
    nom: Joi.string().required(),
    classe: Joi.string().required(),
    modules: Joi.array().required(),
    moyenne: Joi.number().required(),
  });
  schema.validate({});

  try {
    await schema.validateAsync({
      nom: newData.nom,
      classe: newData.classe,
      modules: newData.modules,
      moyenne: newData.moyenne,
    });
  } catch (err) {
    return res.send('erreur creation');
  }

  const binaryData = fs.readFileSync('data.json');
  const data = JSON.parse(binaryData);
  const newStudent = {
    nom: newData.nom,
    classe: newData.classe,
    modules: newData.modules,
    moyenne: newData.moyenne,
  };

  data.push(newStudent);

  const stringData = JSON.stringify(data);
  fs.writeFileSync('data.json', stringData);

  res.json(data);
};

exports.deleteStudent = (req, res) => {
  const nom = req.params.nom;
  // read in json file
  const binaryData = fs.readFileSync('data.json');
  const data = JSON.parse(binaryData);

  const index = data.findIndex((item) => item.nom === nom);
  if (index === -1) {
    return res.send('student not found !');
  }
  data.splice(index, 1);

  // white in json file
  const stringData = JSON.stringify(data);
  fs.writeFileSync('data.json', stringData);

  res.json(data);
};

exports.updateStudent = (req, res) => {
  const nom = req.params.nom;
  const newData = req.body;
  const binaryData = fs.readFileSync('data.json');
  const data = JSON.parse(binaryData);

  const updatedData = data.map((item) => {
    if (item.nom === nom) {
      const newItem = {
        nom: nom,
        classe: newData.classe,
        modules: newData.modules,
        moyenne: newData.moyenne,
      };
      5;
      return newItem;
    }
    return item;
  });

  const stringData = JSON.stringify(updatedData);
  fs.writeFileSync('data.json', stringData);

  res.json(updatedData);
};
