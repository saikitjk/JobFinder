$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstName = $("input#firstname");
  const lastName = $("input#lastname");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const confirmPasswodInput = $("input#confirmPassword-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      firstname: firstName.val().trim(),
      lastname: lastName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPasswodInput.val().trim(),
    };

    if (
      !userData.firstname ||
      !userData.lastname ||
      !userData.email ||
      !userData.password
    ) {
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
      userData.password
    );
    firstName.val("");
    lastName.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, email, password) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    })
      .then(() => {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
