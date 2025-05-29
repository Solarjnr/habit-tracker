const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-name");
const habitList = document.getElementById("habit-list");
const progressDisplay = document.getElementById("progress");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = "";
  let completed = 0;

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit-item";

    const label = document.createElement("label");
    label.textContent = habit.name;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.completedToday;
    checkbox.onchange = () => {
      habits[index].completedToday = checkbox.checked;
      saveHabits();
      renderHabits();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    };

    li.appendChild(label);
    li.appendChild(checkbox);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);

    if (habit.completedToday) completed++;
  });

  progressDisplay.textContent = `Today's Progress: ${completed} / ${habits.length} habits`;
}

habitForm.onsubmit = (e) => {
  e.preventDefault();
  const name = habitInput.value.trim();
  if (name) {
    habits.push({ name, completedToday: false });
    saveHabits();
    renderHabits();
    habitInput.value = "";
  }
};

renderHabits();
