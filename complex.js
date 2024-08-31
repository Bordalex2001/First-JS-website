document.addEventListener('DOMContentLoaded', () => {
    window.obj = {
        "name": "User",
        "surname": "Experienced"
    };
    updateCurrentFields();
    const addFieldButton = document.getElementById("add-field-button");
    if (addFieldButton){
        addFieldButton.onclick = addFieldClick;
    }
    window.users = [
        {name: "User", surname: "Experienced"},
        {name: "Admin", surname: "Networker"},
        {name: "Moder", surname: "Designer"},
    ];
    updateRegisteredUsers(); 
});
function updateRegisteredUsers(){
    const usersContainer = document.getElementById("registered-users");
    if(!usersContainer){
        throw "Element #registered-users not found";
    }
    usersContainer.innerHTML = "";
    const tr = document.createElement("tr");
    const thName = document.createElement("th");
    thName.innerText = "Name";
    const thSurname = document.createElement("th");
    thSurname.innerText = "Surname";
    tr.append(thName, thSurname);  
    usersContainer.appendChild(tr);
    for(let user of window.users){
        const txt = document.createTextNode(`Name: ${user.name} Surname: ${user.surname}`);
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.appendChild(txt);
        tdName.innerText = user.name;
        tr.appendChild(tdName);
        const tdSurname = document.createElement("td");
        tdSurname.appendChild(txt);
        tdSurname.innerText = user.surname;
        tr.appendChild(tdSurname);
        usersContainer.appendChild(tr);
    }
}
function updateCurrentFields(){
    console.log(window.obj);
    const currentFields = document.getElementById("current-fields");
    if(!currentFields){
        throw "Element #current-fields not found";
    }
    currentFields.innerHTML = "";
    for(let key in window.obj){
        currentFields.innerHTML += `${key}: ${window.obj[key]} <button data-key="${key}">X</button> <br>`;
    }
    deleteButtons();
}
function addFieldClick(){
    const newFieldName = document.getElementById("add-field-name");
    if(!newFieldName) throw "Element #add-field-name not found";
    const newFieldValue = document.getElementById("add-field-value");
    if(!newFieldValue) throw "Element #add-field-value not found";
    if(newFieldName.value in window.obj){
        alert(`В об'єкті вже наявне поле ${newFieldName.value} із значенням ${window.obj[newFieldName.value]}`);
        return;
    }
    for(let key in window.obj){
        if(window.obj[key] === newFieldValue.value){
            alert(`В об'єкті вже наявне поле зі значенням ${newFieldValue.value}: ${key}`);
            return;
        }
    }
    window.obj[newFieldName.value] = newFieldValue.value;
    updateCurrentFields();
    newFieldName.value = "";
    newFieldValue.value = "";
}
function deleteButtons(){
    const buttons = document.querySelectorAll('button[data-key]');
    for(let button of buttons){
        button.onclick = deleteButtonClick;
    }
}
function deleteButtonClick(e){ //e – event
    const key = e.target.getAttribute("data-key");
    //console.log(key);
    delete window.obj[key];
    updateCurrentFields();
}