//#region Task1
document.getElementById('enterName')
.addEventListener('input', function(inputEvent){
    let nameInput = inputEvent.target;
    nameInput.value = nameInput.value.replace(/\d/, '');
});
//#endregion
//#region Task2
const openModalBtn = document.getElementById("openModal");
const modalWndw = document.getElementById("modal");

openModalBtn.addEventListener('click', function(){
    modalWndw.classList.add('show');
})

const closeModalBtn = document.getElementById("closeModal");
closeModalBtn.addEventListener('click', function(){
    modalWndw.classList.remove('show');
})
//#endregion
//#region Task4
const redLight = document.getElementById("redLight");
const yellowLight = document.getElementById("yellowLight");
const greenLight = document.getElementById("greenLight");
const nextBtn = document.getElementById("nextBtn");

let currentLight = 0;

function updateLight(){
    redLight.classList.remove("red");
    yellowLight.classList.remove("yellow");
    greenLight.classList.remove("green");

    if(currentLight == 0){
        redLight.classList.add("red");
    }
    else if(currentLight == 1){
        yellowLight.classList.add("yellow");
    }
    else if(currentLight == 2){
        greenLight.classList.add("green");
    }
}

nextBtn.addEventListener("click", () => {
    currentLight = (currentLight + 1) % 3;
    updateLight();
})

updateLight();
//#endregion