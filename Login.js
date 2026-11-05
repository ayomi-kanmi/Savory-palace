// ============================
// GET HTML ELEMENTS
// ============================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginMessage = document.getElementById("loginMessage");

// ============================
// SHOW OR HIDE PASSWORD
// ============================

togglePassword.addEventListener("click", function () {

if (passwordInput.type === "password") {

    passwordInput.type = "text";

    togglePassword.innerHTML = "<i class='bx bx-hide'></i>";

    togglePassword.setAttribute("aria-label", "Hide password");

} else {

    passwordInput.type = "password";

    togglePassword.innerHTML = "<i class='bx bx-show'></i>";

    togglePassword.setAttribute("aria-label", "Show password");

}

});

// ============================
// LOGIN FORM VALIDATION
// ============================

loginForm.addEventListener("submit", function (event) {

event.preventDefault();

const email = emailInput.value.trim();
const password = passwordInput.value;

// Check that the fields are not empty

if (email === "" || password === "") {

    loginMessage.textContent = "Please fill in all fields.";
    loginMessage.style.color = "red";

    return;

}

// Check email format

if (!emailInput.checkValidity()) {

    loginMessage.textContent = "Please enter a valid email address.";
    loginMessage.style.color = "red";

    return;

}

// Demo only: no real account verification occurs.

const adminEmail = "admin@savorypalace.com";
const adminPassword = "Admin0303";

if(email === adminEmail &&  password === adminPassword) {
    sessionStorage.setItem("dashboardLoggedIn", "true" );
    loginMessage.textContent = "Login Successful!";
    loginMessage.style.color = "green";
    window.location.href = "dashboard.html";
}else {
    loginMessage.textContent = "invalid email or password.";
    loginMessage.style.color = "red";
}

});

/*    Login  */

