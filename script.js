// allow inputs and reflect it in UI
let inputNumbers = [];
let activeOperation = null;
const operationButtons = document.querySelectorAll('.operation')
let firstOpperand = null
, secondOpperand = null
VALIDINPUTS = ['1','2','3','4','5','6','7','8','9','0','.']
OPERATIONINPUTS = ['+','-','*','/']
const KEYOPERATIONMAP = {
    "add": '+',
    "subtract": '-',
    "multiply": '*',
    "divide": '/',
    "equal": 'Enter'
}
const MODIFIERINPUTS = ['Backspace', 'Escape', 'Tab']
const KEYMODIFIERMAP = {
    "DEL": 'Backspace',
    "AC": 'Escape',
    "+/-": 'Tab',
}
let previousOperation = [null, null]

// TODO: make default content of inputScreenP as "0", if 0 next number input can overwrite it.

const inputScreenP = document.querySelector('.input-screen p');

/** 
 * display argument on inputScreenP.
 * 
 * parameters: 
 * String inputNumbers - string to display. 
 */
let updateInputScreen = function(inputNumbers) {
    inputScreenP.textContent = inputNumbers;
}


// delete functionality for DEL button
const deleteFromInput = function() {
    console.log('running deleteFromInput');
    let currentInput = inputScreenP.textContent.split("");
    currentInput.pop();
    inputNumbers = currentInput;
    currentInput = currentInput.join("");
    updateInputScreen(currentInput)
}

// negate functionality for +/- button
const negateInput = function() {
    let currentInput = Number(inputScreenP.textContent)
    currentInput *= -1;
    inputNumbers = currentInput.toString().split("");
    console.log(inputNumbers);
    updateInputScreen(currentInput)
}

const clearActiveOperation = function() {
    if (activeOperation != null) {
        Array.from(operationButtons).filter(item => activeOperation == item.id)[0].classList.toggle('active')
    }
    activeOperation = null;
}

const clearInputs = function() {
    clearActiveOperation()
    firstOpperand = null;
    secondOpperand = null;
    inputNumbers = [];
    updateInputScreen('')
    console.log('clearInputs() ran')
}


// what each button in the button pad will do
const buttonPad = document.querySelector('.button-pad');
buttonPad.addEventListener('click', event => {
    event.stopPropagation();
    className = event.target.classList[0];
    // Number buttons
    if (activeOperation != null && firstOpperand == null) {
        getSecondOperand(event)
    }
    if (className == 'number') {
        if ((event.target.textContent == ".") && (inputNumbers.includes("."))) {
            console.log('only one decimal point allowed') // pass 
        } else {
            inputNumbers.push(event.target.textContent);
            let display = inputNumbers.join("")
            console.log(display) 
            updateInputScreen(display);
        }
    } else if (className == 'operation') {
        setOperation(event)
    } // modifier buttons
    else if (className == 'modifier') {
        event.stopPropagation();
        switch (event.target.textContent) {
            case 'AC':
                clearInputs();
                break;
            case 'DEL':
                deleteFromInput();
                break;
            case '+/-':
                negateInput();
                break;
        }
    } else if (firstOpperand != null && event.target.id == "equal") {
        if (secondOpperand == null && activeOperation == null) {
            secondOpperand = previousOperation[1]
            activeOperation = previousOperation[0]
            Array.from(operationButtons).filter(button=>button.id == activeOperation)[0].classList.toggle('active')
        } else {
            secondOpperand = getDisplayedNum();
        }
        firstOpperand = operate(firstOpperand, secondOpperand, activeOperation);
        inputNumbers = [];
        updateInputScreen(firstOpperand)
        secondOpperand = null;
        clearActiveOperation();

        // console.log('first equal')
        // console.log(firstOpperand, activeOperation, previousOperation, inputNumbers, event.target.id)
    }
});

// key press event listener for buttons
window.addEventListener('keydown', event => {
    // console.log(event)
    
    if (activeOperation != null && firstOpperand == null) {
        getSecondOperand(event)
    } else if (VALIDINPUTS.includes(event.key)) {
        if ((event.key == ".") && (inputNumbers.includes("."))) {
            console.log('only one decimal point allowed') // pass
        } else {
            inputNumbers.push(event.key);
            let display = inputNumbers.join("")
            console.log(display) 
            updateInputScreen(display);
        }
    } else if (OPERATIONINPUTS.includes(event.key)) {
        setOperationKey(event);
    } else if (MODIFIERINPUTS.includes(event.key)) {
        event.preventDefault();
        let mappedKey = getKeyByValue(KEYMODIFIERMAP, event.key)
        switch (mappedKey) {
            case 'AC':
                clearInputs();
                break;
            case 'DEL':
                deleteFromInput();
                break;
            case '+/-':
                negateInput();
                break;
        }
    } else if (firstOpperand != null && getKeyByValue(KEYOPERATIONMAP, event.key) == "equal") {
        if (secondOpperand == null && activeOperation == null) {
            secondOpperand = previousOperation[1]
            activeOperation = previousOperation[0]
            Array.from(operationButtons).filter(button=>button.id == activeOperation)[0].classList.toggle('active')
        } else {
            secondOpperand = getDisplayedNum();
        }
        firstOpperand = operate(firstOpperand, secondOpperand, activeOperation);
        inputNumbers = [];
        updateInputScreen(firstOpperand)
        secondOpperand = null;
        clearActiveOperation();
    }
})


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

/** 
 * return textContent of inputScreenP. 
 */
const getDisplayedNum = function() {
    let inputText;
    inputText = inputScreenP.textContent
    return Number(inputText)
}

/** 
 * Evaluates which of the operation buttons has been pushed and sets it as the activeOperation.
 * 
 * parameters: 
 * Event event - event that has clicked on an operation button. 
 */
const setOperation = function(event) {
    let buttonId = event.target.id;
    let target = event.target;
    firstNum = getDisplayedNum();
    if (Boolean(inputScreenP.textContent) == false) {
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

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const setOperationKey = function(event) {
    let buttonId = getKeyByValue(KEYOPERATIONMAP, event.key);
    let target = document.querySelector('#' + buttonId);
    firstNum = getDisplayedNum();
    if (Boolean(inputScreenP.textContent) == false) {
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
// will only work if there is an active operator set
const getSecondOperand = function(event) {
    // set firstOpeOpperand as displayed number
    firstOpperand = getDisplayedNum();
    // clear numbers on display
    inputNumbers = [];
    // input new number (automatically happens)
    console.log('firstOpperand set to ' + firstOpperand)
}


// equal sign to perform operation and display the anser to the screen
const operate = function (num1, num2, operation) {
    let answer;
    switch(operation) {
        case 'add':
          answer = add(num1, num2)
          break;
        case 'subtract':
          answer = subtract(num1, num2)
          break;
        case 'multiply':
          answer = multiply(num1, num2)
          break;
        case 'divide':
          answer = divide(num1, num2)
          break;
        default:
          break;
      }
    previousOperation[0] = operation;
    previousOperation[1] = num2;
    return answer
}