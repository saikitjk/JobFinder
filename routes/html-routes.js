/* eslint-disable indent */
/* eslint-disable no-unused-vars */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("jobsearch");
    }
    res.render("index");
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.user) {
      //
      res.redirect("/");
      res.render("index");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/jobsearch", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("jobsearch");
  });

  app.get("/postjob", (req, res) => {
    res.render("postjob");
    // res.sendFile(path.join(__dirname, "../public/postjob.html"));
  });
};
