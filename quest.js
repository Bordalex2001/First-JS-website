function loadQuestions(){
    return[
        "Питання",
        "Питання",
        "Питання",
        "Питання"
    ];
}
async function generateTable(questions){
    let res = '<table class="quest-table">';
    let n = 1;
    for(let quest of questions){
        res += `<tr data-quest="${n}">
        <td>${n}. ${quest}</td>
        <td><input name="quest-radio-${n}" id="quest-radio-${n}1" value="no" type="radio"><label for="quest-radio-${n}1">:(</label></td>
        <td><input name="quest-radio-${n}" id="quest-radio-${n}2" value="maybe" type="radio"><label for="quest-radio-${n}2">:|</label></td>
        <td><input name="quest-radio-${n}" id="quest-radio-${n}3" value="yes" type="radio"><label for="quest-radio-${n}3">:)</label></td>
        </tr>`;
        n += 1;
    }
    res += "</table><button onclick='doneClick()'>Готово</button>";
    return res;
}
document.addEventListener('DOMContentLoaded', function(){
    generateTable(loadQuestions())
    .then(html => document.getElementById("table-container").innerHTML = html);
});
function doneClick(){
    const questElements = document.querySelectorAll('[data-quest]');
    let results = [];
    let withoutAnswer = [];
    for(let quest of questElements){
        let n = quest.getAttribute('data-quest');
        let name = `quest-radio-${n}`;
        let radioButton = quest.querySelector(`input[name="${name}"]:checked`);
        if(radioButton == null){
            withoutAnswer.push(n);
            continue;
        }
        results.push({
            "question": n,
            "answer": radioButton.value
        });
    }
    if(withoutAnswer.length != 0){
        alert('Ви не дали відповідь на питання: ' + withoutAnswer.join(', '));
        return;
    }
    else{
        console.log(results);
    }
}