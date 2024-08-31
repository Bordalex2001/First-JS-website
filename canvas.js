document.addEventListener('DOMContentLoaded', () => {
    const figure = document.getElementById("figure");
    if(!figure) throw "Element '#figure' not found";
    const context = figure.getContext('2d');
    window.figure = figure;
    window.gdc = context;
    /*const line1Button = document.getElementById("line-1-button");
    if(!line1Button) throw "Element '#line-1-button' not found";
    line1Button.onclick = drawLine1;*/
    const line1Color = document.getElementById("line-1-color");
    if(!line1Color) throw "Element '#line-1-color' not found";
    line1Color.addEventListener('input', drawLine1);
    /*const line2Button = document.getElementById("line-2-button");
    if(!line2Button) throw "Element '#line-2-button' not found";
    line2Button.onclick = drawLine2;*/
    const line2Color = document.getElementById("line-2-color");
    if(!line2Color) throw "Element '#line-2-color' not found";
    line2Color.addEventListener('input', drawLine2);
    /*const cosButton = document.getElementById("cos-button");
    if(!cosButton) throw "Element '#cos-button' not found";
    cosButton.onclick = drawCos;*/
    const cosColor = document.getElementById("cos-color");
    if(!cosColor) throw "Element '#cos-color' not found";
    cosColor.addEventListener('input', drawCos);
    const expandButton = document.getElementById("expand-button");
    if(!expandButton) throw "Element '#expand-button' not found";
    expandButton.onclick = expand;
    const resoluteButton = document.getElementById("resolute-button");
    if(!resoluteButton) throw "Element '#resolute-button' not found";
    resoluteButton.onclick = resolute;
function drawCos(){
    const w = 2;
    window.gdc.beginPath();
    window.gdc.strokeStyle = cosColor.value;
    window.gdc.lineWidth = w;
    window.gdc.moveTo(0, 75 + 75 * Math.cos(0 - 150) / 10);
    for(let i = 0; i < 300; i += w){
        window.gdc.lineTo(i, 75 - 75 * Math.cos((i - 150) / 10));
    }
    window.gdc.stroke();
    window.gdc.beginPath();
    window.gdc.strokeStyle = "#444";
    window.gdc.lineWidth = w;
    window.gdc.moveTo(0, 75);
    window.gdc.lineTo(300, 75);
    window.gdc.moveTo(150, 0);
    window.gdc.lineTo(150, 150);
    window.gdc.stroke();
}
function resolute(){
    window.figure.width = "600";
    window.figure.height = "300";
}
function expand(){
    window.figure.style.width = "600px";
    window.figure.style.height = "300px";
}
function drawLine1(){
    window.gdc.beginPath();
    window.gdc.strokeStyle = line1Color.value;
    window.gdc.lineWidth = 2;
    window.gdc.moveTo(15, 15);
    window.gdc.lineTo(285, 135);
    window.gdc.stroke();
}
function drawLine2(){
    window.gdc.beginPath();
    window.gdc.strokeStyle = line2Color.value;
    window.gdc.lineWidth = 2;
    window.gdc.moveTo(285, 15);
    window.gdc.lineTo(15, 135);
    window.gdc.stroke();
}
});
document.addEventListener('DOMContentLoaded', () => {
    loadAssets();
    window.location.hash = "";
    window.onhashchange = coinChanged;
    $("#clear-rates").click(clearRates);
    let canvas = $("#rates-canvas")[0];
    window.dcW  = canvas.clientWidth;
    window.dcH  = canvas.clientHeight;
    canvas.width = window.dcW;
    canvas.height = window.dcH;
    window.dc  = canvas.getContext('2d');
function clearRates(){
    window.dc.clearRect(0, 0, window.dcW, window.dcH);
    window.location.hash = "";
}
function coinChanged(){
    if(window.location.hash.length <= 1) return;
    loadHistory(document.location.hash.substring(1));
}
function loadHistory(assetId){
    const assetButton = document.querySelector(`a[href="#${assetId}"]`);
    let r = Math.floor(150 * Math.random());
    let g = Math.floor(150 * Math.random());
    let b = Math.floor(150 * Math.random());
    let a = 1;
    $.ajax({
        method: "GET",
        url: `https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`
    })
    .done(j =>{
        assetButton.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        let minRate = Number(j.data[0].priceUsd);
        let maxRate = Number(j.data[0].priceUsd); 
        let minTime = j.data[0].time;
        let maxTime = j.data[0].time;
        let timestamp = j.timestamp;
        let date = new Date(timestamp);
        let currentDate = "";
        if (date.getDate() < 10){
            currentDate += "0";
        }
        currentDate += date.getDate() + ".";
        if (date.getMonth() < 10){
            currentDate += "0";
        }
        currentDate += date.getMonth() + "." + date.getFullYear();
        let previousDate = "";
        if (date.getDate() < 10){
            previousDate += "0";
        }
        previousDate += date.getDate() + ".";
        if (date.getMonth() < 10){
            previousDate += "0";
        }
        previousDate += date.getMonth() + "." + (date.getFullYear() - 1);
        for(let rec of j.data){
            let rate = Number(rec.priceUsd);
            if(rate > maxRate) maxRate = rate;
            if(rate < minRate) minRate = rate;
            if(rec.time > maxTime) maxTime = rec.time;
            if(rec.time < minTime) minTime = rec.time;
        }
        const dc = document.getElementById("rates-canvas").getContext('2d');
        dc.beginPath();
        dc.lineWidth = 1;
        //dc.strokeStyle = "#333";
        dc.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        for(let rec of j.data){
            let rate = Number(rec.priceUsd);
            let x = (rec.time - minTime) * window.dcW / (maxTime - minTime);
            let y = window.dcH - 10 - (rate - minRate) * (window.dcH - 20) / (maxRate - minRate);
            dc.lineTo(x, y);
        }
        dc.stroke();
        a = 0.15;
        dc.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        //dc.fillStyle = "#90caf9";
        dc.lineTo(window.dcW, window.dcH);
        dc.lineTo(0, window.dcH);
        dc.fill();
        //a = 1;
        dc.fillText(Math.round(maxRate), window.dcW - 50, 25);
        dc.fillText(Math.round(minRate), window.dcW - 50, window.dcH - 25);
        dc.fillText(currentDate, window.dcW - 55, window.dcH - 5);
        dc.fillText(previousDate, 5, window.dcH - 5);
    });
}
function loadAssets(){
    $.ajax({
        method: "GET",
        url: "https://api.coincap.io/v2/assets?limit=7"
    })
    .done(j => {
        let html = "";
        for(let asset of j.data){
            html += `<a href="#${asset.id}" class="btn btn-flat rate-button">${asset.name}</a>`;
        }
        document.getElementById("assets-block").innerHTML = html;
    });
}
});
document.addEventListener('DOMContentLoaded', () => {
    $("#local-save").click(localSaveClick);
    $("#session-save").click(sessionSaveClick);
    window.timedrop = document.getElementById('session-timer');
    let saved = localStorage.getItem("saved");
    if(saved){
        $("#local-input").val(saved);
    }
    $("#local-delete").click( _ => {
        localStorage.removeItem("saved");
        $("#local-input").val("");
    });
    //saved = sessionStorage.getItem("saved");
    /*if(saved){
        $("#session-input").val(saved);
    }*/
    $("#session-delete").click( _ => {
        sessionStorage.removeItem("saved");
        $("#session-input").val("");
    });
    setInterval(timerTick, 1000);

function localSaveClick(){
    localStorage.setItem("saved", 
    $("#local-input").val());
    localStorage.setItem(
        "moment",
        new Date()
    );
}
function sessionSaveClick(){
    sessionStorage.setItem("saved", 
    $("#session-input").val());
    sessionStorage.setItem(
        "moment",
        new Date()
    );
}
function timerTick(){
    let currentTime = new Date();
    var timeValue = window.timedrop.value;
    let savedMoment = localStorage.getItem("moment");
    let sessionMoment = sessionStorage.getItem("moment");
    if(savedMoment){
        let moment = new Date(savedMoment);
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        $("#local-period").text(Math.round(period));
        const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const hourMinuteInput = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
        if(currentHourMinute >= hourMinuteInput){
            localStorage.removeItem("saved");
            localStorage.removeItem("moment");
            localSaveClick();
            period = 0;
            window.timedrop.value = null;
        }
    }
    else{
        $("#local-period").text("---");
    }
    
    //savedMoment = sessionStorage.getItem("moment");
    if(sessionMoment){
        let moment = new Date(sessionStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        $("#session-period").text(Math.round(period));
        const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const hourMinuteInput = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
        if(currentHourMinute >= hourMinuteInput){
            sessionStorage.removeItem("saved");
            sessionStorage.removeItem("moment");
            localSaveClick();
            period = 0;
            window.timedrop.value = null;
        }
    }
    else{
        $("session-period").text("---");
    }
}
});