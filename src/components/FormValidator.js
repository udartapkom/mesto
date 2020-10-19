import { submitButton } from "../utils/data";

export class FormValidator {
  constructor(formsObj, modalType) {
    this._formsObj = formsObj;
    this._modalType = modalType;
  }

  enableValidation = () => {
    this._modalType.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setListeners();
  };
  //ищем все инпуты
  //навешиваем на них слушателей
  //вызываем соответствующую функцию
  _inputs = () => {
    return Array.from(this._modalType.querySelectorAll(this._formsObj.inputSelector));
  };

  _setListeners = () => {
    const inputsArray = this._inputs();
    inputsArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputValidate(this._modalType, inputElement); //функция валидации инпутов
        const isFormValid = inputsArray.some((inputElement) => !inputElement.validity.valid); // проверим валидность всех инпутов и отправим результат
        this._buttonValidate(this._modalType, isFormValid);
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
  //вызываем функции показа ошибки
  _inputValidate = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
      this._hideError(formElement, inputElement);
    } else {
      this._showError(formElement, inputElement, inputElement.validationMessage);
    }
  };
  //показать ошибку
  _showError = (formElement, inputElement, errorMessage) => {
    inputElement.classList.add(this._formsObj.inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = errorMessage;
  };
  //убрать ошибку
  _hideError = (formElement, inputElement) => {
    inputElement.classList.remove(this._formsObj.inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = "";
  };
  //отключаем enter если форма невалидна
  _enterDisable = (event, buttonElement) => {
    if (buttonElement.classList.contains(this._formsObj.inactiveButtonClass)) {
      event.preventDefault();
    }
  };
  // Сбрасываем форму в состояние "По умолчанию"
  resetForm(modalType) {
    const submitButton = modalType.querySelector(this._formsObj.submitButtonSelector);
    this._inputs().forEach((inputElement) => {
      this._hideError(modalType, inputElement);
    });
    submitButton.classList.remove(this._formsObj.inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled");
  }
}
