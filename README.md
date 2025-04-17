# Task Manager Code Explanation
This document provides a detailed explanation of the task manager web application code. The application is a simple but complete task management system built with HTML, CSS, and JavaScript.

## Table of Contents
- [Task Manager Code Explanation](#task-manager-code-explanation)
- [HTML Structure](#html-structure)
- [CSS Styling](#css-styling)
- [JavaScript Functionality](#javascript-functionality)
    - [DOM Elements](#dom-elements)
    - [Data Management](#data-management)
    - [Task Operations](#task-operations)
    - [UI Rendering](#ui-rendering)
    - [Event Handling](#event-handling)
- [Data Management](#data-management)
- [Event Flow](#event-flow)

## HTML Structure
The HTML structure defines the use interface of the Task Manager Application:   

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="script.js" defer></script>
</head>
<body>
    <!--Main Container-->
    <div class="container">
        <h1>Task Manager</h1>

        <!--Input Section-->
        <div class="input-section">
            <input type="text" id="task-input" placeholder="Add a new task">
            <button id="add-button">Add</button>
        </div>

        <ul id="task-list">
            <!--Tasks will be added here dynamically-->
        </ul>

        <div id="no-tasks" class="no-tasks">
            <p>No tasks yet! Add a task to get started.</p>
        </div>

        <div class="status-bar">
            <span id="tasks-count">Total: 0 tasks</span>
            <span id="completed-count">Completed: 0</span>
        </div>

        <button id="clear-all" class="clear-all">Clear All Tasks</button>
    </div>
</body>
</html>
```

Key HTML Components:
- A container `div` that wraps the entire application.
- A heading that displays the title.
- An input section with a text field and an "ADD" button.
- An empty unordered list (`ul`) where tasks will be displayed.
- A message that shows when there are no tasks.
- A status bar showing task counts
- A "Clear All Tasks" button.

## CSS Styling
The CSS styling defines the visual appearance of the Task Manager.

``` css
*{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }

        .container{
            max-width: 600px;
            margin: 0 auto;
        }

        h1{
            text-align: center;
        }

        .input-section{
            display: flex;
            margin-bottom: 20px;
        }

        #add-button{
            padding: 10px 15px;
            color: white;
            background-color: green;
            border: none;
            cursor: pointer
        }

        .clear-all{
            display: block;
            margin-top: 20px;
            cursor: pointer;
            color: white;
            font-size: 16px;
            background-color: #ff9800;
        }

        .no-tasks{
            text-align: center;
            color: #888;
            padding: 20px 0;
            font-style: italic
        }

        .status-bar{
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            padding-top: 15px;
            font-size: 16px;
        }

        #task-input{
            flex: 1;
            padding: 10px;
            font-size: 16px;
        }

        #task-list{
            list-style-type: none;
        }

        .task-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background-color: #f9f9f9;
            margin-bottom: 8px;
        }

        .task-text{
            flex: 1;
            margin-left: 10px;
        }

        .completed{
            text-decoration: line-through;
            color: #888;
        }

        .delete-btn{
            color: white;
            background-color: #f44336;
            cursor: pointer;
            margin-left: 10px;
            padding: 5px 10px;
        }
```

Key CSS features:
1. **Reset Styles**: Sets default margins, padding, and box-sizing for all elements.
2. **Container Styling**: Creates a centered, white card with rounded corners and a subtle shadow.
3. **Input Section**: Uses a flexbox to position the input field and button with text.
**DELETE** side by side
4. **Task Items**: Styles each task with background color, spacing, and flexbox layout.
5. **Button Styles**: Defines appearance for ADD, DELETE, and Clear All Buttons.
6. **Status Indicator**: Styles for completed tasks (strikethrough).
7. **Responsive Design**: Uses relative units and max-width to ensure responsive behaviour.

 ## JavaScript Functionality
The JavaScript code handles all the dynamic behaviour of the Task Manager:
 ### DOM Elements
``` javascript
// DOM Elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const noTasksMessage = document.getElementById('no-tasks');
const clearAllButton = document.getElementById('clear-all');
const taskCountElement = document.getElementById('tasks-count');
const completedCountElement = document.getElementById('completed-count');

// Task data array
let tasks = [];
```
This section selects all the necessary DOM elements that will be manipulated and initializes an empty tasks array.

### Data Management
``` javascript
// load tasks from local storage
function loadTasks(){
    // Try to get tasks from local storage
    const savedTasks = localStorage.getItem('tasks');

    // if tasks exist in local storage, parse them into our tasks array
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Save Tasks to local storage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
```
These function handle persistent storage:
- `loadTasks()`: Retrieves tasks from localStorage when the page loads.
- `saveTasks()`: Saves the current tasks to localStorage whenever changes are made.
### Task Operations
``` javascript
// Add a new task
function addTask(){
    const taskText = taskInput.value.trim();
    // check if task is not empty
    if(taskText)
    {
    // create a new task object
            const newTask = {
                id:Date.now(), // generate a unique id using timestamp
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            }

        // Add task to array
        tasks.push(newTask);
        console.log(tasks);

        // Save to local storage
        saveTasks();

        // clear input
        taskInput.value = '';

        // Update UI
        renderTasks();
    }
}

// Delete a task
function deleteTask(taskId){
    // Filter out the task with the given ID
    tasks = tasks.filter(function(task){
        return task.id !== taskId;
    });

    // save updated tasks to local storage
    saveTasks();

    // Update UI
    renderTasks();
}

// Toggle task completion
function toggleTaskCompletion(taskId){
    // find the task in the array
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id === taskId){
                            // Toggle the completed status
        tasks[i].completed = !tasks[i].completed;
        break;
    }

    }
    // save updated tasks to local storage
    saveTasks();

    // update UI
    renderTasks();
}

// clear all tasks
function clearAllTasks(){
    // confirm before clearing
    if(tasks.length > 0){
        const confirmed = confirm("Are you sure you want to delete all tasks?");
        
        if(confirmed){
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }
}
```
These function implement the core task operations:
- `addTask()`: Creates a new task object, adds it to the array and updates the UI.
- `deleteTask()`: Removes a specific task by ID using array filtering.
- `toggleTaskCompletion(taskId)`: Toggles the completed status of a task.
- `clearAllTasks()`: Removes all tasks after confirmation.
### UI Rendering
``` javascript
// function to update task counts
function updateTaskCounts(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(task){
        return task.completed;
    }).length;
    taskCountElement.textContent = `Total: ${totalTasks} tasks`;
    completedCountElement.textContent = `Completed: ${completedTasks}`;
}

// Render tasks to the UI
function renderTasks(){
    // clear current list
    taskList.innerHTML = '';

    // show/hide the no tasks messages
    if(tasks.length === 0){
        noTasksMessage.style.display = 'block';
    }else{
        noTasksMessage.style.display = 'none';
    }

    // Create task elements
    tasks.forEach(function(task){
        // create list items
        const li = document.createElement('li');
        li.className = 'task-item';

        // create check box
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function(){
            // call toggleTaskCompletion(task.id)
            toggleTaskCompletion(task.id);
        });

        // Create tasl text span
        const span = document.createElement('span');
        span.className = task.completed ? 'task-text completed' : 'task-text';
        span.textContent = task.text;

        // Create delete btn
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function(){
            deleteTask(task.id);
        });


        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    // update task counts
    updateTaskCounts();
}
```
These functions handle UI updates:
- `updateTaskCount()`: Calculates and displays the total and completed tasks counts.
- `renderTasks()`: Recreates the entire task list in the DOM based on the current data.
### Event Handling
```javascript
// Event Listeners
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e){
    // Add task when Enter key is pressed
    if(e.key === 'Enter'){
        addTask();
    }
});

// Initialize the app
loadTasks();
```
The final section sets up event listeners:
- Click Handler for the ADD button.
- Keypress handler for the Enter key in the input field.
- Click handler for the Clear All Button.
- Initial call `loadTasks()` to load tasks when the page loads.
## Data Management
The application uses a simple but effective data structure:
1. **Task Object Structure**:
    ```javascript
        const newTask = 
        {
            id:Date.now(), // generate a unique id using timestamp
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        }
    ```
2. **Storage Method**:
    - The aplication uses `localStorage` for persistent storage.
    - Tasks are stored as a JSON string and parsed back to an array when needed.
    - This allows tasks to persist even when the browser is closed and reopened.
## Event Flow
The typical flow of the operation is:
1. User adds a task -> `addTasks()` -> `saveTasks()` -> `renderTasks()`
2. User toggles completion -> `toggleTaskCompletion()` -> `saveTasks()` -> `renderTasks()`
3. User deletes a task -> `deleteTask()` -> `saveTasks()` -> `renderTasks()`
4. User clears all tasks -> `clearAllTasks()` -> `saveTasks()` -> `renderTasks()`

This pattern ensures that:
1. The data model (tasks array) is updates first.
2. Changes are persisted to localStorage
3. The UI is updated to reflect the current state.