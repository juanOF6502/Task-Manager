// VARIABLES
const btnDelete = document.querySelector('.btnDelete')
const btnCreate = document.querySelector('.btnCreate')
const textArea = document.querySelector('.inputForm')
const list = document.querySelector('.cardList')
const subtitle = document.querySelector('.subtitle')
const btnClear = document.querySelector('#btnClear')
const checkbox = document.querySelector('#important')
let tasks = []

// EVENTOS
btnDelete.addEventListener('click', deleteText) 
btnCreate.addEventListener('click', createTask)
btnClear.addEventListener('click', deleteList)
list.addEventListener('click', deleteTask)
list.addEventListener('click', completeTask)

// FUNCIONES
function deleteText(e){
    e.preventDefault()
    textArea.value = ''
}

function deleteList(){
    list.innerHTML = ''
    tasks.splice(0, tasks.length)
    saveData()
    writeSubtitle()
}

function createTask(e){
    e.preventDefault()
    const task = textArea.value
    let card
    const isChecked = checkbox.checked
    if(isChecked){
        card = createCardElement(task, true)
    }else{
        card = createCardElement(task, false)
    }
    if(!task){
        return
    } else{
        textArea.value = ''
        list.appendChild(card)
        tasks.push({
            task: task,
            important: isChecked
        })
        saveData()
        writeSubtitle()
        checkbox.checked = false
    }
}

function createCardElement(task, isImportant) {
    const li = document.createElement('li')
    li.classList.add('card')
    if(isImportant){
        li.classList.add('important')
    }
    li.innerHTML = `
        ${task}
        <div>
            <button class="btnComplete">✅</button>
            <button class="btnDelete">🗑️</button>
        </div>
    `
    return li
}

function deleteTask(e) {
    if (e.target.classList.contains('btnDelete')) {
        const card = e.target.closest('.card');
        card.remove();
        const index = Array.from(list.children).indexOf(card)
        tasks.splice(index, 1)
        saveData()
        writeSubtitle()
    }
}

function completeTask(e) {
    if (e.target.classList.contains('btnComplete')) {
        const btnComplete = e.target;
        if (btnComplete.classList.contains('complete')) {
            btnComplete.classList.remove('complete');
        } else {
            btnComplete.classList.add('complete');
        }
    }
}

function writeSubtitle(){
    list.children.length === 0 
    ? subtitle.innerHTML = 'Crea tu primer tarea' 
    : subtitle.innerHTML = 'Tus tareas'
}

function saveData() {
    const data = {
        tasks: tasks
    };
    localStorage.setItem('data', JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        const data = JSON.parse(savedData);
        tasks = data.tasks;
        renderTasks();
    }
}

function renderTasks() {
    list.innerHTML = '';
    for (const taskObj of tasks) {
        const card = createCardElement(taskObj.task, taskObj.important)
        list.appendChild(card);
    }
}

loadData();
writeSubtitle();



