const tasks = [];

const form = document.getElementById("myForm");
const taskContainer = document.getElementById("taskContainer");
let currentIDTask = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let currentTask = e.target[0].value; //Obteniendo el valor del input
  if (currentTask.trim() === "") {// Evitar agregar tareas vacías
    createAlert('No puedes agregar tareas vacias 🚫')
    return;
  }  

  createNewTask(currentTask); //Creando una nueva task con el valor capturado
  currentIDTask++; //Aumentando el ID de cada tarea

  tasks.push(currentTask);
  form.reset();
  console.log(tasks);
});

function createNewTask(infoTask) {
 
  const row = document.createElement('TR');// Creando una nueva columna

  const tdIndex = document.createElement('TD'); //Creando primer columna del index
  tdIndex.textContent = currentIDTask + 1; //Agregando el valor del index
  row.appendChild(tdIndex); //La nueva tarea se posicionara en el taskContainer

  const tdTask = document.createElement('TD');
  tdTask.textContent = infoTask;
  row.appendChild(tdTask);

  const tdCheckBox = document.createElement('TD');//Creando la columna del checkbox
  const checkBox = document.createElement('input'); //Dentro de dicha columna se crea un input
  checkBox.type = 'checkbox'; // Se especifica que el input es un checkbox
  tdCheckBox.appendChild(checkBox); //El checkbox se posiciona en la columna respectiva
  row.appendChild(tdCheckBox);

  const tdDeleteButton = document.createElement('TD');//Creamos la columna del delete
  const deleteTaskButton = document.createElement('BUTTON');//Creamos el boton de borrar
  deleteTaskButton.textContent = '❌' //Asignamos el contenido del boton, en este caso una X
  row.appendChild(tdDeleteButton); // La columna es hija de row
  tdDeleteButton.appendChild(deleteTaskButton); // El boton es hijo de la columna
  
  taskContainer.appendChild(row); //Toda esa fila será hija o se posicionará en el taskContainer que es el tbody

}

function createAlert(message){
    const alerta = document.createElement('P')
    alerta.textContent = message;
    form.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    },3000);

}