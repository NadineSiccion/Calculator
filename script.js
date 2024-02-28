// allow inputs and reflect it in UI
let inputNumbers = [];

const inputScreenP = document.querySelector('.input-screen p');

let updateInputScreen = function(inputNumbers) {
    console.log('running function');
    inputScreenP.textContent = inputNumbers;
}

const buttonPad = document.querySelector('.button-pad');
buttonPad.addEventListener('click', event => {
    event.stopPropagation();
    className = event.target.classList[0];
    if (className == 'number') { 
        inputNumbers.push(event.target.textContent);
        let display = inputNumbers.join("")
        console.log(display) 
        updateInputScreen(display);
    } else if (className == 'operation') {
        operation = event.target.textContent;
        switch (operation) {
            // WIP
            case '+':
                break;
            case '-':
                break;
            case '/':
                break;
            case '*':
                break;
        }
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

// take in number from the 