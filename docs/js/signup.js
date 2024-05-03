const signup = document.getElementById("signup-form");

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
        if (data.status === "success") {
          // Redirect to the dashboard
          window.location.href = "/home";
        } else {
          // Handle login failure, e.g., display an error message
          console.error("Login failed: " + data.message);
        }
      });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    // const responseData = await response.json();
    // console.log(responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}
signup.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form
  var name = document.getElementById("signup-username").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  var address = document.getElementById("signup-address").value;

  // Your API endpoint for login
  var apiUrl = "/user/signup";

  // Data to be sent to the server
  var data = {
    name: name,
    email: email,
    password: password,
    address: address,
  };
  fetchData(apiUrl, data);
});
