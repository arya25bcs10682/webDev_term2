// ================= LOAD DATA =================

let tasks = JSON.parse(localStorage.getItem("tasks.list")) || [];
let completion = JSON.parse(localStorage.getItem("tasks.completion")) || {};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


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


// ================= TODAY INDEX =================
// Convert JS Sunday=0 → Monday=0 format

let todayIndex = new Date().getDay() - 1;
if (todayIndex === -1) todayIndex = 6;


// ================= SAVE =================

function saveData() {
  localStorage.setItem("tasks.list", JSON.stringify(tasks));
  localStorage.setItem("tasks.completion", JSON.stringify(completion));
}


// ================= UPDATE DASHBOARD TASK PROGRESS =================

function updateTaskProgress() {

  let doneToday = 0;

  // Count completed tasks for today
  tasks.forEach(task => {
    const key = `${task.id}-${todayIndex}`;
    if (completion[key]) doneToday++;
  });

  // Save summary for main dashboard ring
  localStorage.setItem("task.done", doneToday);
  localStorage.setItem("task.goal", tasks.length);
}


// ================= RENDER TASK LIST =================

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {

    const div = document.createElement("div");
    div.className = "taskItem";

    div.innerHTML = `
      <span class="taskName">${task.name}</span>

      <!-- Priority badge clickable -->
      <span class="priority ${task.priority}"
            onclick="togglePriority('${task.id}')"
            style="cursor:pointer;">
        ${task.priority.toUpperCase()}
      </span>

      <button class="deleteBtn"
              onclick="deleteTask('${task.id}')">
        Delete
      </button>
    `;

    taskList.appendChild(div);
  });
}


// ================= TOGGLE PRIORITY =================

function togglePriority(taskId) {

  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // Cycle: low → medium → high → low
  if (task.priority === "low") {
    task.priority = "medium";
  }
  else if (task.priority === "medium") {
    task.priority = "high";
  }
  else {
    task.priority = "low";
  }

  saveData();
  renderTasks();
}


// ================= DELETE TASK =================

function deleteTask(taskId) {

  // Remove task from list
  tasks = tasks.filter(t => t.id !== taskId);

  // Remove completion history for that task
  Object.keys(completion).forEach(key => {
    if (key.startsWith(taskId)) {
      delete completion[key];
    }
  });

  saveData();
  updateTaskProgress(); // ✅ update dashboard
  renderAll();
}


// ================= RENDER GRID =================

function renderGrid() {
  const gridBox = document.getElementById("gridBox");

  let html = "<table><tr><th>Task</th>";

  // Header row
  days.forEach((day, index) => {
    if (index === todayIndex) {
      html += `<th style="color:#2daeff;">${day}</th>`;
    } else {
      html += `<th>${day}</th>`;
    }
  });

  html += "</tr>";

  // Task rows
  tasks.forEach((task) => {

    html += `<tr><td>${task.name}</td>`;

    days.forEach((day, dIndex) => {

      const key = `${task.id}-${dIndex}`;
      const done = completion[key] ? "done" : "";

      // Only today is clickable
      if (dIndex === todayIndex) {
        html += `
          <td class="cell ${done}"
              onclick="toggleCell('${key}')">
          </td>
        `;
      }
      else {
        html += `
          <td class="cell ${done}"
              style="opacity:0.2; cursor:not-allowed;">
          </td>
        `;
      }
    });

    html += "</tr>";
  });

  html += "</table>";

  gridBox.innerHTML = html;
}


// ================= TOGGLE TODAY CELL =================

function toggleCell(key) {

  completion[key] = !completion[key];

  saveData();
  updateTaskProgress(); // ✅ update dashboard ring
  renderGrid();
}


// ================= ADD TASK =================

document.getElementById("addTaskBtn").addEventListener("click", () => {

  const name = document.getElementById("taskInput").value.trim();
  const priority = document.getElementById("priorityInput").value;

  if (!name) {
    alert("Enter a task name!");
    return;
  }

  // Permanent unique ID
  const newTask = {
    id: Date.now().toString(),
    name,
    priority
  };

  tasks.push(newTask);

  document.getElementById("taskInput").value = "";

  saveData();
  updateTaskProgress(); // ✅ update dashboard
  renderAll();
});


// ================= RENDER EVERYTHING =================

function renderAll() {
  renderTasks();
  renderGrid();
}


// ================= INITIAL LOAD =================

renderAll();
updateTaskProgress(); // ✅ ensures blue ring works immediately
