const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.querySelector('#input')
const resultInput = document.querySelector('#result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

const allowedKeysOperators = ["(", ")", "/", "*", "-", "+"]

document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
    charKeyBtn.addEventListener('click', function(){
        const value = charKeyBtn.dataset.value
        input.value += value
        input.focus()
    })
})

document.querySelector('#clear').addEventListener('click', function(){
    input.value = ''
    input.focus()
    resultInput.value = ''
})

input.addEventListener('keydown', function(ev){
    ev.preventDefault()
    if(allowedKeys.includes(ev.key)){
        if(allowedKeysOperators.includes(ev.key)){
            input.value += ` ${ev.key} `
        }
        else{
            input.value += ev.key
        }
        return
    }
    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0, -1)
    }
    if(ev.key === 'Enter'){
        calculate()
    }
})

document.querySelector('#equal').addEventListener('click', calculate)

function calculate(){
    resultInput.value = 'Error'
    resultInput.classList.add('error')
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove('error')
}

document.querySelector('#copy').addEventListener('click', function(ev){
    const button = ev.currentTarget
    if (button.innerText === 'Copy'){
        button.innerText = 'Copied!'
        button.classList.add('sucess')
        navigator.clipboard.writeText(resultInput.value)
    }
})
document.querySelector('#copy').addEventListener('blur', function(ev){
    const button = ev.currentTarget
    button.innerText = 'Copy'
    button.classList.remove('sucess')
})


document.querySelector('#themeSwitch').addEventListener('click', function(){
    if (main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26c34a')
        main.dataset.theme = 'light'
    }
    else if(main.dataset.theme === 'light'){
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})