const tasks = [];


const form = document.getElementById("myForm");
const taskContainer = document.getElementById("taskContainer");

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; //Recupera tareas previas o crea un array vacio si no habia nada guardado
  tasks.push(...storedTasks)//Cargando tareas previas al array
  renderTasks();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let currentTask = e.target[0].value.trim(); 
  if (currentTask === "") {
    createAlert('No puedes agregar tareas vacías 🚫');
    return;
  }

  const newTask = { name: currentTask, completed: false }; // Crear objeto tarea
  tasks.push(newTask); // Agregar objeto en vez de solo texto
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar correctamente

  renderTasks();
  
  form.reset();
});

function createNewTask(infoTask, index) {

  const row = document.createElement('TR');// Creando una nueva columna

  //Columna 1: indexTask
  const tdIndex = document.createElement('TD'); //Creando primer columna del index
  tdIndex.textContent = index + 1; //Agregando el valor del index
  row.appendChild(tdIndex); //La nueva tarea se posicionara en el taskContainer

  //Columna 2 NameTask
  const tdTask = document.createElement('TD');
  tdTask.textContent = infoTask.name;
  row.appendChild(tdTask);

  //Columna 3: Checkbox
  const tdCheckBox = document.createElement('TD');//Creando la columna del checkbox
  const checkBox = document.createElement('input'); //Dentro de dicha columna se crea un input
  checkBox.type = 'checkbox'; // Se especifica que el input es un checkbox
  checkBox.checked = infoTask.completed || false; //Si está en localStorage como completada
  checkBox.addEventListener('change', () => toggleTaskCompleted(index));
  tdCheckBox.appendChild(checkBox); //El checkbox se posiciona en la columna respectiva
  row.appendChild(tdCheckBox);

  const tdDeleteButton = document.createElement('TD');//Creamos la columna del delete
  const deleteTaskButton = document.createElement('BUTTON');//Creamos el boton de borrar
  deleteTaskButton.textContent = '❌' //Asignamos el contenido del boton, en este caso una X
  row.appendChild(tdDeleteButton); // La columna es hija de row
  tdDeleteButton.appendChild(deleteTaskButton); // El boton es hijo de la columna

  taskContainer.appendChild(row); //Toda esa fila será hija o se posicionará en el taskContainer que es el tbody

  if (tasks[index].completed) {
    tdCheckBox.style.textDecoration = "line-through"; //Tacha la tarea si está marcada
  }

}

function createAlert(message) {
  const alerta = document.createElement('P')
  alerta.textContent = message;
  form.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);

}

function renderTasks(){
  taskContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar
  tasks.forEach((task, index) => createNewTask(task, index));
}

function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed; //Cuando se llama a esta funcion con el index de una tarea esta linea cambia su estado de true a false
  localStorage.setItem("tasks", JSON.stringify(tasks)); //Guarda el estado del checkbox en localStorage
  renderTasks(); //Vuelve a renderizar las tareas
}

