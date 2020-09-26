//Send the GET request to server.
$(() => {
  const deletejob = $(".deletjob");

  deletejob.on("submit", event => {
    event.preventDefault();

    const deleteId = $(this).data("id");
    console.log(deleteId);

    $.ajax("/api/jobs/" + deleteId, {
      type: "DELETE",
      userId: deleteId
    })
      .then(deletedData => {
        // $("#postedData").empty();
        // $("#userJobs").html(searchedData);
        console.log("Deleted data: " + JSON.stringify(deletedData));
      })
      .catch(error => {
        console.log("got an error " + error);
      });
  });
});
