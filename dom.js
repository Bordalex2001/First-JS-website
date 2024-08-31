document.addEventListener('DOMContentLoaded', function() {
    const decrementButton1 = document.getElementById("decrement-button1");
    const incrementButton1 = document.getElementById("increment-button1");
    if (decrementButton1) decrementButton1.addEventListener('click', decrementButtonClick1);
    if (incrementButton1) incrementButton1.addEventListener('click', incrementButtonClick1);
    const calcValue1 = document.getElementById("calc-value1");
    if(calcValue1) {
        const value = calcValue1.innerText;
        window.calcValue1 = Number(value);
    }

    const decrementButton2 = document.getElementById("decrement-button2");
    const incrementButton2 = document.getElementById("increment-button2");
    if (decrementButton2) decrementButton2.addEventListener('click', decrementButtonClick2);
    if (incrementButton2) incrementButton2.addEventListener('click', incrementButtonClick2);
    const calcValue2 = document.getElementById("calc-value2");
    if(calcValue2) {
        window.calc2 = {
            "element": calcValue2,
            "value": Number(calcValue2.innerText)
        };
    }
});
function decrementButtonClick1() {
    window.calcValue1 -= 1;
    const calcValue1 = document.getElementById("calc-value1");
    calcValue1.innerText = window.calcValue1;
}
function incrementButtonClick1() {
    window.calcValue1 += 1;
    const calcValue1 = document.getElementById("calc-value1");
    calcValue1.innerText = window.calcValue1;
}
function decrementButtonClick2() {
    window.calc2.element.innerText = (window.calc2.value -= 1);
}
function incrementButtonClick2() {
    window.calc2["element"].element.innerText = (window.calc2["value"].value += 1);
}
function helloClick() {
    const userName = document.getElementById("user-name").value;
    if (!userName) {
        alert("Введіть ім'я")
    }
    const userSurname = document.getElementById("user-surname").value;
    if (!userSurname) {
        alert("Введіть прізвище")
    }
    const outBlock = document.querySelector("#out-block");
    if(!outBlock) {
        throw "Element '#out-block' not found" ;
    }
    else{
        //outBlock.innerText = "Hello " + userName;
        outBlock.innerHTML = `Hello, <b>${userName} ${userSurname}</b>`;
    }
}