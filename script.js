// allow inputs and reflect it in UI
let inputNumbers = [];
let activeOperation = null;
const operationButtons = document.querySelectorAll('.operation')
let firstOpperand = null
, secondOpperand = null

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
        inputNumbers.push(event.target.textContent);
        let display = inputNumbers.join("")
        console.log(display) 
        updateInputScreen(display);
    } else if (className == 'operation') {
        setOperation(event)
    } else if (firstOpperand != null && event.target.id == "equal") {
        secondOpperand = getDisplayedNum()
        firstOpperand = operate(firstOpperand, secondOpperand, activeOperation)
        // TODO: reflect answer at display
        inputNumbers = []
        updateInputScreen(firstOpperand)
        // TODO: unclick operation (set activeOperation to null and toggle active class)
        
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
/** 
 * return textContent of inputScreenP. 
 */
const getDisplayedNum = function() {
    let inputText;
    inputText = inputScreenP.textContent
    return Number(inputText)
}

// toggle active operation

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
    return answer
}

// test function button
// const equalBtn = document.querySelector('#equal')
// equalBtn.addEventListener('click', event => {
//     console.log(inputNumbers)
//     console.log(inputScreenP.textContent)
//     console.log(inputNumbers==null)
//     console.log(inputScreenP.textContent==null)
// })