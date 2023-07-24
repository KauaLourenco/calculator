const display = document.querySelector('.display-panel');
const inputLine = document.querySelector('.input-line');
const clearBtn = document.querySelector('#clear-display');
const groupBtn = document.querySelector('#group');
const percentageBtn = document.querySelector('#percentage');

const keypad = document.querySelector('.keypad');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');

const signalBtn = document.querySelector('#signal');
const dotBtn = document.querySelector('#dot');
const equalBtn = document.querySelector('#equal');

// Keypad buttons

let displayList = [];
let operatorList = [];

for (let number of numbers) {
    number.addEventListener('click', (e) => {
        const clickedNum = e.target.id;
        const lastBtn = displayList.length-1;

        // Avoid numbers after results and multiple isolated 0's.
        if (result !== '' || (displayList[lastBtn] === '0' && clickedNum === '0')) return;

        if (Number(displayList[lastBtn]) || displayList[lastBtn] === '0.') {
            displayList[displayList.length - 1] += clickedNum;

        } else if (displayList[lastBtn] !== '0') {
            displayList.push(clickedNum);

        } else if (displayList[lastBtn] === '0' && Number(clickedNum)) {
            displayList[displayList.length - 1] = clickedNum;
        };
        displayOperation();
    });
};

for (let operator of operators) {
    operator.addEventListener('click', (e) => {
        const clickedOp = e.target.textContent;
        const opSign = e.target.id;
        const lastBtn = displayList.length-1;

        if (result !== '') {
            display.removeChild(display.children[1]);
            result = '';
            displayList.push(clickedOp);
            operatorList.push(opSign);

        } else if (Number(displayList[lastBtn]) || displayList[lastBtn] === '0') {
            displayList.push(clickedOp);
            operatorList.push(opSign);
        };
        displayOperation();
    });
};

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
    if (display.children[1]) {display.removeChild(display.children[1])};
});

// Decimals

dotBtn.addEventListener('click', () => {
    const lastBtn = displayList.length-1;

    if (displayList[lastBtn].includes('.')) return;

    if (Number(displayList[lastBtn]) || displayList[lastBtn] === '0') {
        displayList[displayList.length - 1] += '.';
    };
    displayOperation();
});
