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

// ================= DASHBOARD UPDATE =================

function updateDashboard() {

  // ================= MOVE =================
  const moveBurned = localStorage.getItem("move.calories");
  const moveGoal = localStorage.getItem("move.goal");

  if (moveBurned && moveGoal) {

    const burnedNum = Number(moveBurned);
    const goalNum = Number(moveGoal);

    document.getElementById("moveStat").textContent =
      `${burnedNum} / ${goalNum} kcal`;

    let percentMove = (burnedNum / goalNum) * 100;
    if (percentMove > 100) percentMove = 100;

    const degreesMove = (percentMove / 100) * 360;

    document.getElementById("moveRing").style.background =
      `conic-gradient(
        #d50027 0deg ${degreesMove}deg,
        #511616 ${degreesMove}deg 360deg
      )`;
  }


  // ================= EXERCISE =================
  const exerciseDone = localStorage.getItem("exercise.minutes");
  const exerciseGoal = localStorage.getItem("exercise.goal");

  if (exerciseDone && exerciseGoal) {

    const doneNum = Number(exerciseDone);
    const goalNum = Number(exerciseGoal);

    document.getElementById("exerciseStat").textContent =
      `${doneNum} / ${goalNum} min`;

    let percentExercise = (doneNum / goalNum) * 100;
    if (percentExercise > 100) percentExercise = 100;

    const degreesExercise = (percentExercise / 100) * 360;

    document.getElementById("exerciseRing").style.background =
      `conic-gradient(
        #03ce21 0deg ${degreesExercise}deg,
        #0d6d02 ${degreesExercise}deg 360deg
      )`;
  }


  // ================= TASK =================
  const taskDone = localStorage.getItem("task.done");
  const taskGoal = localStorage.getItem("task.goal");

  if (taskDone && taskGoal) {

    const doneNum = Number(taskDone);
    const goalNum = Number(taskGoal);

    document.getElementById("taskStat").textContent =
      `${doneNum} / ${goalNum} tasks`;

    let percentTask = (doneNum / goalNum) * 100;
    if (percentTask > 100) percentTask = 100;

    const degreesTask = (percentTask / 100) * 360;

    document.getElementById("taskRing").style.background =
      `conic-gradient(
        #2daeff 0deg ${degreesTask}deg,
        #025568 ${degreesTask}deg 360deg
      )`;
  }
}



// ================= AUTO REFRESH =================

// Run once immediately
updateDashboard();

// Refresh every 500ms (simple + reliable)
setInterval(updateDashboard, 500);

// Refresh when user comes back to the tab
window.addEventListener("focus", updateDashboard);
