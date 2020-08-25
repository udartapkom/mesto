import { openPhoto } from './index.js';

export class Card {
    constructor(element, cardTemplate) {
        this._element = element;
        this._cardTemplate = cardTemplate;
    }

    cardGenerate() {
        const elCard = this._cardTemplate.content.cloneNode(true); // Клонируем карточку 
        const nameText = elCard.querySelector(".cards__title-style") // ищем нужные элементы
        const photoCard = elCard.querySelector(".cards__photo");
        nameText.innerText = this._element.name;  //и пишем в них соответствующие данные
        photoCard.src = this._element.link;
        photoCard.alt = this._element.name;
        this._findAndListeners(elCard, nameText, photoCard); //передаем параметры для слушателей и модалки
        return elCard;
    }

    _findAndListeners(elCard, nameText, photoCard) {
        const like = elCard.querySelector(".cards__like"); // ищем кнопку лайк и корзина
        const trashButton = elCard.querySelector(".cards__trash");
        trashButton.addEventListener("click", this._cardTrash); // Вешаем на "корзину" и "лайк" слушателя и вызываем соответствующую функцию 
        like.addEventListener("click", this._likeActive);
        openPhoto(photoCard, nameText); // вызываем функцию просмотра фото
    }

    _cardTrash = event => {
        event.target.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её 
    }

    _likeActive = event => {
        event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
    }
}