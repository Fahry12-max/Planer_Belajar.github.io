let tasks = JSON.parse(localStorage.getItem("tasks"))  ||  [];

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskInput");
const selectedDateText = document.getElementById("selectedDate");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value;
    const date = dateInput.value;

    if (!text || !date) return alert("isi semua dulu yaa~");

    tasks.push({
        id: Date.now(),
        text: text,
        date: date,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
    saveTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task
    );

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const selectedDate = dateInput.value;
    selectedDateText.textContent = selectedDate;

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => task.date === selectedDate);

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
          <label style="display:flex align-items:center; gap:8px;">
            <input type="checkbox"
              ${task.completed ? "checked" : ""}
              onchange="toggleTask(${task.id})">
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>    
          </label>
        <button onclick="deleteTask(${task.id})">X</button>
        `;

        taskList.appendChild(li);
    });

    updateProgress(filteredTasks);
}

function updateProgress(filteredTasks) {
    if (filteredTasks.length === 0) {
        document.getElementById("progressText").textContent = "0%";
        document.getElementById("progressFill").style.width = "0%";
        return;
    }

    const completed = filteredTasks.filter(t => t.completed).length;
    const percent = Math.round((completed / filteredTasks.length) * 100);

    document.getElementById("progressText").textContent = percent + "%";
    document.getElementById("progressFill").style.width = percent + "%";
}

dateInput.addEventListener("change", renderTasks);

renderTasks();
