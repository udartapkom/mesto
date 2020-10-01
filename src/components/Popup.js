export class Popup {
  constructor(modalWindow, closeModalLook) {
    this._modalWindow = modalWindow;
    this._closeModalLook = closeModalLook;
   // console.log(this._closeModalLook);
  }
  open() {
    this._modalWindow.classList.remove("modal_close");
    this._modalWindow.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modalWindow.classList.remove("modal_open");
    this._modalWindow.classList.add("modal_close");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    //console.log(closeModalLook);
    this._closeModalLook.addEventListener("click", this.close.bind(this)); // закрываем по кнопке
    this._closeModalOnClick();
  }
   // закрываем по клику
   _closeModalOnClick(){
    this._modalWindow.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("modal") ||
        (event.target.classList.contains("modal__close-button") &&
        this._modalWindow.classList.contains("modal_open"))
      ) {
        this.close();
      }
    });
   }
    // закрываем по Esc
  _handleEscClose=(event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}
