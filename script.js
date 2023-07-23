const display = document.querySelector('.display-panel');
const inputLine = document.querySelector('.input-line');
const clearBtn = document.querySelector('#clear-display');
const groupBtn = document.querySelector('#group');
const percentageBtn = document.querySelector('#percentage');

const keypad = document.querySelector('.keypad');
const equalBtn = document.querySelector('#equal');

const dotBtn = document.querySelector('#dot');
const signalBtn = document.querySelector('#signal');

// Get buttons for display

let displayList = [];
let operatorList = [];

keypad.addEventListener('click', (e) => {
    const clickedBtn = e.target.id;
    const btnType = e.target.classList;
    const operationSign = e.target.textContent;
    const lastBtn = displayList.length - 1;

    if (btnType.contains('non-operators')) return;
    if (btnType.contains('operators') && !Number(displayList[lastBtn])) return;
    if (btnType.contains('numbers') && result !== '') return;
    if (clickedBtn === '0' && displayList.length < 1) return;

    if (btnType.contains('numbers') && Number(displayList[lastBtn])) {
        // Put a sequence of numbers together as one.
        displayList[lastBtn] += clickedBtn;

    } else if (btnType.contains('operators') && result !== '') {
        display.removeChild(display.children[1]);
        result = '';
        displayList.push(operationSign);
        operatorList.push(clickedBtn);

    } else if (btnType.contains('operators')) {
        displayList.push(operationSign);
        operatorList.push(clickedBtn);

    } else {
        displayList.push(clickedBtn);
    };

    displayOperation();
});

// Operation

let firstNum = '';
let operator = '';
let secondNum = '';
let result = '';

function operate() {
    while (displayList.length > 1) {
        firstNum = displayList[0];
        operator = operatorList[0];
        secondNum = displayList[2];

        getOperation(firstNum, secondNum);

        if (secondNum === undefined) {return};

        displayList.splice(0, 3, result);
        operatorList.splice(0, 1);
    };
};

function getOperation(a, b) {
    switch (operator) {
        case 'add':
            result = +a + +b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            if (b === '0') {
                result = 'Infinity';
            } else {
                result = a / b;
            };
            break;
    };
};

equalBtn.addEventListener('click', () => {
    operate();
    
    if (operator !== '' && secondNum !== undefined) {
    displayResult();
    };
});

// Display

function displayOperation() {
    inputLine.textContent = displayList.toString().replaceAll(',', ' ');
};

function displayResult() {
    if (!display.children[1]) {
        const resultPara = document.createElement('p');
        resultPara.textContent = `= ${result}`;
        display.appendChild(resultPara);
    };
};

clearBtn.addEventListener('click', () => {
    displayList = [];
    operatorList = [];
    result = '';
    inputLine.textContent = '';
    display.removeChild(display.children[1]);
});