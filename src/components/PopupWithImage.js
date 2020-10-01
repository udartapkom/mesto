import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(modalWindow, closeModalLook, modalPhoto, modalSignature) {
    super(modalWindow, closeModalLook);
    this._modalPhoto = modalPhoto;
    this._modalSignature = modalSignature;
  }
  open(data) {
    super.open();
    this._modalPhoto.src = data.src;
    this._modalPhoto.alt = data.textContent;
    this._modalSignature.textContent = data.textContent;
  }
}
