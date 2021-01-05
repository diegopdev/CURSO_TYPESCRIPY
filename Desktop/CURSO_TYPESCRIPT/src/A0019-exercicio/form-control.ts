import isEmail from 'validator/lib/isEmail'

const SHOW_ERROR_MESSAGE = 'show-error-message'

const form = document.querySelector('.form') as HTMLFormElement
const username = document.querySelector('.username') as HTMLInputElement
const email = document.querySelector('.email') as HTMLInputElement
const password = document.querySelector('.password') as HTMLInputElement
const password2 = document.querySelector('.password2') as HTMLInputElement

form.addEventListener('submit', function (event: Event) {
  event.preventDefault()
  hideErrorMessages(this)
  checkForEmptyFields(username, email, password, password2)
  checkEmail(email)
  checkEqualPassowrds(password, password2)
  if (shouldSendForm(this)) console.log('FORMULÁRIO ENVIADO')
})

function checkForEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, 'Campo não pode ficar vazio')
    }
  })
}

function checkEmail(input: HTMLInputElement): void {
  if (!isEmail(input.value)) {
    showErrorMessage(input, 'Email inválido')
  }
}

function checkEqualPassowrds(password: HTMLInputElement, password2: HTMLInputElement): void {
  if (password.value !== password2.value) {
    showErrorMessage(password, 'Senhas não batem')
    showErrorMessage(password2, 'Senhas não batem')
  }
}

function hideErrorMessages(form: HTMLFormElement): void {
  form.querySelectorAll(`.${SHOW_ERROR_MESSAGE}`).forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGE))
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
  const formFields = input.parentElement as HTMLDivElement
  const errorMessage = formFields.querySelector('.error-message') as HTMLSpanElement

  errorMessage.innerText = msg
  formFields.classList.add(SHOW_ERROR_MESSAGE)
}

function shouldSendForm(form: HTMLFormElement): boolean {
  let send = true
  form.querySelectorAll(`.${SHOW_ERROR_MESSAGE}`).forEach(() => (send = false))
  return send
}
