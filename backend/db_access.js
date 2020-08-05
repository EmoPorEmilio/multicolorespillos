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

  dbFunctions.logUserAndRetrieveData = async function (username, password) {
    var query = {};
    if (username != undefined) {
      query.username = username;
    } else {
      return undefined;
    }
    if (password != undefined) {
      query.password = password;
    } else {
      return undefined;
    }
    let user = await db.collection(USERS_COLLECTION).findOne(query);
    if (user && user.companies) {
      let companies = [];
      for (let i = 0; i < user.companies.length; i++) {
        let company = await this.findCompanyById(user.companies[i]);
        companies.push({ _id: company._id, name: company.name });
      }
      user.companies = companies;
      return user;
    } else {
      return undefined;
    }
  };

  dbFunctions.logUserAndRetrieveData = async function (username, password) {
    var query = {};
    if (username != undefined) {
      query.username = username;
    } else {
      return undefined;
    }
    if (password != undefined) {
      query.password = password;
    } else {
      return undefined;
    }
    let user = await db.collection(USERS_COLLECTION).findOne(query);
    if (user && user.companies) {
      let companies = [];
      for (let i = 0; i < user.companies.length; i++) {
        let company = await this.findCompanyById(user.companies[i]);
        companies.push({ _id: company._id, name: company.name });
      }
      user.companies = companies;
      return user;
    } else {
      return undefined;
    }
  };

  dbFunctions.changeUserPassword = async function (id, password) {
    var query = {};
    query._id = ObjectId(id);

    var updateObj = { $set: { password: password } };

    return await db.collection(USERS_COLLECTION).updateOne(query, updateObj);
  };

  //COMPANY FUNCTIONS

  dbFunctions.findCompanyById = async function (id) {
    var query = {};
    if (id != undefined) {
      query._id = ObjectId(id);
    } else {
      return undefined;
    }
    return await db.collection(COMPANIES_COLLECTION).findOne(query);
  };

  dbFunctions.addAnnotationToCompany = async function (id, annotation) {
    var query = { _id: ObjectId(id) };
    let company = await db.collection(COMPANIES_COLLECTION).findOne(query);
    let annotations = [];
    if (company.annotations) {
      annotations = company.annotations;
    }
    annotations.push(annotation);
    var updateObj = { $set: { annotations: annotations } };

    return await db
      .collection(COMPANIES_COLLECTION)
      .updateOne(query, updateObj);
  };

  dbFunctions.removeAnnotationFromCompany = async function (id, annotation) {
    var query = { _id: ObjectId(id) };
    let company = await db.collection(COMPANIES_COLLECTION).findOne(query);
    let annotations = company.annotations;
    let resolvedAnnotations = company.resolvedAnnotations;

    for (let i = annotations.length - 1; i >= 0; i--) {
      if (
        annotations[i].name == annotation.name &&
        annotations[i].description == annotation.description
      ) {
        annotations.splice(i, 1);
      }
    }

    if (resolvedAnnotations) {
      resolvedAnnotations.push(annotation);
    } else {
      resolvedAnnotations = [annotation];
    }

    var updateObj = {
      $set: {
        annotations: annotations,
        resolvedAnnotations: resolvedAnnotations,
      },
    };

    await db.collection(COMPANIES_COLLECTION).updateOne(query, updateObj);

    return annotations;
  };

  //CONSTRUCTION FUNCTIONS

  async function addConstructionToCompany(companyId, constructionId) {
    var query = { _id: ObjectId(companyId) };
    let company = await db.collection(COMPANIES_COLLECTION).findOne(query);
    let constructions = company.constructions;
    constructions.push(constructionId);
    var updateObj = { $set: { constructions: constructions } };
    return await db
      .collection(COMPANIES_COLLECTION)
      .updateOne(query, updateObj);
  }

  dbFunctions.findConstructionById = async function (id) {
    var query = {};
    if (id != undefined) {
      query._id = ObjectId(id);
    } else {
      return undefined;
    }
    let construction = await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .findOne(query);
    if (construction.tasks) {
      let tasks = [];
      let taskQuery = {};
      for (let i = 0; i < construction.tasks.length; i++) {
        taskQuery = { _id: ObjectId(construction.tasks[i]) };
        let task = await db.collection(TASKS_COLLECTION).findOne(taskQuery);
        if (!(task.status == Constants.TaskStatusEnum.FINISHED)) {
          tasks.push(task);
        }
      }
      construction.tasks = tasks;
    }
    return construction;
  };

  dbFunctions.addConstruction = async function (companyId, construction) {
    await db.collection(CONSTRUCTIONS_COLLECTION).insertOne(construction);
    await addConstructionToCompany(companyId, construction._id);
    return construction;
  };

  dbFunctions.updateConstruction = async function (constructionId, updates) {
    var query = { _id: ObjectId(constructionId) };
    var updateObj = { $set: updates };
    return awaitdb
      .collection(CONSTRUCTIONS_COLLECTION)
      .updateOne(query, updateObj);
  };

  dbFunctions.deleteConstruction = async function (constructionId) {
    var query = { _id: ObjectId(constructionId) };

    return await db.collection(CONSTRUCTIONS_COLLECTION).deleteOne(query);
  };
  //

  //WORKER FUNCTIONS

  async function addWorkerToCompany(companyId, workerId) {
    var query = { _id: ObjectId(companyId) };
    let company = await db.collection(COMPANIES_COLLECTION).findOne(query);
    let workers = company.workers;
    workers.push(workerId);
    var updateObj = { $set: { workers: workers } };
    return await db
      .collection(COMPANIES_COLLECTION)
      .updateOne(query, updateObj);
  }

  async function addWorkerToConstruction(constructionId, workerId) {
    var query = { _id: ObjectId(constructionId) };
    let construction = await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .findOne(query);
    let workers = construction.workers;
    workers.push(workerId);
    var updateObj = { $set: { workers: workers } };
    return await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .updateOne(query, updateObj);
  }

  dbFunctions.findWorkerById = async function (id) {
    var query = {};
    if (id != undefined) {
      query._id = ObjectId(id);
    } else {
      return undefined;
    }
    return await db.collection(WORKERS_COLLECTION).findOne(query);
  };

  dbFunctions.addWorker = async function (companyId, worker) {
    await db.collection(WORKERS_COLLECTION).insertOne(worker);
    await addWorkerToCompany(companyId, worker._id);
    if (worker.constructionId) {
      await addWorkerToConstruction(worker.constructionId, worker._id);
    }
    return worker;
  };

  dbFunctions.updateWorker = async function (workerId, updates) {
    var query = { _id: ObjectId(workerId) };
    var updateObj = { $set: updates };
    return awaitdb.collection(WORKERS_COLLECTION).updateOne(query, updateObj);
  };

  dbFunctions.deleteWorker = async function (workerId) {
    var query = { _id: ObjectId(workerId) };

    return await db.collection(WORKERS_COLLECTION).deleteOne(query);
  };
  //

  //TASK FUNCTIONS

  async function addTaskToConstruction(constructionId, taskId) {
    var query = { _id: ObjectId(constructionId) };
    let construction = await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .findOne(query);
    let tasks = [];
    if (construction.tasks) {
      tasks = construction.tasks;
    }
    tasks.push(taskId);
    var updateObj = { $set: { tasks: tasks } };

    return await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .updateOne(query, updateObj);
  }

  async function removeTaskFromConstruction(constructionId, taskId) {
    var query = { _id: ObjectId(constructionId) };
    let construction = await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .findOne(query);
    let tasks = [];
    if (construction.tasks) {
      tasks = construction.tasks;
    }
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i]._id == taskId) {
        tasks.splice(i, 1);
      }
    }
    var updateObj = { $set: { tasks: tasks } };

    return await db
      .collection(CONSTRUCTIONS_COLLECTION)
      .updateOne(query, updateObj);
  }

  async function addTaskToWorker(workerId, taskId) {
    var query = { _id: ObjectId(workerId) };
    let worker = await db.collection(WORKERS_COLLECTION).findOne(query);
    let tasks = [];
    if (worker.tasks) {
      tasks = worker.tasks;
    }
    tasks.push(taskId);
    var updateObj = { $set: { tasks: tasks } };

    return await db.collection(WORKERS_COLLECTION).updateOne(query, updateObj);
  }

  async function removeTaskFromWorker(workerId, taskId) {
    var query = { _id: ObjectId(workerId) };
    let worker = await db.collection(WORKERS_COLLECTION).findOne(query);
    let tasks = [];
    if (worker.tasks) {
      tasks = worker.tasks;
    }
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i] == taskId) {
        tasks.splice(i, 1);
      }
    }
    var updateObj = { $set: { tasks: tasks } };

    return await db.collection(WORKERS_COLLECTION).updateOne(query, updateObj);
  }

  dbFunctions.addTask = async function (constructionId, task) {
    await db.collection(TASKS_COLLECTION).insertOne(task);

    for (let i = 0; i < task.workers.length; i++) {
      await addTaskToWorker(task.workers[i], task._id);
    }

    await addTaskToConstruction(constructionId, task._id);
    return task;
  };

  dbFunctions.updateTask = async function (task) {
    let taskFromDb = await db
      .collection(TASKS_COLLECTION)
      .findOne({ _id: ObjectId(task._id) });
    if (task.constructionId != taskFromDb.constructionId) {
      await removeTaskFromConstruction(
        taskFromDb.constructionId,
        taskFromDb._id
      );
      await addTaskToConstruction(task.constructionId, task._id);
    }
    let workersToRemove = [];
    let workersToAdd = [];

    if (taskFromDb.workers) {
      for (let i = 0; i < taskFromDb.workers.length; i++) {
        let toRemove = true;
        for (let j = 0; j < task.workers.length; j++) {
          if (task.workers[j]._id == taskFromDb.workers[i]._id) {
            toRemove = false;
          }
        }
        if (toRemove) {
          workersToRemove.push(taskFromDb.workers[i]);
        }
      }

      for (let i = 0; i < task.workers.length; i++) {
        let toAdd = true;
        for (let j = 0; j < taskFromDb.workers.length; j++) {
          if (task.workers[i]._id == taskFromDb.workers[j]._id) {
            toAdd = false;
          }
        }
        if (toAdd) {
          workersToAdd.push(task.workers[i]);
        }
      }
    } else {
      workersToAdd = task.workers;
    }

    for (let i = 0; i < workersToRemove.length; i++) {
      await removeTaskFromWorker(workersToRemove[i], task._id);
    }

    for (let i = 0; i < workersToAdd.length; i++) {
      await addTaskToWorker(workersToAdd[i], task._id);
    }

    var query = { _id: ObjectId(task._id) };
    var updateObj = {
      $set: {
        name: task.name,
        startDate: task.startDate,
        endDate: task.endDate,
        constructionId: task.constructionId,
        workers: task.workers,
      },
    };

    return await db.collection(TASKS_COLLECTION).updateOne(query, updateObj);
  };

  dbFunctions.processTask = async function (taskId, actualEndDate) {
    var query = { _id: ObjectId(taskId) };
    var updateObj = {
      $set: {
        status: Constants.TaskStatusEnum.FINISHED,
        actualEndDate: actualEndDate,
      },
    };
    return await db.collection(TASKS_COLLECTION).updateOne(query, updateObj);
  };

  dbFunctions.continueTask = async function (taskId) {
    var query = { _id: ObjectId(taskId) };
    var updateObj = {
      $set: {
        status: Constants.TaskStatusEnum.IN_PROGRESS,
      },
    };
    return await db.collection(TASKS_COLLECTION).updateOne(query, updateObj);
  };

  dbFunctions.stopTask = async function (taskId) {
    var query = { _id: ObjectId(taskId) };
    var updateObj = {
      $set: {
        status: Constants.TaskStatusEnum.STOPPED,
      },
    };
    return await db.collection(TASKS_COLLECTION).updateOne(query, updateObj);
  };

  dbFunctions.deleteTask = async function (taskId) {
    var query = { _id: ObjectId(taskId) };

    return await db.collection(TASKS_COLLECTION).deleteOne(query);
  };

  return dbFunctions;
};
