const login = document.getElementById("login-form");

async function fetchData(apiUrl, data) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData);
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
  var apiUrl = "/login";

  // Data to be sent to the server
  var data = {
    email: email,
    password: password,
  };
  fetchData(apiUrl, data);
});

