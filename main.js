const container = document.querySelector('.container');
const keys = container.querySelector('.calculator__keys');
const display = container.querySelector('.calculator__display');

keys.addEventListener('click', event => {
    const key = event.target;
    const keyVal = key.textContent;
    const displayVal = display.textContent;
    const type = key.dataset.type;

    if (!key.closest('button')) return;

    if (type === "number") {
        if (displayVal === "0" || container.dataset.previousKeyType === "operator") {
            display.textContent = keyVal;
        } else {
            display.textContent += keyVal;
        }
    }

    if (type === "operator") {
        container.dataset.firstNumber = displayVal;
        container.dataset.operator = key.dataset.key;

        resectSelector();
        key.dataset.state = 'selected';
    }

    if (type === "equal") {
        const firstNumber = container.dataset.firstNumber;
        const secondNumber = display.textContent;
        const operator = container.dataset.operator;
        display.textContent = calculate(firstNumber, operator, secondNumber);

        resectSelector();
    }


    if (type === "clear") {
        display.textContent = 0;
        resectSelector()
    }

    container.dataset.previousKeyType = type;
})


function calculate(firstNumber = 0, operator = "plus", secondNumber = 0) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (operator === 'plus') {
        return firstNumber + secondNumber;
    } else if (operator === 'minus') {
        return firstNumber - secondNumber;
    } else if (operator === 'multiple') {
        return firstNumber * secondNumber;
    } else {
        return firstNumber / secondNumber;
    }
}

function resectSelector() {
    const operatorKeys = keys.querySelectorAll("[data-type='operator']");
    operatorKeys.forEach(el => el.dataset.state = "")
}