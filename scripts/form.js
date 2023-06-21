const fechaNacimiento = document.querySelector('#birth')
const inputs = document.querySelectorAll('input')
const error = document.querySelector('span')

inputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        valida(e.target)
    })
})

function valida(input){
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    const errorMessage = input.nextElementSibling
    if (input.validity.valid){
        input.classList.remove('invalid')
        if (errorMessage && errorMessage.classList.contains('error-message')){
            errorMessage.remove()
        }
    }else{
        input.classList.add('invalid')
        if (!errorMessage || !errorMessage.classList.contains('error-message')){
            const newErrorMessage = document.createElement('span')
            newErrorMessage.textContent = 'Campo inválido'
            newErrorMessage.style.color = 'red'
            newErrorMessage.classList.add('error-message')
            input.insertAdjacentElement('afterend', newErrorMessage)
        }
    }
}

const validadores = {
    nacimiento: (input) => validarFecha(input)
}


function validarFecha(input){
    const fechaCliente = new Date(input.value)

    let mensaje = ''
    if(mayorDeEdad(fechaCliente)){
        mensaje = 'Debe tener al menos 18 años de edad'
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date()
    const fechaDiferencias = new Date(
        fecha.getUTCFullYear()+ 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        )
    return fechaActual <= fechaDiferencias
}