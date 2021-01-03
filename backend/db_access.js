module.exports = function (Constants) {
  var mongoClient = require("mongodb").MongoClient;

  const { ObjectId } = require("mongodb");

  var db = null;
  var dbFunctions = {};

  var PILLEADAS_COLLECTION = Constants.PILLEADAS_COLLECTION;
  var SUGERENCIAS_COLLECTION = Constants.SUGERENCIAS_COLLECTION;

  dbFunctions.initialize = async function initialize(DB, DB_URL) {
    return new Promise(function (resolve, reject) {
      mongoClient.connect(DB_URL, function (err, dbi) {
        if (err) throw err;
        // store reference
        db = dbi.db(DB);
        resolve();
      });
    });
  };

  dbFunctions.findPilleadas = async function () {
    var query = {};
    return await db.collection(PILLEADAS_COLLECTION).find(query).toArray();
  };

  return dbFunctions;
};
