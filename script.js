// initialize with blank array and name as tasks

let tasks=[];

// Add task to the list
function addTask(){
    const input=document.getElementById('taskInput');
    const task=input.value.trim();
    if(task!=='')
    {
        tasks.push(task);
        console.log(task)
        input.value='';
        displayTask();
    }
}

// remove task
function removeTask(){
    tasks.splice(indexedDB,1);
    displayTask();
}

// edit task
function editTask(index){
    const newTask=prompt('Edit Task', tasks[index])
    if(newTask !== null && newTask !==''){
        tasks[index]=newTask.trim()
        displayTask()
    }
}

// Display task list
function displayTask(){
    const taskList=document.getElementById('taskList');
    let html='';
    for(let i=0; i<tasks.length; i++){
        html += `
        <div class="task-item">
        <span class="task-text">
        ${i+1}. ${tasks[i]}
        </span>

        <div class="button-group">
        <button class="edit-btn" onclick="editTask(${i})">Edit</button>
        <button class="delete-btn" onClick="removeTask(${i})">Delete</button>
        </div>
        </div>
        `;
    }
    taskList.innerHTML=html;
}