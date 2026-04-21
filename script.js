// ==========================
// ADD TASK PAGE LOGIC
// ==========================
const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");

if (form !== null) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value;
    const dueDate = dateInput.value;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({ text: taskText, dueDate: dueDate, completed: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    dateInput.value = "";

    alert("Task added!");
  });
}


// ==========================
// TASK LIST PAGE LOGIC
// ==========================
const taskList = document.getElementById("taskList");

if (taskList !== null) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function(task, index) {

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Text
    const span = document.createElement("span");
    span.textContent = `${task.text} (Due: ${task.dueDate})`;

    // Strike-through if completed
    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    // When checkbox changes
    checkbox.addEventListener("change", function () {
     task.completed = checkbox.checked;
     tasks[index] = task;
     localStorage.setItem("tasks", JSON.stringify(tasks));
     location.reload();
    });

    const deleteBtn = document.getElementById("submitChanges");

    deleteBtn.addEventListener("click", function() {
        if (task.completed) {
            tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
        }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}