document.onsubmit = function(e) {
    e.preventDefault();
    //console.log(e);
    //#region Name
    const userNameInput = e.target.querySelector('[name="user-name"]');
    if(!userNameInput){
        alert('У формі не знайдено поле [name="user-name"]');
        return;
    }
    const userName = userNameInput.value.trim();
    let data = {inputElement: userNameInput, message: "Перевірено.", isError: false};
    if(userName.length == 0){
        data.message = "Ім'я не може бути порожнім.", 
        data.isError = true;
    }
    else if(userName.length < 2){
        data.message = "Ім'я занадто коротке.", 
        data.isError = true;
    }
    else{
        let regexEng = /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/;
        let regexUkr = /^[А-ЯЇЇЄҐ'][а-яіїєґ']+(\s+[А-ЯІЇЄҐ'][а-яіїєґ']+)*$/;
        if(!regexEng.test(userName) && !regexUkr.test(userName)){
            data.message = "Їм'я має починатись з великої літери та продовжуватись маленькими.",
            data.isError = true;
        }
    }
    setHelperMessage(data);
    //console.log(userName);
    //#endregion
    //#region Password
    const userPasswordInput = e.target.querySelector('[name="user-password"]');
    if(!userPasswordInput){
        alert('У формі не знайдено поле [name="user-password"]');
        return;
    }
    const userPassword = userPasswordInput.value.trim();
    data = {inputElement: userPasswordInput, message: "Перевірено.", isError: false};
    if(userPassword.length == 0){
        data.message = "Пароль не може бути порожнім.", 
        data.isError = true;
    }
    else if(userPassword.length < 8){
        data.message = "Пароль занадто короткий.", 
        data.isError = true;
    }
    else{
        //let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()_\-+=]{8,}$/;
        if(!/[0-9]/.test(userPassword)){
            data.message = "Пароль має мати принаймні одну цифру.",
            data.isError = true;
        }
        else if(!/[a-z]/.test(userPassword)){
            data.message = "Пароль має мати принаймні одну маленьку латинську літеру.",
            data.isError = true;
        }
        else if(!/[A-Z]/.test(userPassword)){
            data.message = "Пароль має мати принаймні одну велику латинську літеру.",
            data.isError = true;
        }
        else if(!/[~!@#$%^&*()_\-+=|\\\/[\]<>:;]/.test(userPassword)){
            data.message = "Пароль має мати принаймні один спеціальний символ.",
            data.isError = true;
        }
    }
    setHelperMessage(data);
    //console.log(userPassword);
    //#endregion
    //#region Phone
    const userPhoneInput = e.target.querySelector('[name="user-phone"]');
    if(!userPhoneInput){
        alert('У формі не знайдено поле [name="user-phone"]');
        return;
    }
    const userPhone = userPhoneInput.value;
    data = {inputElement: userPhoneInput, message: "Перевірено.", isError: false};
    if(userPhone.length == 0){
        data.message = "Телефон не може бути порожнім.", 
        data.isError = true;
    }
    else{
        //let regex = /^\d{6,10}$/; //від 6 до 10 цифр
        //let regex = /^\d(-?\d){5,9}$/; //дозволяється "-" перед кожною цифрою (окрім першої)
        //let regex = /^\d([-\s]?\d){5,9}$/; //дозволяється "-" або " " перед кожною цифрою (окрім першої)
        userPhone = userPhone.replace(/\D+/g, "");
        let regex = /^\d{6,10}$/;
        if(!regex.test(userPhone))
        {
            data.message = "Телефон має містити від 6 до 10 цифр.";
            data.isError = true;
        }
        else{
            userPhoneInput.value = userPhone;
        }
    }
    setHelperMessage(data);
    //console.log(userPhone);
    //#endregion
    //#region Repeat
    const userRepeatInput = e.target.querySelector('[name="user-repeat"]');
    if(!userRepeatInput){
        alert('У формі не знайдено поле [name="user-repeat"]');
        return;
    }
    const userRepeat = userRepeatInput.value.trim();
    data = {inputElement: userRepeatInput, message: "Паролі однакові.", isError: false};
    if(userRepeat.length == 0){
        data.message = "Знову введіть пароль, щоб підтвердити.", 
        data.isError = true;
    }
    else if(userRepeat != userPassword){
        data.message = "Паролі не збігаються."
        data.isError = true;
    }
    setHelperMessage(data);
    //console.log(userRepeat);
    //#endregion
    //#region Email
    const userEmailInput = e.target.querySelector('[name="user-email"]');
    if(!userEmailInput){
        alert('У формі не знайдено поле [name="user-email"]');
        return;
    }
    const userEmail = userEmailInput.value.trim();
    data = {inputElement: userEmailInput, message: "Перевірено.", isError: false};
    if(userEmail.length == 0){
        data.message = "Email-адреса не може бути порожньою.", 
        data.isError = true;
    }
    else if(userEmail.length < 6){
        data.message = "Email-адреса занадто короткa.", 
        data.isError = true;
    }
    else{
        let regex = /^[a-z0-9.]+@[a-z]+.[a-z]{6,}$/;
        if(!regex.test(userEmail)){
            data.message = "Email-адреса має мати принаймні букви, символи \"@\" та \".\".",
            data.isError = true;
        }
    }
    setHelperMessage(data);
    //console.log(userEmail);
    //#endregion
    //#region Birthdate
    const userBirthdateInput = e.target.querySelector('[name="user-birthdate"]');
    if(!userBirthdateInput){
        alert('У формі не знайдено поле [name="user-birthdate"]');
        return;
    }
    const userBirthdate = userBirthdateInput.value.trim();
    data = {inputElement: userBirthdateInput, message: "Перевірено.", isError: false};
    if(userBirthdate.length == 0){
        data.message = "Дата народження не може бути порожньою.", 
        data.isError = true;
    }
    setHelperMessage(data);
    //console.log(userBirthdate);
    //#endregion
}
function setHelperMessage({inputElement, message, isError}){
    const helperText = inputElement.parentNode.querySelector(".helper-text");
    if(isError){
        helperText.setAttribute("data-error", message);
        inputElement.classList.remove("valid");
        inputElement.classList.remove("validate");
        inputElement.classList.add("invalid");
    }
    else{
        helperText.setAttribute("data-success", message);
        inputElement.classList.remove("invalid");
        inputElement.classList.remove("validate");
        inputElement.classList.add("valid");
    }
}