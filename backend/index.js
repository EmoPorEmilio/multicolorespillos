"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = "node-multicolorespillos";

//* DEPENDENCIES *//
var environment = require("./environment");
var express = require("express");
var Constants = require("./constants");
var Utils = require("./utils");
var db = require("./db_access")(Constants);
var bodyParser = require("body-parser");
var api = require("./api")(Constants, db);

//* EXPRESS INIT *//
var app = express();
app.use(express.static(environment.APP_BASE_PATH + "public"));
app.use(bodyParser.json({ limit: "5mb" }));

//* INITIALIZE SERVER *//

const cachedEvents = [];
async function initializeServer() {
  await db.initialize(environment.DB, environment.DB_URL);
  cachedEvents = await db.findPilleadas();
  cachedEvents = cachedEvents.sort(Utils.compareEvents);
  console.log(cachedEvents);
}

initializeServer();


//* ENDPOINTS *//

app.get("/api/pilleadas", function (req, res) {
  let response = {};
  try {
    response.pilleadas = cachedEvents;
    res.status(200);
    res.send(response);
  }
  catch(error) {
    response.error = error;
    res.status(500);
    res.send(response);
  }
});

app.get("/api/sugerencias", function (req, res) {
  api.getSugerencias(req, res);
});

app.post("/api/sugerencia", function (req, res) {
  api.postSugerencia(req, res);
});

app.all("*", (_req, res) => {
  try {
    res.sendFile(environment.APP_BASE_PATH + "public/index.html");
  } catch (error) {
    res.json({ success: false, message: "Ha ocurrido un error" });
  }
});


app.listen(environment.EXPRESS_PORT, function () {
  console.log(
    "MulticoloresPillos corriendo en el puerto " + environment.EXPRESS_PORT
  );
});
