document.addEventListener("DOMContentLoaded", () => {
  const userActions = document.getElementById("user-actions");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.username) {
    userActions.innerHTML = `
      <span class="navbar-text me-2">Hello, <strong>${user.username}</strong></span>
      <button class="btn btn-outline-light h-100 px-3" id="logout-btn">Logout</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/html/login.html";
    });
  } else {
    userActions.innerHTML = `
      <a href="./login.html" class="btn btn-outline-light h-100 px-3">Log in</a>
      <a href="./register.html" class="btn btn-outline-light h-100 px-3">Sign Up</a>
    `;
  }
});