


const form = document.getElementById('myForm');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e.target[0]);
})