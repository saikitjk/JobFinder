/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
$(document).ready(function() {
  // Fetch user id of logged in user which is stored in local storage
  const userId = localStorage.getItem("userId");

  //Send the GET request to server to fetch jobs posted by logged in user.
  $.ajax("/api/postedjobs/" + userId, {
    type: "GET",
    userId: userId
  })
    .then(searchedData => {
      // rendering the data on to handlebars page
      $("#postedData").empty();
      $("#userJobs").html(searchedData);
    })
    .catch(function(error) {
      console.log("got an error " + error);
    });
});
