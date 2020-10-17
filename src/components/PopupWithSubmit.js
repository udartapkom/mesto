import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(modalWindow, submitButton, closeModalLook, { handleDeleteCard }) {
      super(modalWindow);
      this._handleDeleteCard = handleDeleteCard;
      this._submitButton = submitButton;
      this._closeModalLook = closeModalLook;
    }
    setEventListeners() {
        super.setEventListeners();
        this._modalWindow.addEventListener("submit", (event) => {
          event.preventDefault();
          this._handleDeleteCard();
        });
      }

      open(cardId) {
        super.open();
        this._cardId = cardId;
      }
      close(){
        super.close()
      }
        getCardId() {
        return this._cardId;
      }
}