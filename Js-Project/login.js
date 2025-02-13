// Redirect to login page when login button is clicked
const loginButton1 = document.querySelector(".login-btns");

function setFixedAdminCredentials() {
    if (!localStorage.getItem("admin")) {
        const fixedAdmin = {
        username: "dhyan",
        password: "987654", // Set your desired password
        email: "dhyan@gmail.com"
             };
        localStorage.setItem("admin", JSON.stringify(fixedAdmin));
        }
    }
    
    // Call function when the script loads
    setFixedAdminCredentials();
// Login functionality
// Selecting the login button (make sure the button's class in HTML matches)


if (loginButton1) {
    loginButton1.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission if in a form

        // Get input values for login
        const loginEmailInput = document.getElementById("login-email");
        const loginPasswordInput = document.getElementById("login-pass");
        const loginRoleInput=document.getElementById("role");

        // Get stored users data from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const storedadmin = JSON.parse(localStorage.getItem("admin")) || [];
        // Get input values for email and password
        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();
        const role = loginRoleInput.value.trim().toLowerCase(); 
        

        // Validate inputs
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        // Check for a match in the stored users
        const user= storedUsers.find(u => u.email === email && u.password === password && u.role.toLowerCase()===role);
        if(role==="admin")
            {
                 if(storedadmin && storedadmin.password === password && storedadmin.email===email)
                 {
                    window.location.href="admin.html";
                 }
            }
        else if(user)
            {
                // Authentication successful
               alert("Login successful!");

                // Role-based redirection
                if (user.role === "member")
                    {
                        window.location.href = "user.html";
                    } 
            else if (user.role === "librarian")
                {
                    window.location.href = "librarian.html";
                } 
             
        }
        else {
            alert("Invalid email or password.");
        }
        
    });
}