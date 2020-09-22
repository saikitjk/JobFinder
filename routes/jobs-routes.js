/* eslint-disable prefer-arrow-callback */
const db = require("../models");
const { Op } = require("sequelize");

module.exports = function(app) {
  // GET route for getting all of the jobs
  app.get("/api/jobs/", function(req, res) {
    db.Jobs.findAll({}).then(function(jobsData) {
      console.log(jobsData);
      res.json(jobsData);
    });
  });

  // select * from Jobs where
  // (role = rolelike% or complete variable) OR (technology = techlike% or complete variable) OR
  // (joblocation = joblocationlike%) order by created_At DESC

  app.get("/api/jobs/:userSearch", function(req, res) {
    const searchValue = req.params.userSearch;
    db.Jobs.findAll({
      where: {
        searchValue: {
          [Op.or]: [
            {
              role: {
                [Op.like]: `%${searchValue}%`
              }
            },
            {
              technology: {
                [Op.like]: `%${searchValue}%`
              }
            },
            {
              company: {
                [Op.like]: `%${searchValue}%`
              }
            },
            {
              joblocation: {
                [Op.like]: `%${searchValue}%`
              }
            }
          ]
        }
      }
    }).then(function(jobsData) {
      console.log(jobsData);
      res.json(jobsData);
    });
  });

  // POST route for saving a new job
  app.post("/api/postjob", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)

    db.Jobs.create({
      role: req.body.role,
      description: req.body.description,
      technology: req.body.technology,
      company: req.body.company,
      jobtype: req.body.jobtype,
      salary: req.body.salary,
      joblocation: req.body.joblocation,
      contact: req.body.contact
      //Add userId foreign key here
    }).then(function(dbJob) {
      // We have access to the new todo as an argument inside of the callback function
      console.log("Job Inserted: " + dbJob);
      res.json(dbJob);
    });
  });
};
