document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the whole user object and token as one object
        localStorage.setItem("user", JSON.stringify({
            ...data.data.user,
            token: data.data.token
        }));
        window.location.href = "/index.html";
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
});