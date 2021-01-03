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

  return api;
};
