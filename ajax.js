Number.prototype.localeCompare = function(other){
    const self = this.valueOf();
    if(self < other) return -1;
    if(self > other) return 1;
    return 0;
}
window.ascSymbol = "&#x25B2;";
window.descSymbol = "&#x25BC;";
window.sortMode = "none";
document.addEventListener('DOMContentLoaded', () => {
    const loadRatesButton = document.getElementById("load-rates-button");
    if(!loadRatesButton){
        throw "Element #load-rates-button not found";
    }
    loadRatesButton.addEventListener('click', loadRatesButtonClick);
    const outBlock = document.getElementById("out-block");
    if(!outBlock){
        throw "Element #out-block not found";
    }
});
function formatDate(dateString){
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}${month}${day}`;
}
function loadRatesButtonClick(){
    const date = document.getElementById("date").value;
    const jsonDate = formatDate(date);
    const outBlock = document.getElementById("out-block");
    if (!date) {
        outBlock.innerHTML = "<span style='color: red;'>Оберіть дату, будь ласка.</span>";
        return;
    }
    //outBlock.innerHTML = ``;
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${jsonDate}&json`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Connection': 'close'
        },
    })
    .then(response => { 
        if(response.status != 200){
            alert('Fetch error: status: ' + response.status);
        }
        else{
            response.json()
            .then(j => {
                window.rates = j;
                showTable();
            });
        }
    })
    .catch(reason => {  
        alert('Fetch error: status: ' + reason);
    });
}
function showTable(){
    const outBlock = document.getElementById("out-block");
    if(typeof window.rates === 'undefined'){
        throw "showTable() calls with empty 'window.rates'";
    }
    const r030Symbol = window.sortMode == "r030Asc" ? window.descSymbol : window.ascSymbol;
    const ccSymbol = window.sortMode == "ccAsc" ? window.descSymbol : window.ascSymbol;
    const txtSymbol = window.sortMode == "txtAsc" ? window.descSymbol : window.ascSymbol;
    const rateSymbol = window.sortMode == "rateAsc" ? window.descSymbol : window.ascSymbol;
    const date = document.getElementById("date").value;
    let table = `<table class='rates-table'>
    <caption>Курси валют на ${date}</caption><br>
    <tr><th>R030 <b data-sort='r030'>${r030Symbol}</b></th>
    <th>Код <b data-sort='cc'>${ccSymbol}</b></th>
    <th>Назва <b data-sort='txt'>${txtSymbol}</b></th>
    <th>Курс <b data-sort='rate'>${rateSymbol}</b></th></tr>`;
    for(let rate of window.rates){
        table += `<tr><td>${rate.r030}</td><td>${rate.cc}</td><td>${rate.txt}</td><td>${rate.rate}</td></tr>`;
    }
    table += "</table>";
    outBlock.innerHTML = table;
    addSortListeners();
}
function addSortListeners(){
    for(let b of document.querySelectorAll("[data-sort]")){
        b.addEventListener('click', sortClick);
    }
    for(let th of document.querySelectorAll("[data-sort]")){
        th.addEventListener('click', sortClick);
    }
}
function sortClick(e){
    if(typeof window.rates === 'undefined'){
        throw "sortClick() calls with empty 'window.rates'";
    }
    const sortField = e.target.getAttribute("data-sort");
    console.log(`Sorted by '${sortField}'`);
    let suffix;
    if(window.sortMode == `${sortField}Asc`){
        window.rates.sort((a,b) => a[sortField].localeCompare(b[sortField]));
        suffix = "Desc";
    }
    else{
        window.rates.sort((b,a) => a[sortField].localeCompare(b[sortField]));
        suffix = "Asc";
    }
    window.sortMode = `${sortField}${suffix}`;
    showTable();
}