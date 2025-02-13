// // Login button redirection
// const loginButton = document.querySelector(".login-btns");
const loginButton = document.querySelector(".login-btn");
if (loginButton) {
    loginButton.addEventListener("click", function () {
         window.location.href = "login.html";
    });
}

// Registration functionality
const signupButton = document.querySelector(".btn");

if (signupButton) {
    signupButton.addEventListener("click", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("mail").value.trim();
        const password = document.getElementById("pass").value.trim();
        const role = document.getElementById("role").value;

        // Input validation
        if (!name || !email || !password || !role) {
            alert("Please fill in all fields.");
            return;
        }

        // Email format validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Check if the email already exists in localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (existingUsers.some(user => user.email === email)) {
            alert("Email is already registered. Please use a different email.");
            return;
        }

        // Store new user data
        const userData = { name, email, password, role };
        existingUsers.push(userData);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Registration successful! Redirecting to login...");
        window.location.href = "login.html"; // Redirect to login page
    });
}

