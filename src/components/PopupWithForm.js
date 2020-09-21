import { formsObj, submitButton } from "../utils/data.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(modalWindow, { submitForm }) {
    super(modalWindow);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const inputsList = this._modalWindow.querySelectorAll(formsObj.inputSelector);
    const formValues = {};
    inputsList.forEach((item) => {
      formValues[item.name] = item.value;
    });
    submitButton.classList.add("modal__save_state_invalid"); // При следующем открытии enter заблочен
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
