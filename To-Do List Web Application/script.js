const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const errorMessage = document.getElementById('errorMessage');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function init() {
    renderTasks();
}

function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        errorMessage.classList.remove('d-none');
        return;
    }

    errorMessage.classList.add('d-none');

    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        emptyState.classList.remove('d-none');
    } else {
        emptyState.classList.add('d-none');
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'task-completed' : ''}`;
        
        li.innerHTML = `
            <div class="form-check">
                <input class="form-check-input me-2" type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
                <span>${task.text}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">Delete</button>
        `;
        
        taskList.appendChild(li);
    });

    updateCounter();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function updateCounter() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${activeTasks} remaining`;
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    });
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearCompletedBtn.addEventListener('click', clearCompleted);

init();