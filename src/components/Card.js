//import { addPhotoClick } from "./index.js";

export class Card {
  constructor( element, {handleCardClick}, cardTemplate) {
    this._element = element;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    }
  
  cardGenerate() {
    const elCard = this._getTemplate().cloneNode(true); // Клонируем карточку
    const nameText = elCard.querySelector(".cards__title-style"); // ищем нужные элементы
    const photoCard = elCard.querySelector(".cards__photo");
    nameText.innerText = this._element.placeName; //и пишем в них соответствующие данные
    photoCard.src = this._element.placeLink;
    photoCard.alt = this._element.placeName;
    this._setEventListeners(elCard, nameText, photoCard); //передаем параметры для слушателей и модалки
    return elCard;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardTemplate);
    return template.content;
  }

  _setEventListeners(elCard, nameText, photoCard) {
    const like = elCard.querySelector(".cards__like"); // ищем кнопку лайк и корзина
    const trashButton = elCard.querySelector(".cards__trash");
    trashButton.addEventListener("click", this._cardTrash); // Вешаем на "корзину" и "лайк" слушателя и вызываем соответствующую функцию
    like.addEventListener("click", this._likeActive);
       
    photoCard.addEventListener("click", () => {
      const data = {};
      data.src = photoCard.src;
      data.textContent = nameText.textContent;
      this._handleCardClick(data);
    });
  
  }

  _cardTrash = (event) => {
    event.target.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её
  };

  _likeActive = (event) => {
    event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
  };
}
