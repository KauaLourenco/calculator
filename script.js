const display = document.querySelector('.display-panel');
const inputLine = document.querySelector('.input-line');
const clearBtn = document.querySelector('#clear-display');
const groupBtn = document.querySelector('#group');
const percentageBtn = document.querySelector('#percentage');

const keypad = document.querySelector('.keypad');
const equalBtn = document.querySelector('#equal');

const dotBtn = document.querySelector('#dot');
const signalBtn = document.querySelector('#signal');

// Get numbers and operator

let firstNum = '';
let operator = '';
let secondNum = '';

let result = '';
let sign = '';

keypad.addEventListener('click', (e) => {
    const btnClass = e.target.classList[0];
    const clickedBtn = e.target.id;
    const symbols = e.target.textContent;

    if (operator === '' && btnClass === 'numbers') {
        firstNum += clickedBtn;
        displayNumbers();

    } else if (firstNum !== '' && sign === '' && btnClass === 'operators') {
        operator = clickedBtn;
        sign = symbols;
        displayNumbers();

    } else if (operator !== '' && result === '' && btnClass === 'numbers') {
        secondNum += clickedBtn;
        displayNumbers();

    } else if (result !== '' && btnClass === 'operators') {
        firstNum = result;
        operator = clickedBtn;
        secondNum = '';
        result = '';
        sign = symbols;

        displayNumbers();
    };
});

// Operation

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

// Operate

equalBtn.addEventListener('click', () => {
    if (firstNum !== '' && operator !== '' && secondNum !== '') {
        getOperation(firstNum, secondNum);
        displayResult();
    };
});

// Display

function displayNumbers() {
    display.textContent = `${firstNum} ${sign} ${secondNum}`;
};

function displayResult() {
    if (!display.children[0]) {
        const resultPara = document.createElement('p');
        resultPara.textContent = `= ${result}`;
        display.appendChild(resultPara);
    };
};

clearBtn.addEventListener('click', () => {
    firstNum = '';
    operator = '';
    secondNum = '';
    result = '';
    sign = '';

    display.textContent = '';
});