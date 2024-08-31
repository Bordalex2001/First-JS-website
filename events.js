document.addEventListener('DOMContentLoaded', () => {
    /*document.getElementById("div1").addEventListener('click', div1Click);
    document.getElementById("div1-2").addEventListener('click', div1Click);*/
    for(let btn of document.querySelectorAll(".div1")){
        btn.addEventListener('click', div1Click);
    }
    document.getElementById("input1").addEventListener('keydown', onKeyDown);
    document.getElementById("input1").addEventListener('keypress', onKeyPress);
    document.getElementById("input1").addEventListener('change', onChange);
});
function onKeyDown(e){
    //console.log(e);
    e.target.parentNode.querySelector('span').innerText = `${e.key} (${e.keyCode})`;
    if(!((e.keyCode >= 48 && e.keyCode <= 57) || 
        e.keyCode == 8 ||
        e.keyCode == 37 ||
        e.keyCode == 39 ||
        e.keyCode == 46)){
        e.preventDefault();
    }
}
function onKeyPress(e){
    console.log(e);
}
function onChange(e){
    console.log(e);
}
function div1Click(e){
    //console.log(e.target);
    const div = e.target.closest("div");
    div.parentNode.querySelector('span').innerText = e.target.tagName;
    console.log(div);
}
document.addEventListener('DOMContentLoaded', () => {
    let x = 0;
    for(let d of document.querySelectorAll('[data-type="draggable"]')){
        d.addEventListener('mousedown', onMouseDown);
        d.style.left = x + 'px';
        x += 40;
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.draggedElement = null;
    window.choice = {
        'positive': [],
        'negative': []
    };
    //document.onmousewheel = console.log;
});
function onMouseDown(e){
    window.draggedElement = e.target.closest('[data-type="draggable"]');
    e.preventDefault();
    console.log(window.draggedElement.offsetLeft, window.draggedElement.offsetTop);
    window.draggedElement.tapX = e.pageX - window.draggedElement.offsetLeft;
    window.draggedElement.tapY = e.pageY - window.draggedElement.offsetTop;
    const container = window.draggedElement.closest(".dnd-container");
    if(!container) throw "Element .dnd-container not found";
    window.draggedElement.maxX = container.clientWidth - window.draggedElement.offsetWidth;
    window.draggedElement.maxY = container.clientHeight - window.draggedElement.offsetHeight;
    window.draggedElement.startX = window.draggedElement.style.left;
    window.draggedElement.startY = window.draggedElement.style.top;
}
function onMouseMove(e){
    if(window.draggedElement){
        let newX = e.pageX - window.draggedElement.tapX;
        let newY = e.pageY - window.draggedElement.tapY;
        if(newX < 0 || newY < 0 || newX > window.draggedElement.maxX || newY > window.draggedElement.maxY){
            return;
        }
        window.draggedElement.style.left = newX + 'px';
        window.draggedElement.style.top = newY + 'px';
    }
}
function onMouseUp(e){
    if(window.draggedElement){
        window.draggedElement.style.zIndex = -1;
        //const zone = document.getElementById("dnd-zone");
        const elements = document.elementsFromPoint(e.pageX, e.pageY);
        let isTarget = false;
        for(let element of elements){
            if(element.classList.contains("dnd-target")){
                //console.log("in target");
                isTarget = element;
            }
        }
        window.draggedElement.style.zIndex = 1;
        if(isTarget){
            console.log('in target');
            //window.draggedElement.style.left = isTarget.offsetLeft + isTarget.clientWidth / 2.0 - window.draggedElement.clientWidth / 2.0 + 'px';
            window.draggedElement.style.top = isTarget.offsetTop + isTarget.clientHeight / 2 - window.draggedElement.clientHeight / 2 + 'px';
            if(isTarget.classList.contains("dnd-positive")){
                let check = true;
                for(let elem of window.choice.negative){
                    if(elem == window.draggedElement){
                        window.choice.negative.splice(window.choice.negative.indexOf(elem));
                    }
                }
                for(let elem of window.choice.positive){
                    if(elem == window.draggedElement){
                        elem.remove;
                        check = false;
                        break;
                    }
                    else{
                        check = true;
                    }
                }
                if(check){
                    window.choice.positive.push(window.draggedElement);
                }
            }
            else{
                let check = true;
                for(let elem of window.choice.positive){
                    if(elem == window.draggedElement){
                        window.choice.positive.splice(window.choice.positive.indexOf(elem));
                    }
                }
                for(let elem of window.choice.negative){
                    if(elem == window.draggedElement){
                        check = false;
                        break;
                    }
                    else{
                        check = true;
                    }
                }
                if(check){
                    window.choice.negative.push(window.draggedElement);
                }
            }
            let shift = 50;
            for(let elem of window.choice.positive){
                elem.style.left = shift + 'px';
                shift += 30;
            }
            let rectanglePositive = document.getElementsByClassName('dnd-target')[0].getBoundingClientRect();
            let rectangleNegative = document.getElementsByClassName('dnd-target')[1].getBoundingClientRect();
            shift = (rectangleNegative.left + rectangleNegative.width / 2) - (rectanglePositive.left + rectanglePositive.width / 2) + 50;
            for(let elem of window.choice.negative){
                elem.style.left = shift + 'px';
                shift += 30;
            }

            if(isAllDragged()){
                alert('Дякуємо за ваші відповіді!');
                location.reload();
            }
        }
        else{
            console.log("out of target");
            //window.draggedElement.style.left = window.draggedElement.startX;
            //window.draggedElement.style.top = window.draggedElement.startY;
        }
        window.draggedElement = null;
    }
}
function isAllDragged(){
    let res = true;
    for(let d of document.querySelectorAll('[data-type="draggable"]')){
        let rect = d.getBoundingClientRect();
        const elements = document.elementsFromPoint(rect.x, rect.y);
        let isTarget = false;
        for(let element of elements){
            if(element.classList.contains("dnd-target")){
                isTarget = true;
            }
        }
        if(!isTarget){
            res = false;
        }
    }
    return res;
}