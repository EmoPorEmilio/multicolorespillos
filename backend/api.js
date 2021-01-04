module.exports = function (Constants, db) {
  let api = {};

  api.getPilleadas = async function getPilleadas(req, res) {
    let response = {};
    try {
      response.pilleadas = await db.findPilleadas();
      res.status(200);
      res.send(response);
    }
    catch(error) {
      response.error = error;
      res.status(500);
      res.send(response);
    }
  };

  api.getSugerencias = async function getSugerencias(req, res) {
    let response = {};
    try {
      response.sugerencias = await db.findSugerencias();
      res.status(200);
      res.send(response);
    }
    catch(error) {
      response.error = error;
      res.status(500);
      res.send(response);
    }
  };

  api.postSugerencia = async function postSugerencia(req, res) {
    let response = {};
    try {
      if(req.body.title && req.body.body) {
        await db.addSugerencia(req.body.title, req.body.body);
        res.status(201);
        res.send(response);
      }
      else{
        res.status(400);
        res.send(response);
      }
    }
    catch(error) {
      response.error = error;
      res.status(500);
      res.send(response);
    }
  };

  return api;
};
