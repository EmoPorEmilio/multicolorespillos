"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = "node-coloridospillos";

//* DEPENDENCIES *//
var environment = require("./environment");
var express = require("express");
var Constants = require("./constants");
var Utils = require("./utils");
var db = require("./db_access")(Constants);
var bodyParser = require("body-parser");
var api = require("./api")(Constants, Crypto, Utils, db);

//* EXPRESS INIT *//
var app = express();
app.use(express.static(environment.APP_BASE_PATH + "public"));
app.use(bodyParser.json({ limit: "5mb" }));

//* INITIALIZE SERVER *//

/*
async function initializeServer() {
  await db.initialize(environment.DB, environment.DB_URL);

  //TODO: search for information to have on cache
}

initializeServer();
*/

//* ENDPOINTS *//

/*
app.get("/*", function (req, res) {
  res.send("/home/ark/public/index.html");
});

app.post("/api/login", function (req, res) {
  api.login(req, res);
});*/

app.all("*", (_req, res) => {
  try {
    res.sendFile(environment.APP_BASE_PATH + "public/index.html");
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

app.listen(environment.EXPRESS_PORT, function () {
  console.log(
    "ColoridosPillos corriendo en el puerto " + environment.EXPRESS_PORT
  );
});