//VARIABLES
const btnDelete = document.querySelector('.btnDelete')
const btnCreate = document.querySelector('.btnCreate')
const textArea = document.querySelector('.inputForm')
const list = document.querySelector('.cardList')
const subtitle = document.querySelector('.subtitle')
const checkbox = document.querySelector('#important')
const btnClear = document.querySelector('#btnClear')
let tasks = []

//EVENTOS
btnDelete.addEventListener('click', deleteText) 
btnCreate.addEventListener('click', createTask)
btnClear.addEventListener('click', deleteList)
list.addEventListener('click', deleteTask)
list.addEventListener('click', completeTask)


//FUNCIONES
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
    if(checkbox.checked){
        card = `<li 
        class='card important'>
            ${task}
            <div>
            <button class="btnComplete">✅</button>
            <button class="btnDelete">🗑️</button>
            </div>
        </li>`
    }else{
        card = `<li 
        class='card'>
            ${task}
            <div>
            <button class="btnComplete">✅</button>
            <button class="btnDelete">🗑️</button>
            </div>
        </li>`
    }
    if(!task){
        return
    } else{
        checkbox.checked = false
        textArea.value = ''
        list.innerHTML += card
        tasks.push(task)
        saveData()
        writeSubtitle()
    }
}

function deleteTask(e) {
    if (e.target.classList.contains('btnDelete')) {
        const card = e.target.closest('.card');
        card.remove();
        tasks.splice(card, 1)
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

function saveData(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

function renderTasks() {
    list.innerHTML = '';
    for (const task of tasks) {
        let card;
        if (checkbox.checked) {
        card = `<li class='card important'>
                    ${task}
                    <div>
                        <button class="btnComplete">✅</button>
                        <button class="btnDelete">🗑️</button>
                    </div>
                </li>`;
        } else {
        card = `<li class='card'>
                    ${task}
                    <div>
                        <button class="btnComplete">✅</button>
                        <button class="btnDelete">🗑️</button>
                    </div>
                </li>`;
        }
        list.innerHTML += card;
    }
}

loadData();
writeSubtitle()



