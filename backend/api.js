module.exports = function (Constants, Crypto, Utils, db) {
  let api = {};

  api.login = async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let response = { error: true, type: "" };
    res.status(400);

    if (req.session.login == true) {
      //if user is already logged don't try to log again
      response.user = req.session.user;
      response.error = false;
      res.status(200);
      response.token = req.sessionID;
    } else {
      if (!username || username.length == 0) {
        response.type = "missingUsername";
        res.send(response);
        return;
      }

      if (!password || password.length == 0) {
        response.type = "missingPassword";
        res.send(response);
        return;
      }

      let passwordHash = Crypto.createHash("sha256")
        .update(password)
        .digest("base64");

      let user = await db.logUserAndRetrieveData(username, passwordHash);
      if (user && user.username && user.companies) {
        let userResponse = {
          username: user.username,
          companies: user.companies,
          _id: user._id,
        };
        response.user = userResponse;
        response.error = false;
        res.status(200);
        req.session.login = true;
        req.session.user = userResponse;
        response.token = req.sessionID;
      }
      res.send(response);
    }
  };

  api.changePassword = async function changePassword(req, res) {
    let newPassword = req.body.newPassword;

    let response = { error: true, type: "" };
    res.status(400);

    if (Utils.isUserLoggedIn(req)) {
      let passwordHash = Crypto.createHash("sha256")
        .update(newPassword)
        .digest("base64");

      await db.changeUserPassword(req.session.user._id, passwordHash);
      response.error = false;
      res.status(200);
      res.send(response);
    } else {
      res.send(response);
    }
  };

  //*GETTERS*//
  api.getUserData = async function getUserData(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      response.user = req.session.user;
      res.status(200);
      res.send(response);
    } else {
      response.user = {};
      res.status(200);
      res.send(response);
    }
  };
  api.getCompanies = async function getCompanies(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      let data = await db.findUser(req.session.user.username);
      if (data && data[0] && data[0].companies) {
        let companies = [];

        for (let i = 0; i < data[0].companies.length; i++) {
          companies.push(await db.findCompanyById(data[0].companies[i]));
        }
        response.companies = companies;
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.getConstructions = async function getConstructions(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      let company = await db.findCompanyById(req.query.company);
      if (company && company.constructions) {
        let constructions = [];
        for (let i = 0; i < company.constructions.length; i++) {
          constructions.push(
            await db.findConstructionById(company.constructions[i])
          );
        }
        response.constructions = constructions;
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.getWorkers = async function getWorkers(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      let company = await db.findCompanyById(req.query.company);
      if (company && company.workers) {
        let workers = [];
        for (let i = 0; i < company.workers.length; i++) {
          workers.push(await db.findWorkerById(company.workers[i]));
        }
        response.workers = workers;
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.getAnnotations = async function getAnnotations(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      let company = await db.findCompanyById(req.query.company);
      if (company) {
        let annotations = [];
        if (company.annotations) {
          annotations = company.annotations;
        }
        response.annotations = annotations;
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  //* POST *//

  api.postConstruction = async function postConstruction(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.construction && req.body.companyId) {
        req.body.construction.workers = [];
        response.construction = await db.addConstruction(
          req.body.companyId,
          req.body.construction
        );
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.postWorker = async function postWorker(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.worker && req.body.companyId) {
        response.worker = await db.addWorker(
          req.body.companyId,
          req.body.worker
        );
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.postAnnotation = async function postAnnotation(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.annotation && req.body.companyId) {
        await db.addAnnotationToCompany(
          req.body.companyId,
          req.body.annotation
        );
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.resolveAnnotation = async function resolveAnnotation(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.annotation && req.body.companyId) {
        let annotations = await db.removeAnnotationFromCompany(
          req.body.companyId,
          req.body.annotation
        );
        response.annotations = annotations;
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.postTask = async function postTask(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.task && req.body.constructionId) {
        response.task = await db.addTask(
          req.body.constructionId,
          req.body.task
        );
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.updateTask = async function postTask(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.task && req.body.taskId) {
        let task = req.body.task;
        task._id = req.body.taskId;
        await db.updateTask(task);
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.processTask = async function processTask(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.taskId && req.body.actualEndDate) {
        await db.processTask(req.body.taskId, req.body.actualEndDate);
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.stopTask = async function stopTask(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.taskId) {
        await db.stopTask(req.body.taskId);
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  api.continueTask = async function continueTask(req, res) {
    let response = {};
    if (Utils.isUserLoggedIn(req)) {
      if (req.body.taskId) {
        await db.continueTask(req.body.taskId);
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(response);
      }
    } else {
      res.status(401);
      res.send(response);
    }
  };

  return api;
};
