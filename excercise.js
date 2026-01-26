// Clock : 
function updateClock
    () {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    document.getElementById("date").textContent = `${day} / ${month} / ${year}`;

    document.getElementById("time").textContent = `${h}:${m}:${s}`;
}

updateClock();
setInterval(updateClock, 1000);

let goal = 30;
let totalMinutes = 0;
let history = [];

// ================= DAILY RESET =================

function checkNewDay() {
  const today = new Date().toLocaleDateString();
  const savedDate = localStorage.getItem("exercise.date");

  if (savedDate !== today) {
    totalMinutes = 0;
    history = [];

    localStorage.setItem("exercise.minutes", 0);
    localStorage.setItem("exercise.history", JSON.stringify([]));
    localStorage.setItem("exercise.date", today);
  }
}

// ================= UPDATE RING =================

function updateRing() {
  let percent = (totalMinutes / goal) * 100;
  if (percent > 100) percent = 100;

  const degrees = (percent / 100) * 360;

  document.getElementById("exerciseRing").style.background =
    `conic-gradient(
      #03ce21 0deg ${degrees}deg,
      #0d3d15 ${degrees}deg 360deg
    )`;

  document.getElementById("exerciseText").textContent =
    `${totalMinutes} min`;
}

// ================= UPDATE HISTORY =================

function updateHistoryUI() {
  const box = document.getElementById("historyBox");
  box.innerHTML = "";

  if (history.length === 0) {
    box.innerHTML = `<p class="emptyText">No workouts added yet.</p>`;
    return;
  }

  history.forEach(session => {
    const div = document.createElement("div");
    div.className = "historyItem";
    div.textContent = `${session.type} — ${session.duration} min`;
    box.appendChild(div);
  });
}

// ================= LOAD DATA =================

window.onload = () => {
  checkNewDay();

  const savedGoal = localStorage.getItem("exercise.goal");
  const savedMinutes = localStorage.getItem("exercise.minutes");
  const savedHistory = localStorage.getItem("exercise.history");

  if (savedGoal) goal = Number(savedGoal);
  if (savedMinutes) totalMinutes = Number(savedMinutes);
  if (savedHistory) history = JSON.parse(savedHistory);

  document.getElementById("goalInputLeft").value = goal;

  updateRing();
  updateHistoryUI();
};

// ================= SAVE GOAL =================

document.getElementById("saveGoalBtn").addEventListener("click", () => {
  const newGoal = Number(document.getElementById("goalInputLeft").value);

  if (!newGoal || newGoal <= 0) {
    alert("Enter a valid exercise goal!");
    return;
  }

  goal = newGoal;
  localStorage.setItem("exercise.goal", goal);

  updateRing();
});

// ================= ADD WORKOUT =================

document.getElementById("addWorkoutBtn").addEventListener("click", () => {

  const type = document.getElementById("workoutType").value;
  const duration = Number(document.getElementById("durationInput").value);

  if (!duration || duration <= 0) {
    alert("Enter a valid workout duration.");
    return;
  }

  // Add to total
  totalMinutes += duration;

  // Save session
  history.push({ type, duration });

  localStorage.setItem("exercise.minutes", totalMinutes);
  localStorage.setItem("exercise.history", JSON.stringify(history));

  // Update UI
  updateRing();
  updateHistoryUI();

  // Clear input
  document.getElementById("durationInput").value = "";
});


//  ================ EDIT WORKOUT =================

