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
  const newTask = document.createElement("H3");
  newTask.textContent = infoTask; //Asignando el nuevo texto de la tarea
  taskContainer.appendChild(newTask); //La nueva tarea se posicionara en el taskContainer
}

function createAlert(message){
    const alerta = document.createElement('P')
    alerta.textContent = message;
    form.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    },3000);

}