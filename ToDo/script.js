document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", function () {
        let taskText = taskInput.value.trim();
        if (taskText === "") return;

        let li = document.createElement("li");
        li.innerHTML = `<span class="task-item">${taskText}</span> <button class="delete-btn">삭제</button>`;
        taskList.appendChild(li);

        taskInput.value = "";
    });

    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("task-item")) {
            event.target.classList.toggle("done");
        } else if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove();
        }
    });
    
});