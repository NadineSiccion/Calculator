// allow inputs and reflect it in UI
let inputNumbers = [];
let activeOperation = null;
const operationButtons = document.querySelectorAll('.operation')
let firstNum = null
, secondNum = null

const inputScreenP = document.querySelector('.input-screen p');

let updateInputScreen = function(inputNumbers) {
    console.log('running function');
    inputScreenP.textContent = inputNumbers;
}


// what each button in the button pad will do
const buttonPad = document.querySelector('.button-pad');
buttonPad.addEventListener('click', event => {
    event.stopPropagation();
    className = event.target.classList[0];
    // Number buttons
    if (className == 'number') { 
        inputNumbers.push(event.target.textContent);
        let display = inputNumbers.join("")
        console.log(display) 
        updateInputScreen(display);
    } else if (className == 'operation') {
        setOperation(event)
        // FIXME: add operation logic here
    }
});

// establish operations that would be performed
const add = function(num1, num2) {
    return num1 + num2;
}
const subtract = function(num1, num2) {
    return num1 - num2;
}
const multiply = function(num1, num2) {
    return num1 * num2;
}
const divide = function(num1, num2) {
    if (num2 == 0) {
        return 'not falling for that one!'
    }
    return num1 / num2;
}

// take in number from the input screen as first number
const getDisplayedNum = function() {
    let inputText;
    inputText = inputScreenP.textContent
    return Number(inputText)
}

// toggle active operation

const setOperation = function(event) {
    let buttonId = event.target.id;
    let target = event.target;
    firstNum = getDisplayedNum();
    if (firstNum == null) {
        // pass
        console.log('no operand given')
    } else if (activeOperation == null) {
        target.classList.toggle('active');
        activeOperation = buttonId;
        console.log('active operation set to ' + activeOperation);
    } else if (activeOperation == buttonId) {
        target.classList.toggle('active');
        activeOperation = null;
        console.log('active operation set to ' + activeOperation);
    } else {
        let activeOperationButton = Array.from(operationButtons).filter(item=>(item.id == activeOperation));
        activeOperationButton[0].classList.toggle('active');
        target.classList.toggle('active');
        activeOperation = buttonId;
        console.log('active operation set to ' + activeOperation);
    }

}

// take in second number

// equal sign to perform operation and display the anser to the screen
const operate = function (num1, num2, operation) {

}