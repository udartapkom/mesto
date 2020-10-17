//import { cards } from "../utils/data";

export class Card {
  constructor(
    element,
    userID,
    cardsTrashClass,
    { handleCardClick },
    { handleLikeButtonClick },
    { handleDeleteButtonClick },
    cardTemplate
  ) {
    this._element = element;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._cardTemplate = cardTemplate;
    this._userID = userID;
    this._cardsTrashClass = cardsTrashClass;
  }

  cardGenerate() {
    const elCard = this._getTemplate();
    const nameText = elCard.querySelector(".cards__title-style"); // ищем нужные элементы
    const photoCard = elCard.querySelector(".cards__photo");
    const likesQuantity = elCard.querySelector(".cards__likes-quantity");
    const likeButton = elCard.querySelector(".cards__like");
    nameText.innerText = this._element.name; //и пишем в них соответствующие данные
    photoCard.src = this._element.link;
    photoCard.alt = this._element.name;
    likesQuantity.innerText = this._element.likes.length; //Количество элементов в массиве [this._element.likes] - есть количество лайков
    this._element.likes.map((objects) => { //разбираем массив объектов с информацией о лайках
      if(objects._id === this._userID){ // Если ID лайкнувшего совпадает с ID профиля, то кнопка active
        likeButton.classList.toggle("cards__like_button_active");
      }
    })

    this._setEventListeners(elCard, nameText, photoCard); //передаем параметры для слушателей и модалки
    if (this._element.owner._id === this._userID) { //  показываем кнопку "корзина" только для своих карточек
      this._setTrashButton(elCard);
    }
    return elCard;
  }

  _setTrashButton(elCard) { // навешиваем класс-модификатор на кнопку удаления карточки 
    const trashButton = elCard.querySelector(this._cardsTrashClass);
    trashButton.classList.add("cards__trash_show");
  }

  _getTemplate() {
    const template = document.querySelector(this._cardTemplate);
    const clonedCard = template.content.cloneNode(true); // Клонируем карточку
    return clonedCard;
  }

  _setEventListeners(elCard, nameText, photoCard) {
    const like = elCard.querySelector(".cards__like"); // ищем кнопку лайк и корзина
    const trashButton = elCard.querySelector(this._cardsTrashClass);
    trashButton.addEventListener("click", (event) => {
      this._handleDeleteButtonClick(event);
    }); 
    like.addEventListener("click", (event) => {
       this._handleLikeButtonClick(event);
    });

    photoCard.addEventListener("click", () => {
      const data = {};
      data.src = photoCard.src;
      data.textContent = nameText.textContent;
      this._handleCardClick(data);
    });
  }
}
