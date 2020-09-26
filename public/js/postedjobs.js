/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
$(document).ready(function() {
  const userId = localStorage.getItem("userId");
  //Send the GET request to server.
  $.ajax("/api/postedjobs/" + userId, {
    type: "GET",
    userId: userId
  })
    .then(searchedData => {
      $("#postedData").empty();
      $("#userJobs").html(searchedData);
    })
    .catch(function(error) {
      console.log("got an error " + error);
    });
});
