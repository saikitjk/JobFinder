/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
$(function(){
  $(".alert").hide();
  $(".alertrole").hide();

  // Empty field validation div
  const err = document.querySelector("#err");

  // Salary validation div
  const salaryErr = document.querySelector("#salaryErr");
  
  // Hide validation divs
  $("#err").hide();
  $("#salaryErr").hide();
  $("#salaryErr").text("*Invalid Salary");
  $("#err").text("*Fields cannot be empty");
  
  // On clicking 'submit' button 
  $("#postjob").on("submit", event => {
    
    event.preventDefault();
    
    // Fetch post job form values
    const role = $("#role").val().trim();
    const description = $("#description").val().trim();
    const technology = $("#technology").val().trim();
    const company = $("#company").val().trim();
    const jobtype = $("#jobtype option:selected").text();
    const salary = $("#salary").val().trim();
    const joblocation = $("#joblocation").val().trim();
    const contact = $("#contact").val().trim();

    // // Empty field validations
    // if(role === "" || description === "" || technology === "" || company === "" || salary === "" || joblocation === "" || contact === ""){
    //   $("#err").show();
    //   $("#salaryErr").hide();
    //   $("#err").text("*Fields cannot be empty");
    //   return;
    // }
    // Salary validation : If salary is not number
    if(isNaN(salary) && !(role === "" || description === "" || technology === "" || company === "" || salary === "" || joblocation === "" || contact === "")){    
      $("#salaryErr").show();
      $("#err").hide();
      return;
    }
    else if(isNaN(salary) && (role === "" || description === "" || technology === "" || company === "" || salary === "" || joblocation === "" || contact === "")){
      $("#salaryErr").show();
      $("#err").show();
      return;
    }
    else if(!(isNaN(salary)) && (role === "" || description === "" || technology === "" || company === "" || salary === "" || joblocation === "" || contact === "")){
      $("#salaryErr").hide();
      $("#err").show();
      return;
    }
     
    // Get user Id from local storage
    const userId = localStorage.getItem("userId");

    // Create object of job values from user
    const newJob = {
      role: role,
      description: description,
      technology: technology,
      company: company,
      jobtype: jobtype,
      salary: salary,
      joblocation: joblocation,
      contact: contact,
      userId: userId
    };

    //Send the POST request to server to store job posted by user.
    $.ajax("/api/postjob", { 
      type: "POST",
      data: newJob
    }).then(() => {
      // console.log("Added new Job!");
      // Hide validation divs
      $("#err").hide();
      $("#salaryErr").hide();

      role.val("");
      description.val("");
      technology.val("");
      company.val("");
      salary.val("");
      joblocation.val("");
      contact.val("");

      // Show success message after posting a job
      $(".alert").show();
      $(".alert").alert();
    }).catch(function(error) {
      console.log("got an error " + error);
    });

  });  
});
