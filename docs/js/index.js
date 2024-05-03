const login = document.getElementById("login-form");

async function fetchData(apiUrl, data) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data); // Log the response data
        if (data.status === "success") {
          // Redirect to the dashboard
          window.location.href = `/home?name=${data.user.name}`;
        } else {
          // Handle login failure, e.g., display an error message
          console.error("Login failed: " + data.message);
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
}


login.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  // Your API endpoint for login
  var apiUrl = "/user/login";

  // Data to be sent to the server
  var data = {
    email: email,
    password: password,
  };
  fetchData(apiUrl, data);
});
