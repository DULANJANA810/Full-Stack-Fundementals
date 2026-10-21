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