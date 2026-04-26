// ============================================
// script.js — Flavor Hub Restaurant Logic
// ============================================

// ---- 1. DARK MODE TOGGLE ----
var darkBtn = document.getElementById("dark-btn");

darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    darkBtn.textContent = "☀️ Light";
  } else {
    darkBtn.textContent = "🌙 Dark";
  }
});


// ---- 2. SMOOTH SCROLL for nav links ----
var navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ---- 3. TOAST NOTIFICATION ----
function showToast(message) {
  var old = document.getElementById("toast");
  if (old) old.remove();

  var toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = message;
  toast.style.cssText =
    "position:fixed; bottom:24px; right:24px; background:#1a0a00;" +
    "color:#f5dfc0; padding:12px 20px; border-left:4px solid #e63946;" +
    "font-size:0.82rem; font-family:'Poppins',sans-serif; z-index:9999;" +
    "border-radius:4px;";

  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 2500);
}


// ---- 4. RESERVATION FORM VALIDATION ----
var reserveForm = document.getElementById("reserve-form");

reserveForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var name    = document.getElementById("r-name").value.trim();
  var phone   = document.getElementById("r-phone").value.trim();
  var date    = document.getElementById("r-date").value;
  var time    = document.getElementById("r-time").value;
  var guests  = document.getElementById("r-guests").value;

  // Clear errors
  document.getElementById("r-err-name").textContent  = "";
  document.getElementById("r-err-phone").textContent = "";
  document.getElementById("r-err-date").textContent  = "";
  document.getElementById("r-ok").textContent        = "";

  var valid = true;

  if (name === "") {
    document.getElementById("r-err-name").textContent = "⚠ Please enter your name.";
    valid = false;
  }

  if (phone === "" || phone.length < 10) {
    document.getElementById("r-err-phone").textContent = "⚠ Enter a valid phone number.";
    valid = false;
  }

  if (date === "") {
    document.getElementById("r-err-date").textContent = "⚠ Please select a date.";
    valid = false;
  }

  if (valid) {
    document.getElementById("r-ok").textContent =
      "✅ Table booked for " + guests + " guests on " + date + " at " + time + "!";
    reserveForm.reset();
    showToast("Reservation confirmed! 🎉");
  }
});


// ---- 5. CONTACT FORM VALIDATION ----
var contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var name    = document.getElementById("c-name").value.trim();
  var email   = document.getElementById("c-email").value.trim();
  var message = document.getElementById("c-msg").value.trim();

  document.getElementById("c-err-name").textContent  = "";
  document.getElementById("c-err-email").textContent = "";
  document.getElementById("c-err-msg").textContent   = "";
  document.getElementById("c-ok").textContent        = "";

  var valid = true;

  if (name === "") {
    document.getElementById("c-err-name").textContent = "⚠ Name is required.";
    valid = false;
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    document.getElementById("c-err-email").textContent = "⚠ Enter a valid email.";
    valid = false;
  }

  if (message.length < 10) {
    document.getElementById("c-err-msg").textContent = "⚠ Message must be at least 10 characters.";
    valid = false;
  }

  if (valid) {
    document.getElementById("c-ok").textContent = "✅ Message sent! We'll reply soon.";
    contactForm.reset();
    showToast("Message sent! 📩");
  }
});
