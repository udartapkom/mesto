const formsObj = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save',
  inactiveButtonClass: 'modal__save_state_invalid',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};
// Запускаем валидацию поиском всех форм на странице, 
// снятием стандартного поведения
const enableValidation = (formsObj) => {
  const forms = Array.from(document.querySelectorAll(formsObj.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
   
    findInputs(formElement, formsObj);
  });
};
//ищем все инпуты
//навешиваем на них слушателей
//вызываем соответствующую функцию 
const findInputs = (formElement, formsObj) => {
  const inputs = Array.from(formElement.querySelectorAll(formsObj.inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      inputValidate(formElement, inputElement, formsObj); //функция валидации инпутов
      const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);  // проверим валидность всех инпутов и отправим результат 
      buttonValidate(formElement, formsObj, isFormValid);
      enterDisable(formElement, isFormValid);
    });
  });
}
//включаем-выключаем кнопку отправки формы
const buttonValidate = (formElement, formsObj, isFormValid) => {
  const buttons = Array.from(formElement.querySelectorAll(formsObj.submitButtonSelector));
  buttons.forEach((buttonElement) => {
    if (!isFormValid ) {
      buttonElement.classList.remove(formsObj.inactiveButtonClass);
      formElement.removeEventListener("keydown", enterDisable); //включаем ентер
      }
    else {
      buttonElement.classList.add(formsObj.inactiveButtonClass);// отключаем ентер
      formElement.addEventListener("keydown", enterDisable);
    }
  });
}
//отключаем enter если форма невалидна
function enterDisable(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}
//добавляем-убираем красную линию в инпут и вызываем функции показа ошибки
const inputValidate = (formElement, inputElement, formsObj) => {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement);
    inputElement.classList.remove(formsObj.inputErrorClass);
  }
  else {
    showError(formElement, inputElement, inputElement.validationMessage);
    inputElement.classList.add(formsObj.inputErrorClass);
  }
}
//показать ошибку
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
}
//убрать ошибку
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = '';
 }

 

//запустить скрипт
enableValidation(formsObj);