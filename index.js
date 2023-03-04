const express = require('express');
const bodyParser = require('body-parser');

const {
  getData,
  createStudent,
  deleteStudent,
  updateStudent,
} = require('./CRUD');

const {
  moyenneGenerale,
  calculmoy,
  afficher,
  moyennesclasse,
} = require('./OTHER-FUNCTIONS');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // for parsing application/json

app.get('/get', getData);

app.post('/create', createStudent);

app.delete('/delete/:nom', deleteStudent);

app.put('/put/:nom', updateStudent);

app.get('/get-moy', calculmoy);

app.get('/afficher', afficher);

app.get('/moy-classes', moyenneGenerale);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
