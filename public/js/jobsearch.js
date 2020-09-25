/* eslint-disable no-unused-vars */
$(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    console.log("User Id : " + data.id);
  });

  const searchForm = $("form#searchForm");

  // On submit the search job
  searchForm.on("submit", event => {
    event.preventDefault();

    //Fetch search value
    const userSearch = $("input#searchInput")
      .val()
      .trim();
    console.log("User Search: " + userSearch);

    //Send the GET request to server.
    $.ajax("/api/jobs/" + userSearch, {
      type: "GET",
      userSearch: userSearch
    })
      .then(searchedData => {
        console.log("Searched successfully!");
        console.log("Searched Data: " + searchedData);
        $("#jobList").empty();
        $("#jobSearchPageId").html(searchedData);
      })
      .catch(error => {
        console.log("got an error " + error);
      });
  });
});
