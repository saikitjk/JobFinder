$(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const firstName = $("input#firstname");
    const lastName = $("input#lastname");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
    const confirmPasswodInput = $("input#confirmPassword-input");

    const userData = {
      firstname: firstName.val().trim(),
      lastname: lastName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPasswodInput.val().trim()
    };

    if (!userData.firstname) {
      confirm(" Firstname field cannot be blank.");
      return;
    }
    if (!userData.lastname) {
      confirm("Lastname field cannot be blank.");
      return;
    }
    if (!userData.email) {
      confirm(" Email field cannot be blank.");
      return;
    }

    if (!userData.password) {
      confirm(" Password field cannot be blank.");
      return;
    }

    if (!userData.confirmPassword) {
      confirm("Confirm password field cannot be blank.");
      return;
    } else if (userData.password !== userData.confirmPassword) {
      console.log("password unmatch!");
      confirm("Password unmatch! Please confirm your password.");
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.password,
      userData.confirmPassword
    );
    firstName.val("");
    lastName.val("");
    emailInput.val("");
    passwordInput.val("");
    confirmPasswodInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, email, password, confirmpassword) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    })
      .then(() => {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.responseJSON));
    $("#alert").fadeIn(500);
  }
});
