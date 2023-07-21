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

keypad.addEventListener('click', (e) => {
    const btnClass = e.target.classList[0];
    const clickedBtn = e.target.id;

    if (operator === '' && btnClass === 'numbers') {
        firstNum += clickedBtn;

    } else if (firstNum !== '' && operator === '' && btnClass === 'operators') {
        operator = clickedBtn;

    } else {
        secondNum += clickedBtn;
    };
});

// Get operation

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
            result = a / b;
            break;
    };
};

// Operate

equalBtn.addEventListener('click', () => {
    getOperation(firstNum, secondNum);

    console.log(result);
});