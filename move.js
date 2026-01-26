// ================= CLOCK =================

function updateClock() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  document.getElementById("date").textContent =
    `${day} / ${month} / ${year}`;

  document.getElementById("time").textContent =
    `${h}:${m}:${s}`;
}

updateClock();
setInterval(updateClock, 1000);


// ================= CALORIE FORMULA =================

function calculateCalories(steps, timeMinutes, weightKg, temperatureC) {
  const stepLength = 0.78;
  const distanceKm = (steps * stepLength) / 1000;

  const speed = distanceKm / (timeMinutes / 60);

  const baseCalories = distanceKm * weightKg * 0.75;

  let timeFactor = 1 + (speed - 4) * 0.05;
  timeFactor = Math.max(timeFactor, 0.8);

  const tempFactor = 1 + Math.abs(temperatureC - 20) * 0.01;

  return Math.round(baseCalories * timeFactor * tempFactor);
}


// ================= RING UPDATE =================

function updateRing(caloriesBurned, goal) {
  let percent = (caloriesBurned / goal) * 100;
  if (percent > 100) percent = 100;

  const degrees = (percent / 100) * 360;

  document.getElementById("calorieRing").style.background =
    `conic-gradient(
      #d50027 0deg ${degrees}deg,
      #511616 ${degrees}deg 360deg
    )`;

  document.getElementById("calorieText").textContent =
    `${caloriesBurned} kcal`;
}


// ================= GLOBAL VALUES =================

let goal = 500;
let caloriesBurned = 0;


// ================= DAILY RESET CHECK =================

function checkNewDay() {
  const today = new Date().toLocaleDateString();

  const savedDate = localStorage.getItem("move.date");

  // If date changed → reset calories
  if (savedDate !== today) {
    caloriesBurned = 0;
    localStorage.setItem("move.calories", 0);
    localStorage.setItem("move.date", today);
  }
}


// ================= LOAD SAVED DATA =================

window.onload = () => {

  // Check if new day started
  checkNewDay();

  const savedGoal = localStorage.getItem("move.goal");
  const savedCalories = localStorage.getItem("move.calories");

  if (savedGoal) goal = Number(savedGoal);
  if (savedCalories) caloriesBurned = Number(savedCalories);

  document.getElementById("goalInputLeft").value = goal;

  updateRing(caloriesBurned, goal);
};


// ================= SAVE GOAL =================

document.getElementById("saveGoalBtn").addEventListener("click", () => {

  const newGoal = Number(document.getElementById("goalInputLeft").value);

  if (!newGoal || newGoal <= 0) {
    alert("Enter a valid calorie goal!");
    return;
  }

  goal = newGoal;
  localStorage.setItem("move.goal", goal);

  updateRing(caloriesBurned, goal);
});


// ================= CALCULATE BUTTON (CUMULATIVE) =================

document.getElementById("calcBtn").addEventListener("click", () => {

  const steps = Number(document.getElementById("stepsInput").value);
  const weight = Number(document.getElementById("weightInput").value);
  const temp = Number(document.getElementById("tempInput").value);
  const time = Number(document.getElementById("timeInput").value);

  if (!steps || !weight || !time) {
    alert("Please fill in all required fields.");
    return;
  }

  // Calculate calories for this activity
  const newCalories = calculateCalories(steps, time, weight, temp);

  // Add to total
  caloriesBurned += newCalories;

  // Save total
  localStorage.setItem("move.calories", caloriesBurned);

  updateRing(caloriesBurned, goal);

  alert(`Added ${newCalories} kcal! Total today: ${caloriesBurned} kcal`);
});
