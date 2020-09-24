/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
$(function(){
  $(".alert").hide();
  $(".alertrole").hide();
  // On clicking 'submit' button 
  $("#postjob").on("submit", event => {
    
    event.preventDefault();
    
    console.log("in postjob function");
    
    // Fetch post job form values
    const role = $("#role").val().trim();
    const description = $("#description").val().trim();
    const technology = $("#technology").val().trim();
    const company = $("#company").val().trim();
    const jobtype = $("#jobtype option:selected").text();
    const salary = $("#salary").val().trim();
    const joblocation = $("#joblocation").val().trim();
    const contact = $("#contact").val().trim();
    
    console.log("Posted Job : "+ role, description, technology, company, jobtype);
    
    // Empty field validations
    if (role === "") {
      return;
    }
    if (description === "") {
      return;
    }
    if (technology === "") {
      return;
    }
    if (company === "") {
      return;
    }
    if (salary === "") {
      return;
    }
    if (joblocation === "") {
      return;
    }
    if (contact === "") {
      return;
    }

    // Create object of job values from user
    const newJob = {
      role: role,
      description: description,
      technology: technology,
      company: company,
      jobtype: jobtype,
      salary: salary,
      joblocation: joblocation,
      contact: contact
      // userId:
    };

    //Send the POST request to server.
    $.ajax("/api/postjob", { 
      type: "POST",
      data: newJob
    }).then(() => {
      console.log("Added new Job!");
      $(".alert").show();
      $(".alert").alert();
      //location.reload();
    }).catch(error => {
      console.log("got an error " + error);
    });

  });
});
