document.addEventListener("DOMContentLoaded", function () {
    // Check if tasks are stored in local storage
    if (localStorage.getItem("tasks") !== null) {
        loadTasks();
    }
});

function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        // Get existing tasks or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add the new task to the array
        tasks.push({ text: taskText, completed: false });

        // Store the updated tasks in local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Clear the input field
        taskInput.value = "";

        // Reload the task list
        loadTasks();
    }
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach(function (task, index) {
            const row = document.createElement("tr");

            const taskCell = document.createElement("td");
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add("completed");
            }
            taskCell.appendChild(taskText);

            const actionsCell = document.createElement("td");

        
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit";
            editButton.onclick = function () {
                editTask(index, task.text);
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";
            deleteButton.onclick = function () {
                deleteTask(index);
            };
            const completeButton = document.createElement("button");
            completeButton.textContent = "Mark As Complete";
            completeButton.className = "complete";
            completeButton.onclick = function () {
                completeTask(index);
            };

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
            actionsCell.appendChild(completeButton);

            row.appendChild(taskCell);
            row.appendChild(actionsCell);

            taskList.appendChild(row);
        });
    }
}

function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function editTask(index, oldText) {
    const newText = prompt("Edit Task:", oldText);

    if (newText !== null) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));

        if (tasks) {
            tasks[index].text = newText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        }
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

loadTasks();
