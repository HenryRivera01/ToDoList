const tasks = [];


const form = document.getElementById("myForm");
const taskContainer = document.getElementById("taskContainer");
const inputTask = document.querySelector(".input"); // Input donde se escribe la tarea
const taskForm = document.getElementById("myForm"); // Formulario de la tarea

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; //Recupera tareas previas o crea un array vacio si no habia nada guardado
  tasks.push(...storedTasks)//Cargando tareas previas al array
  renderTasks();
});

window.addEventListener("resize", () => {
  if (window.innerHeight < 500) { // Detecta cuando aparece el teclado en móviles
    const inputRect = inputTask.getBoundingClientRect(); // Obtiene la posición del input
    const spaceNeeded = window.innerHeight - inputRect.bottom - 20; // Calcula el espacio faltante

    if (spaceNeeded < 0) { // Si el input está tapado
      document.body.style.paddingBottom = `${Math.abs(spaceNeeded) + 100}px`; // Ajusta el padding dinámicamente
      taskForm.scrollIntoView({ behavior: "smooth", block: "center" }); // Centra el formulario en la vista
    }
  } else {
    document.body.style.paddingBottom = "0"; // Restaura el padding cuando se oculta el teclado
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let currentTask = e.target[0].value.trim(); 
  if (currentTask === "") {
    createAlert('No puedes agregar tareas vacías 🚫');
    return;
  }

  const editingIndex = form.getAttribute("data-editing-index");
  //Si estamos editando, actualizar la tarea en el array
  if (editingIndex !== null){
    tasks[editingIndex].name = currentTask;
    form.removeAttribute("data-editing-index");
  }else{
    //Si no estamos editando, agregar una nueva tarea
    const newTask = { name: currentTask, completed: false }; // Crear objeto tarea
    tasks.push(newTask); // Agregar objeto en vez de solo texto
  }

  localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar correctamente

  renderTasks();
  
  form.reset();
});

function createNewTask(infoTask, index) {

  const row = document.createElement('TR');// Creando una nueva fila

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

  if (tasks[index].completed) {
    tdTask.style.textDecoration = "line-through"; //Tacha la tarea si está marcada
  }

  //Columna 4: Editar
  const tdEditButton = document.createElement('TD');
  const editTaskButton = document.createElement('BUTTON');
  editTaskButton.classList.add('btnEdit');
  editTaskButton.textContent = '✏️';

  editTaskButton.addEventListener("click", ()=>editTask(index))
  tdEditButton.appendChild(editTaskButton);
  row.appendChild(tdEditButton);

  //Columna 5: Delete
  const tdDeleteButton = document.createElement('TD');//Creamos la columna del delete
  const deleteTaskButton = document.createElement('BUTTON');//Creamos el boton de borrar
  deleteTaskButton.classList.add('btnDelete');
  deleteTaskButton.textContent = '🗑️' //Asignamos el contenido del boton, en este caso una X
  row.appendChild(tdDeleteButton); // La columna es hija de row
  tdDeleteButton.appendChild(deleteTaskButton); // El boton es hijo de la columna
  deleteTaskButton.addEventListener("click", () => deleteTask(index))
  taskContainer.appendChild(row); //Toda esa fila será hija o se posicionará en el taskContainer que es el tbody
  deleteTaskButton.classList.add("delete"); // Agregar clase
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
  //Si no hay tareas, se oculta la tabla
  if(tasks.length===0){
    document.getElementById('taskTable').style.display = "none";
  }else{
    //Si hay aunque sea una tarea se muestra la tabla
    document.getElementById('taskTable').style.display = "table";
  }

  //Se recorren las tareas y asi mismo se renderizan y crean las filas en la tabla
  tasks.forEach((task, index) => createNewTask(task, index));

  const editingIndex = form.getAttribute("data-editing-index");
  if (editingIndex !== null) {
    const editButtons = document.querySelectorAll(".btnEdit");
    if (editButtons[editingIndex]) {
      editButtons[editingIndex].classList.add("editing");
    }
  }
}

function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed; //Cuando se llama a esta funcion con el index de una tarea esta linea cambia su estado de true a false
  localStorage.setItem("tasks", JSON.stringify(tasks)); //Guarda el estado del checkbox en localStorage
  renderTasks(); //Vuelve a renderizar las tareas

  //Agregando la animación

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes[index].classList.add("bounce");

  // Remover la clase después de la animación para que pueda repetirse
  setTimeout(() => {
    checkboxes[index].classList.remove("bounce");
  }, 300);
}

function deleteTask(index){

  const button = event.target; // Obtiene el botón que disparó el evento
  button.classList.add("shake"); // Agregar la animación

  setTimeout(() => { 
  // Verificar si la tarea que se elimina es la misma que se está editando
  const editingIndex = form.getAttribute("data-editing-index");
  if (editingIndex !== null && parseInt(editingIndex) === index) {
    form.removeAttribute("data-editing-index");
    form.reset();
    document.querySelectorAll(".btnEdit").forEach(btn => btn.classList.remove("editing"));
  }

  tasks.splice(index, 1);//Eliminamos la tarea del array
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();//actualizamos la tabla
  }, 300);
}

function editTask(index){

  const inputField = document.querySelector("#myForm input[name='taskname']")//Obtenemos el input

  if(!inputField) {
    console.error("No se encontro el campo de entrada");
    return;
  }

  inputField.value = tasks[index].name; //Cargar la tarea en el input actual
  inputField.focus();// Enfocamos el input para que el usuario escriba

  // Resetear todos los botones de edición
  document.querySelectorAll(".btnEdit").forEach(btn => btn.classList.remove("editing"));

  // Agregar clase "editing" al botón de edición correspondiente
  const editButtons = document.querySelectorAll(".btnEdit");
  editButtons[index].classList.add("editing");

  form.setAttribute("data-editing-index", index);

}
