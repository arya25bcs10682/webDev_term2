# 🏋️ Lifestyle Tracker (Move • Exercise • Task)

A modern **Health, Wellness & Lifestyle Tracking Website** inspired by the Apple Fitness activity rings.

This project helps users track:

- 🔥 Calories burned (Move)
- 🏃 Exercise minutes (Exercise)
- ✅ Weekly task dedication (Task Sheet)

All progress is saved using **localStorage**, so the tracker works even after refreshing the browser.

---

## ✨ Features

### 🔥 Move Tab (Calories Tracker)
- User sets a daily calorie burn goal
- Inputs step count, time, weight, and temperature
- Calories burned are calculated using a custom formula
- Progress is shown in a red activity ring
- Automatically resets every new day

---

### 🏃 Exercise Tab (Workout Minutes Tracker)
- User sets an exercise goal (minutes/day)
- Adds workout sessions with type + duration
- Workout history list displays all sessions done today
- Green ring fills as exercise minutes increase
- Automatically resets daily

---

### ✅ Task Tab (Weekly Task Manager + Dedication Sheet)
A proper productivity-style task system:

- User creates weekly tasks that persist forever
- Priority tags:
  - 🟢 Low
  - 🟡 Medium
  - 🔴 High
- Priority can be toggled by clicking the badge
- Excel-style dedication grid (Mon–Sun)
- Only today’s column is clickable
- Tasks must be deleted manually (no auto refresh)
- Blue ring updates based on tasks completed today

---

### 📊 Main Dashboard
The main page displays:

- Move ring progress
- Exercise ring progress
- Task completion ring progress

All values update automatically when returning from any tab.

---

## 🛠️ Built With

- **HTML5**
- **CSS3**
  - Grid + Flexbox Layout
  - Glassmorphism UI (Tried to make it work properly but couldn't 😭😭)
  - Conic Gradients for Activity Rings
- **Vanilla JavaScript**
  - localStorage persistence
  - Daily reset logic
  - Interactive task tracker

---

## 📂 Project Structure

```bash
lifestyle-tracker/
│
├── index.html          # Main dashboard
├── style.css           # Main page styling
├── script.js           # Dashboard + clock updater
│
├── move.html           # Move tracker page
├── move.css
├── move.js
│
├── excercise.html       # Exercise tracker page
├── excercise.css
├── excercise.js
│
├── task.html           # Task management sheet
├── task.css
├── task.js
│
└── README.md
```
I agree that this project has been made with the help of ai not completly but partially. Their were things in js and css that i did not know could be done.
For Example the ring system that i have in this website, weekly reset system for the task managment system and some other things.
The inspiration for this website was completly mine no ai involved in that.
