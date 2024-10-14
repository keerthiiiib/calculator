let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspace);

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetScreen) resetScreen();
    display.textContent += number;
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetScreen = false;
}

function appendDecimal() {
    if (shouldResetScreen) resetScreen();
    if (display.textContent === '') display.textContent = '0';
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
}

function setOperation(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === '/' && display.textContent === '0') {
        alert("You can't divide by 0!");
        clear();
        return;
    }
    secondNumber = display.textContent;
    display.textContent = roundResult(
        operate(currentOperator, firstNumber, secondNumber)
    );
    currentOperator = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function backspace() {
    display.textContent = display.textContent.toString().slice(0, -1);
    if (display.textContent === '') display.textContent = '0';
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return null;
    }
}
