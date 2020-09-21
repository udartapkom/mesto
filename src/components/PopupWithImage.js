import { modalPhoto, modalSignature } from "../utils/data.js";
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(modalWindow) {
    super(modalWindow);
  }
  open(data) {
    super.open();
    modalPhoto.src = data.src;
    modalSignature.textContent = data.textContent;
  }
}
