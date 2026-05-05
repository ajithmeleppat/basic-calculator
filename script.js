const keypad = document.getElementById("keypad");
const keys = ['AC','%','<<','/', 7, 8, 9, '*', 4, 5, 6, '-', '1', '2', '3', '+', '00', 0, '.','=']
function setupDisplay(){
    let keyIndex = 0;
    for (let i =0; i< 5; i++){
        let div = document.createElement("div");
        div.setAttribute("id",`row${i+1}`);
        div.classList.add("row");
        keypad.appendChild(div);
        for(let j = 0; j < 4; j++){
            let btn = document.createElement("button");
            btn.textContent = `${keys[keyIndex]}`;
            btn.setAttribute("id",`btn-${keys[keyIndex]}`);
            btn.classList.add("key");
            div.appendChild(btn);
            keyIndex ++ ;
        }
    }
}

setupDisplay();
console.log()