// To Get elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<span>${taskText}</span> <button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>
        <label class="custom-checkbox"><input type="checkbox" onchange="toggleTaskStatus(this.parentNode.parentNode)"> </label>`;
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
}

// Function to edit a task
function editTask(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null) {
        span.textContent = newText;
        saveTasks();
    }
} 

// Function to delete a task
function deleteTask(button) {
    const li = button.parentNode;
    taskList.removeChild(li);
    saveTasks();
}

// Function to save tasks to the local_storage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#taskList li span');
    taskItems.forEach(item => tasks.push(item.textContent));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to filter tasks by status
function filterTasks(status) {
    const taskItems = document.querySelectorAll('#taskList li');
    taskItems.forEach(item => {
        const isCompleted = item.classList.contains('completed');
        switch (status) {
            case 'all':
                item.style.display = 'block';
                break;
            case 'active':
                item.style.display = isCompleted ? 'none' : 'block';
                break;
            case 'completed':
                item.style.display = isCompleted ? 'block' : 'none';
                break;
        }
    });
}

// Function to clear all completed tasks
function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll('#taskList li.completed');
    completedTasks.forEach(task => task.parentNode.removeChild(task));
    saveTasks();
}

// Function to toggle task completion status
function toggleTaskStatus(li) {
    li.classList.toggle('completed');
    saveTasks();
    //updateTaskStatus();
}


// // Function to update completion task status and save tasks to local storage
// function updateTaskStatus() {
//     const tasks = [];
//     const taskItems = document.querySelectorAll('#taskList li');
//     taskItems.forEach(item => {
//         const taskText = item.querySelector('span').textContent;
//         const isCompleted = item.classList.contains('completed');
//         tasks.push({
//             text: taskText,
//             completed: isCompleted,
//         });
//     });
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }


// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const li = document.createElement('li');
       // li.innerHTML = `<span>${taskText}</span> <button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>`;
        li.innerHTML = `<span>${taskText}</span> <button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>
        <label class="custom-checkbox"><input type="checkbox" onchange="toggleTaskStatus(this.parentNode.parentNode)"> </label>`;
        taskList.appendChild(li);
    });
}

// Load tasks when the page is loaded
window.onload = loadTasks;

const backgroundImages = [
    '',
    'todo.jpg',
    //'black.jpg',
    'blue.jpeg',
    'listicon.jpg',
    'yellow_leaves.jpg',
    'yellow2.jpg',
    
];

function getLastBackgroundIndex() {
    return parseInt(localStorage.getItem('backgroundIndex')) || 0;
}

function setLastBackgroundIndex(index) {
    localStorage.setItem('backgroundIndex', index);
}
let currentBackgroundIndex = getLastBackgroundIndex();

// Function to toggle the background
function toggleBackground() {
    const body = document.body;
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    const backgroundImage = backgroundImages[currentBackgroundIndex];
    body.style.backgroundImage = backgroundImage ? `url(${backgroundImage})` : 'none';
    setLastBackgroundIndex(currentBackgroundIndex);
}

// To set the background image when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const lastBackgroundIndex = getLastBackgroundIndex();
    const lastBackgroundImage = backgroundImages[lastBackgroundIndex];
    body.style.backgroundImage = lastBackgroundImage ? `url(${lastBackgroundImage})` : 'none';
});
