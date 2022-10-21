//this global variables will enable us with manipulating the current operator and current
//number we are working with.
let operator = ""
let previousValue = ""
let currentValue = ""
let shouldResetScreen = false;

const dotBtn = document.querySelector("#dotBtn")
const numberBtns = document.querySelectorAll("#numberBtn")
const operatorBtns = document.querySelectorAll('#operatorBtn')
const negateBtn = document.querySelector('#negateBtn')
const equalsBtn = document.querySelector('#equalsBtn')
const clearBtn = document.querySelector('#clearBtn')
const deleteBtn = document.querySelector('#deleteBtn')

const previousScreen = document.querySelector('.previousScreen')
const currentScreen = document.querySelector('.currentScreen')


clearBtn.addEventListener('click', ()=>{
  currentValue = ""
  previousValue = ""
  operator = ""
  currentScreen.textContent = "0"
  previousScreen.textContent = ""
})
//window.addEventListener('keydown', handleKeyboardInput)
deleteBtn.addEventListener('click', deleteNumber)

function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)
  currentValue = currentValue.toString().slice(0, -1)
}

dotBtn.addEventListener('click', handleDot)

negateBtn.addEventListener('click', switchPositiveNegative)

function switchPositiveNegative() {
  // If there is not a display number, it will start with '-'
  if(shouldResetScreen)resetScreen()
  if(currentValue.length == 0) {
      currentValue = '-';
      currentScreen.textContent = currentValue
  } else {
      let displayArray = currentValue.split('');
      // If the display number is already negative, delete the '-'
      if (displayArray[0].match(/-/)) {
          displayArray.shift();
          let displayString = displayArray.join('');
          currentValue = displayString;
          currentScreen.textContent = currentValue
      } else {
          // If the dislay number is positive, add a "-" to the begining of the array
          displayArray.unshift('-');
          let displayString = displayArray.join('');
          currentValue = displayString;
          currentScreen.textContent = currentValue
      }
  }
}

function handleDot(){
  if(shouldResetScreen) {
    resetScreen();
    currentScreen.textContent = "0"
  }
  if(currentValue == "") currentValue = "0"
  if(currentScreen.textContent.includes("."))return
  currentScreen.textContent+="."
  currentValue+="."
}

equalsBtn.addEventListener("click", () =>{
  if(currentValue != "" && previousValue != ""){
  calculate()
  previousScreen.textContent = `${previousScreen.textContent} ${currentScreen.textContent} =`
  currentScreen.textContent = previousValue
  operator = ""
  shouldResetScreen = true
}
})

numberBtns.forEach((button) => button.addEventListener('click', () => {
  handleNumber(button.textContent)
  currentScreen.textContent = currentValue
}));


function handleNumber(num){
  if(currentValue === "0" || shouldResetScreen){
    resetScreen()
  }
  currentValue += num
}

function resetScreen() {
  currentValue = ''
  shouldResetScreen = false
}

operatorBtns.forEach((button) => button.addEventListener('click', () => {
  handleOperator(button.textContent)
  previousScreen.textContent = previousValue +" "+ operator;
  currentScreen.textContent = currentValue
}))

function handleOperator(op){
  if(currentValue === "" && previousValue === ""){
    currentValue = "0"
    return
  }
  if(operator !== "" && currentValue !== "")calculate();
  if(operator === ""){
  operator = op
  previousValue = currentValue
  currentValue = ""
  }
  operator = op
  currentValue = ""
}

function calculate(){
  //The current and previous value are strings so we convert with the number method for evaluation.
  previousValue = Number(previousValue)
  currentValue = Number(currentValue)
  //the calculation is stored in previous value.
  if(operator === "+"){
    previousValue+=currentValue
  }else if(operator === "-"){
    previousValue-=currentValue
  }else if(operator === "x"){
    previousValue*=currentValue
  }else if(operator === "÷"){
    if(previousValue === 0 || currentValue === 0)alert("you can't divide by 0")
    previousValue/=currentValue
  }else if(operator === "%"){
    previousValue%=currentValue
  }
  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = currentValue.toString();
  currentValue = previousValue

}

function roundNumber(num){
  return Math.round(num*1000)/1000
}


window.addEventListener('keydown', (e) =>{
  if (e.key >= 0 && e.key <= 9) handleNumber(e.key)
  if (e.key === '.') handleDot()
  if (e.key === '=' || e.key === 'Enter'){
    calculate()
  previousScreen.textContent = `${previousScreen.textContent} ${currentScreen.textContent} =`
  currentScreen.textContent = previousValue
  operator = ""
  shouldResetScreen = true
  }
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clearKeyBoardInput()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
    handleOperator(convertOperator(e.key))
  previousScreen.textContent = previousValue +" "+ operator;
  currentScreen.textContent = currentValue
  }
  currentScreen.textContent = currentValue

});

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return 'x'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
}


function clearKeyBoardInput(){
  currentValue = ""
  previousValue = ""
  operator = ""
  currentScreen.textContent = "0"
  previousScreen.textContent = ""
}
