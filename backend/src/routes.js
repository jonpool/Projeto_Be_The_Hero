const express = require('express');

const ongController = require('./controllers/ongControllers');
const incidentsController = require('./controllers/incidentColtrollers');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

//get ongs
routes.get('/ongs', ongController.index);
//post ong
routes.post('/ongs', ongController.create);
//get profile
routes.get('/profile', profileController.index)
//post incidents
routes.post('/incidents',incidentsController.create);
//get incidents
routes.get('/incidents',incidentsController.index);
//delet incidents
routes.delete('/incidents/:id',incidentsController.delete);

//login
routes.post('/session',sessionController.create);



























//post user
routes.post('/users', (request, response)=>{
  const body = request.body;
  console.log(body);

  return response.json({
    evento: 'teste',
    aluno: 'joao silva'
  });  
});


//request query
routes.get('/users1', (request, response)=>{
  const params = request.query;
  console.log(params);

  return response.json({
    evento: 'semana Omnistack 11.0',
    aluno: 'joao silva'
  });  
});


//request params
routes.get('/users/:id', (request, response)=>{
  const params = request.params;
  console.log(params);

  return response.json({
    evento: 'semana Omnistack 11.0',
    aluno: 'joao silva'
  });  
});

module.exports = routes;