const keypad = document.getElementById("keypad");
const keys = ['Clear','\u232B','\u00F7', 7, 8, 9, '\u00D7', 4, 5, 6, '-', '1', '2', '3', '+', '00', 0, '.','=']
const keyNames = ['clear','backspace','divide', 7, 8, 9, 'multiply', 4, 5, 6, 'subtract', '1', '2', '3', 'add', '00', 0, '.','=']
const numbers = ['1','2','3','4','5','6','7','8','9','0','00','.'];
const operators = ['divide','multiply','subtract','add'];
const otherKeys = ['AC', '=', "."];

function setupDisplay(){
    let keyIndex = 0;
    for (let i =0; i< 5; i++){
        let div = document.createElement("div");
        div.setAttribute("id",`row${i+1}`);
        div.classList.add("row");
        keypad.appendChild(div);
        for(let j = 0; j < 4; j++){
            if(i === 0 && j === 3) continue;
            let btn = document.createElement("button");
            btn.textContent = `${keys[keyIndex]}`;
            btn.setAttribute("id",`btn-${keyNames[keyIndex]}`);
            btn.classList.add("key");
            div.appendChild(btn);
            keyIndex ++ ;
        }
    }
}

function operate(first, second, operator){
    switch(operator){
        case 'add': return first + second;
        case 'subtract': return first - second;
        case 'divide': return first / second;
        case 'multiply': return first * second;
    }

}
setupDisplay();
let curValue = '';
let resultValue = '';
let operator = "";
let lastEntryWasOperator = false;
let lastEntryWasEquals = false;
const buttons = document.querySelectorAll(".key");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let keyValue = button.getAttribute("id").slice(4);
        let curr = document.getElementById("current");
        if(numbers.includes(keyValue)){
            if ((keyValue === '00' || keyValue === '0') && curValue === ''){
                console.log("do nothing");
            }
            else{
                if(lastEntryWasEquals) resultValue = '';
                curValue = curValue + keyValue;
                curr.textContent = curValue;
                lastEntryWasOperator = false;
                lastEntryWasEquals = false;
            }
        }
        else if (operators.includes(keyValue)){
            if(lastEntryWasOperator) {
                operator = keyValue;
                console.log(`first:${resultValue}`);
                console.log(`operator:${operator}`);
            }
            else{
                if(resultValue === ''){
                    resultValue = curValue;
                    operator = keyValue;
                    curValue = '';
                    console.log(`first:${resultValue}`);
                    console.log(`operator:${operator}`);
                }
                else{
                    console.log(`first:${resultValue}`);
                    console.log(`operator:${operator}`);
                    console.log(`second:${curValue}`);
                    resultValue = operate(Number(resultValue),Number(curValue),operator);
                    curValue = '';
                    operator = keyValue;
                    curr.textContent = resultValue;

                }
                lastEntryWasOperator = true;
            }
            lastEntryWasEquals = false;
        }
        else if (keyValue === 'clear'){
            resultValue = '';
            curValue = '';
            curr.textContent = 0;
            lastEntryWasEquals = false;
        }
        else if (keyValue  === '='){
            if (resultValue === ''){
                console.log("no action");
            }
            else{
                console.log(`first:${resultValue}`);
                console.log(`operator:${operator}`);
                console.log(`second:${curValue}`);
                resultValue = operate(Number(resultValue),Number(curValue),operator);
                curr.textContent = resultValue;
                lastEntryWasOperator = false;
                lastEntryWasEquals = true;
                curValue = '';

            }
            
        }
        else if (keyValue === 'backspace'){
            curValue = curValue.substr(0,curValue.length-1);    
            console.log(curValue);
            curr.textContent = curValue.length === 0 ? "0" : curValue;
        }
    })
})
