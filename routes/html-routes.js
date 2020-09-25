/* eslint-disable indent */
/* eslint-disable no-unused-vars */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load login page when application starts
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("jobsearch");
    }
    res.render("index");
  });

  // Render sign up page
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/jobsearch", isAuthenticated, (req, res) => {
    res.render("jobsearch");
  });

  // Render Post job page
  app.get("/postjob", (req, res) => {
    res.render("postjob");
  });
};
