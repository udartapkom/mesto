import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(modalWindow, closeModalLook, formsObj, submitButton, { submitForm }) {
    super(modalWindow, closeModalLook);
    this._submitForm = submitForm;
    this._formsObj = formsObj;
    this._submitButton = submitButton;
    }

  _getInputValues() {
    const inputsList = this._modalWindow.querySelectorAll(this._formsObj.inputSelector);
    const formValues = {};
    inputsList.forEach((item) => {
      formValues[item.name] = item.value;
    });
    this._submitButton.classList.add("modal__save_state_invalid"); // При следующем открытии enter заблочен
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._modalWindow.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
  }
}
