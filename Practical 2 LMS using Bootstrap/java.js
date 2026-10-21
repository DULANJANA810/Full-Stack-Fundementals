const currentHour = new Date().getHours();
let greeting;

if (currentHour < 12) {
    greeting = "Good Morning,";
} else if (currentHour < 17) {
    greeting = "Good Afternoon,";
} else {
    greeting = "Good Evening,";
}

document.getElementById("greeting").textContent = greeting;

const currentDateTime = document.getElementById("current-datetime");
const dateTimeFormatter = new Intl.DateTimeFormat("en-LK", {
    timeZone: "Asia/Colombo",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
});

function updateDateTime() {
    const now = new Date();
    currentDateTime.textContent = dateTimeFormatter.format(now);
    currentDateTime.dateTime = now.toISOString();
}

updateDateTime();
setInterval(updateDateTime, 1000);

const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const savedTheme = localStorage.getItem("lms-theme");

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggleIcon.textContent = isDark ? "" : "";
    themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("lms-theme", nextTheme);
    applyTheme(nextTheme);
});