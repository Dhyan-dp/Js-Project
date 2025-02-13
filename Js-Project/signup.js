// // Login button redirection
// const loginButton = document.querySelector(".login-btns");
const loginButton = document.querySelector(".login-btn");
if (loginButton) {
    loginButton.addEventListener("click", function () {
         window.location.href = "login.html";
    });
}

// // Registration
// const form = document.getElementById("form");
// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("mail");
// const passwordInput = document.getElementById("pass");
// const roleInput = document.getElementById("role");
// const signupButton = document.querySelector(".btn");

// if (signupButton) {
//     signupButton.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent form submission

//         // Get input values
//         const name = nameInput.value.trim();
//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();
//         const role = roleInput.value;

//         // Validate inputs
//         if (!name || !email || !password || !role) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         // Email format validation
//         if (!/^\S+@\S+\.\S+$/.test(email)) {
//             alert("Please enter a valid email address.");
//             return;
//         }

//         // Password validation (min 6 characters)
//         if (password.length < 6) {
//             alert("Password must be at least 6 characters long.");
//             return;
//         }

//         // Get existing users from localStorage or initialize an empty array
// const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

// // New user data
// const userData = { name, email, password, role };

// // Push new user data into the array
// existingUsers.push(userData);

// // Save the updated array back to localStorage
// localStorage.setItem("users", JSON.stringify(existingUsers));


//         alert("Registration successful! Redirecting to login...");
//         window.location.href = "login.html";
//     });
// }

// // Login
// const loginEmailInput = document.getElementById("login-email");
// const loginPasswordInput = document.getElementById("login-pass");

// if (loginButton) {
//     loginButton.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent form submission

//         // Get stored users data from localStorage
//         const storedUser = JSON.parse(localStorage.getItem("user"));

//         // Get input values
//         const email = loginEmailInput.value.trim();
//         const password = loginPasswordInput.value.trim();

//         // Validate inputs
//         if (!email || !password) {
//             alert("Please enter both email and password.");
//             return;
//         }

//         // Check if user exists, password matches, and role is valid
//         if (storedUser && storedUser.email === email && storedUser.password === password) {
//             alert("Login successful!");

//             const role = storedUser.role;

//             // Role-based redirection
//             if (role === "Library member") {
//                 window.location.href = "user.html";
//             } else if (role === "librarian") {
//                 window.location.href = "librarian.html";
//             } else if (role === "admin") {
//                 window.location.href = "admin.html";
//             } else {
//                 alert("Invalid role. Please contact the administrator.");
//             }
//         } else {
//             alert("Invalid email or password.");
//         }
//     });
// }


// Redirect to login page when login button is clicked
// const loginButton = document.querySelector(".login-btn");
// const loginButton1 = document.querySelector(".login-btns");


// if (loginButton) {
//     loginButton.addEventListener("click", function () {
//         window.location.href = "login.html"; // Redirect to login page
//     });
// }

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


// function setFixedAdminCredentials() {
//     if (!localStorage.getItem("admin")) {
//         const fixedAdmin = {
//         username: "dhyan",
//         password: "987654", // Set your desired password
//         email: "dhyan@gmail.com"
//              };
//         localStorage.setItem("admin", JSON.stringify(fixedAdmin));
//         }
//     }
    
//     // Call function when the script loads
//     setFixedAdminCredentials();
// // Login functionality
// // Selecting the login button (make sure the button's class in HTML matches)
// // const loginButton= document.querySelector(".login-btn");

// if (loginButton1) {
//     loginButton1.addEventListener("click", function (event) {
//         event.preventDefault(); // Prevent form submission if in a form

//         // Get input values for login
//         const loginEmailInput = document.getElementById("login-email");
//         const loginPasswordInput = document.getElementById("login-pass");
//         const loginRoleInput=document.getElementById("role");

//         // Get stored users data from localStorage
//         const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//         const storedadmin = JSON.parse(localStorage.getItem("admin")) || [];
//         // Get input values for email and password
//         const email = loginEmailInput.value.trim();
//         const password = loginPasswordInput.value.trim();
//         const role = loginRoleInput.value.trim().toLowerCase(); 
        

//         // Validate inputs
//         if (!email || !password) {
//             alert("Please enter both email and password.");
//             return;
//         }

//         // Check for a match in the stored users
//         const user= storedUsers.find(u => u.email === email && u.password === password && u.role.toLowerCase()===role);
//         // const admin= storedadmin.find(u => u.username === username && u.password === password && u.email===email);
//         if(role==="admin")
//             {
//                  if(storedadmin && storedadmin.password === password && storedadmin.email===email)
//                  {
//                     window.location.href="admin.html";
//                  }
//             }
//         else if(user)
//             {
//                 // Authentication successful
//                alert("Login successful!");

//                 // Role-based redirection
//                 if (user.role === "member")
//                     {
//                         window.location.href = "user.html";
//                     } 
//             else if (user.role === "librarian")
//                 {
//                     window.location.href = "librarian.html";
//                 } 
             
//         }
//         else {
//             alert("Invalid email or password.");
//         }
        
//     });
// }

