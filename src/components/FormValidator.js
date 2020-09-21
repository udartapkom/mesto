export class FormValidator {
  constructor(formsObj, modalType) {
    this._formsObj = formsObj;
    this._modalType = modalType;
  }

  enableValidation = () => {
    this._modalType.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._findInputs(this._modalType);
  };
  //ищем все инпуты
  //навешиваем на них слушателей
  //вызываем соответствующую функцию
  _findInputs = (formElement) => {
    const inputs = Array.from(formElement.querySelectorAll(this._formsObj.inputSelector));
    inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
        this._inputValidate(formElement, inputElement); //функция валидации инпутов
        const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid); // проверим валидность всех инпутов и отправим результат
        this._buttonValidate(formElement, isFormValid);
      });
    });
  };
  //включаем-выключаем кнопку отправки формы
  _buttonValidate = (formElement, isFormValid) => {
    const buttons = Array.from(formElement.querySelectorAll(this._formsObj.submitButtonSelector));
    buttons.forEach((buttonElement) => {
      if (!isFormValid) {
        buttonElement.classList.remove(this._formsObj.inactiveButtonClass);
        formElement.removeEventListener("keydown", this._enterDisable(event, buttonElement)); //включаем ентер
        buttonElement.removeAttribute("disabled", "disabled");
      } else {
        buttonElement.classList.add(this._formsObj.inactiveButtonClass); // отключаем ентер
        formElement.addEventListener("keydown", this._enterDisable(event, buttonElement));
        buttonElement.setAttribute("disabled", "disabled");
      }
    });
  };

  //добавляем-убираем красную линию в инпут и вызываем функции показа ошибки
  _inputValidate = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
      this._hideError(formElement, inputElement);
      inputElement.classList.remove(this._formsObj.inputErrorClass);
    } else {
      this._showError(formElement, inputElement, inputElement.validationMessage);
      inputElement.classList.add(this._formsObj.inputErrorClass);
    }
  };
  //показать ошибку
  _showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
  };
  //убрать ошибку
  _hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = "";
  };
  //отключаем enter если форма невалидна
  _enterDisable = (event, buttonElement) => {
    if (buttonElement.classList.contains(this._formsObj.inactiveButtonClass)) {
      event.preventDefault();
    }
  };
}
