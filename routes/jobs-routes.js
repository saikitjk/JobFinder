/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
const db = require("../models");
const { Op } = require("sequelize");

module.exports = function(app) {
  
  // GET route for getting all of the jobs
  app.get("/api/jobs/", function(req, res) {
    db.Jobs.findAll({}).then(function(jobsData) {

      // render 'alljobs' page by providing handlebars object as data from db
      res.render("alljobs", {
        job : jobsData });
    });
  });

  // GET route for getting search results for specific keyword
  app.get("/api/jobs/:userSearch", function(req, res) {
    const searchValue = req.params.userSearch;
    console.log("Search Value : "+searchValue);
    db.Jobs.findAll({
      where: { 
        [Op.or]: [
          {
            //To fetch the Jobs searched by Role
            role: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Technology
            technology: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by Company
            company: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            // To fetch Jobs searched by job location
            joblocation: {
              [Op.like]: `%${searchValue}%`
            }
          }
        ]
        
      }
    })
      .then(function(jobsData) {
        res.json(jobsData);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  // POST route for saving a new job
  app.post("/api/postjob", function(req, res) {
    
    console.log("Post Job: "+req.body);

    let {
      role,
      description,
      technology,
      company,
      jobtype,
      salary,
      joblocation,
      contact
    } = req.body;

    // Make lowercase
    role = role.toLowerCase();
    // Make lowercase and remove space after comma
    technology = technology.toLowerCase().replace(/,[ ]+/g, ",");
    // Make lowercase
    company = company.toLowerCase().replace(/,[ ]+/g, ",");

    // Make lowercase and remove space after comma
    joblocation = joblocation.toLowerCase().replace(/,[ ]+/g, ",");

    db.Jobs.create({
      role: role,
      description: description,
      technology: technology,
      company: company,
      jobtype: jobtype,
      salary: salary,
      joblocation: joblocation,
      contact: contact
      //Add userId foreign key here
    // eslint-disable-next-line no-unused-vars
    }).then(function(dbJob) {
      // console.log("Job Inserted: " + dbJob);
      // res.json(dbJob);
      res.redirect("/jobsearch");
    })
      .catch(function(error) {
        console.log(error);
      });
  });
};