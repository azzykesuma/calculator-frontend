// grabbing all id and query
let body = document.querySelector('body');
let mainCalculator = document.querySelector('.mainContainer')
let radio = document.querySelectorAll('input[name=toggle-state]')
let inputField = document.querySelector('.inputField')
let mainContainer = document.querySelector('.mainContainer')
let button = document.querySelectorAll('button')
let reset = document.querySelector('.reset')
let equal = document.querySelector('.equal')
let deleteBtn = document.querySelector('.delete')
let header = document.querySelector('header')
let form = document.querySelector('form')

// theme section

radio.forEach(radioBtn => {
    radioBtn.addEventListener('click',() => {
        if(radioBtn.value === 'first') {
            body.style.backgroundColor = 'hsl(222, 26%, 31%)'
            form.style.backgroundColor = 'hsl(223, 31%, 20%)'
            header.style.color = '#fff'
            inputField.style.backgroundColor = 'hsl(224, 36%, 15%)'
            inputField.style.color = '#fff'
            mainContainer.style.backgroundColor = 'hsl(223, 31%, 20%)'
            button.forEach(btn => {
                btn.style.color = 'hsl(221, 14%, 31%)'
                btn.style.backgroundColor = '#fff'
            })
            reset.style.color = '#fff'
            reset.style.backgroundColor = 'hsl(225, 21%, 49%)'
            equal.style.color = '#fff'
            equal.style.backgroundColor = 'hsl(6, 63%, 50%)'
            deleteBtn.style.color = '#fff'
            deleteBtn.style.backgroundColor = 'hsl(225, 21%, 49%)'
        } else if (radioBtn.value === 'second') {
            body.style.backgroundColor = 'hsl(0, 0%, 90%)'
            header.style.color = 'hsl(60, 10%, 19%)'
            form.style.backgroundColor = 'hsl(0, 5%, 81%)'
            inputField.style.backgroundColor = 'hsl(0, 0%, 93%)'
            inputField.style.color = 'hsl(60, 10%, 19%)'
            mainContainer.style.backgroundColor = 'hsl(0, 5%, 81%)'
            button.forEach(btn => {
                btn.style.color = 'hsl(60, 10%, 19%)'
                btn.style.backgroundColor = '#fff'
            })
            reset.style.color = '#fff'
            reset.style.backgroundColor = 'hsl(185, 42%, 37%)'
            equal.style.color = '#fff'
            equal.style.backgroundColor = 'hsl(25, 98%, 40%)'
            deleteBtn.style.color = '#fff'
            deleteBtn.style.backgroundColor = 'hsl(185, 42%, 37%)'
        } else if(radioBtn.value === 'third') {
            body.style.backgroundColor = 'hsl(268, 75%, 9%)'
            header.style.color = 'hsl(52, 100%, 62%)'
            form.style.backgroundColor = 'hsl(268, 71%, 12%)'
            inputField.style.backgroundColor = 'hsl(268, 71%, 12%)'
            inputField.style.color = 'hsl(52, 100%, 62%)'
            mainContainer.style.backgroundColor = 'hsl(268, 71%, 12%)'
            button.forEach(btn => {
                btn.style.color = 'hsl(52, 100%, 62%)'
                btn.style.backgroundColor = 'hsl(268, 47%, 21%)'
            })
            reset.style.color = '#fff'
            reset.style.backgroundColor = 'hsl(281, 89%, 26%)'
            equal.style.color = 'hsl(198, 20%, 13%)'
            equal.style.backgroundColor = 'hsl(176, 100%, 44%)'
            deleteBtn.style.color = '#fff'
            deleteBtn.style.backgroundColor = 'hsl(281, 89%, 26%)'
        }
    })
})

// calculator function section

mainContainer.addEventListener('click',e => {
    if(e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyNumber = key.textContent
        const displayedNum = inputField.textContent
        const previousKey = mainContainer.dataset.previousKey


       if(!action) {
           if(displayedNum === '0' || previousKey === 'operator' || previousKey === 'calculate') {
            //    changing the number to keyContent when the displayed number is 0
            // or when after the operator is clicked
               inputField.textContent =  keyNumber
           } else {
            //  appending the number if the displayed num is not zero
               inputField.textContent = displayedNum + keyNumber
           }
        //    removing focus style
        Array.from(key.parentNode.children).forEach(btn => {
            btn.classList.remove('focusOperator')
        })
        // key parentNode.children means that taking the parent of the e.target(btn), then removing all of the children 
        //  style of focus operator, once the number btn is clicked.
        mainCalculator.dataset.previousKey = 'number'
       }
       
       if(
           action === 'add' ||
           action === 'subtract' ||
           action === 'divide' ||
           action === 'multiply'
       ) {  
            const firstValue = mainContainer.dataset.firstValue;
            const operator = mainContainer.dataset.operator;
            const secondValue = displayedNum;

           if(firstValue &&
             operator &&
             previousKey !== 'operator' &&
             previousKey === 'calculate'
             ) {
                // adding two previous number when the user clicked the number without clicking equal sign
                const value = calculate(firstValue,operator,secondValue)
                inputField.textContent = value
                //    making the calculated value of previous operations first value.
              mainCalculator.dataset.firstValue = value
           } else {
               mainCalculator.dataset.firstValue = displayedNum
           }
            key.classList.add('focusOperator')
            // assigning dataset called operator when clicked.
            mainContainer.dataset.previousKey = 'operator'
            // giving custom attribute first value
            mainContainer.dataset.operator = action
       }

       if(action === 'decimal') {
            // preventing user to hits decimal keys multiple times
            if (!displayedNum.includes('.')) {
                inputField.textContent = displayedNum + '.'
            } else if (previousKey === 'operator' || previousKey === 'calculate') {
                inputField.textContent = '0.'
            }
            mainCalculator.dataset.previousKey = 'decimal'
       }

       if (action === 'reset') {
           inputField.textContent = '0'
           mainCalculator.dataset.previousKey = 'reset'
       }

       if (action === 'delete') {
           console.log(`delete`)
           mainCalculator.dataset.previousKey = 'delete'
       }

       if (action === 'calculate') {
           const firstValue = mainContainer.dataset.firstValue;
           const operator = mainContainer.dataset.operator;
           const secondValue = displayedNum;
        //    console.log(firstValue)
        //    console.log(operator)
        //    console.log(secondValue)
        if(firstValue) {
            if(previousKey === 'calculate') {
                // making displayedNum firstvalue when calculate clicked multiple times
                firstValue = displayedNum
            }
            inputField.textContent = calculate(firstValue,operator,secondValue)
        }
        mainCalculator.dataset.modifiedVal = secondValue
        mainCalculator.dataset.previousKey = 'calculate'
    }
    }
})

function calculate(num1, operator ,num2) {
    let result =''
    if (operator === 'add') {
        result = parseFloat(num1)  + parseFloat(num2)
    } else if(operator === 'subtract') {
        result = parseFloat(num1) - parseFloat(num2)
    } else if(operator === 'divide') {
        result = parseFloat(num1) / parseFloat(num2)
    } else if(operator === 'multiply') {
        result = parseFloat(num1) * parseFloat(num2)
    }
    return result
}

    deleteBtn.addEventListener('click',deleteNumber);

    function deleteNumber () {
        const displayedNum = inputField.textContent
        const newDisplay = displayedNum.slice(0,-1)
        inputField.textContent = newDisplay
        // preventing the last character to be deleted
        if(newDisplay.length < 1) {
            inputField.textContent = '0'
        }
    }