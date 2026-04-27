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
    checkbox.style.scale = "1.5";
    checkbox.checked = task.completed;

    // Text in li
    const span = document.createElement("span");
    const tspan = document.createElement("span");
    const dspan = document.createElement("span");

    dspan.style.textAlign = "right";

    dspan.classList.add("dspan");

    tspan.textContent = task.text;
    dspan.textContent = '(due: ' + task.dueDate + ')';

    //span.appendChild(tspan);
    //span.appendChild(dspan);

    // Strike-through if completed
    if (task.completed) {
      tspan.style.textDecoration = "line-through";
      tspan.style.color = "#bb7676";
      dspan.style.color = "#bb7676";
      li.style.backgroundColor = "#dfb1b1";
      li.style.borderColor = "#bb7676";
    }

    // Set complete status when checkbox toggled
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      tasks[index] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      location.reload();
    });

    const deleteBtn = document.getElementById("Change");

    // Delete task if completed
    deleteBtn.addEventListener("click", function() {
        if (task.completed) {
            tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
        }
    });

    li.appendChild(checkbox);
    //li.appendChild(span);
    li.appendChild(tspan);
    li.appendChild(dspan);
    taskList.appendChild(li);
  });
}