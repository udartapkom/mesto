const profileName = document.querySelector(".profile-info__title");
const profileProfession = document.querySelector(".profile-info__subtitle");

const modalProfession = document.querySelector(".modal__input_profession");
const modalName = document.querySelector(".modal__input_name");

//окна
const modalProfile = document.querySelector(".modal_profile");
const modalAddCard = document.querySelector(".modal_add-card");

//кнопки 
const closeModalProfile = modalProfile.querySelector(".modal__close-button");
const closeModalAddCard = modalAddCard.querySelector(".modal__close-button");

const newCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile-info__edit-button");

const saveProfile = modalProfile.querySelector(".modal__save");
const saveCard = modalAddCard.querySelector(".modal__save");

//Поля ввода
const modalPlace = modalAddCard.querySelector(".modal__input_profession");
const modalTitle= modalAddCard.querySelector(".modal__input_name");

//Карточки
const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector(".template-card");

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Перебираем элементы массива 
const cardsList = () => {
    const items = initialCards.map(element =>  cardsGenerate(element)); // Передаем в функцию cardsGenerate элементы массива 
        cards.append(... items); // Все что вернула функция, собираем в кучку и добавляем в DOM 
};

// Функция генерирует готовую карточку в зависимости от переданных ей данных и вешает слушателей на кнопки
const cardsGenerate = data => {
    const elCard = cardTemplate.content.cloneNode(true); // Клонируем карточку 
    elCard.querySelector(".cards__title-style").innerText = data.name; // ищем нужный элемент и пишем в него соответствующие данные
    elCard.querySelector(".cards__photo").src = data.link;
    const like = elCard.querySelector(".cards__like"); // ищем кнопку лайк и корзина
    const trashButton = elCard.querySelector(".cards__trash"); 
    trashButton.addEventListener("click", cardTrash); // Вешаем на "корзину" и "лайк" слушателя и вызываем соответствующую функцию 
    like.addEventListener("click", likeActive);
    return elCard;
}
const cardTrash = event =>{
    event.target.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её 
}

const likeActive = event =>{
    event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
}

cardsList(); // запускаем всё это безобразие написанное выше

// функция открытия закрытия модалки 
function modalToggle(modalWindow) {
    // если у модалки есть модификатор modal_open, убираем его     
    if (modalWindow.classList.contains("modal_open")) {
        modalWindow.classList.toggle("modal_open");
    }
    // иначе, добавляем
    else {
        modalWindow.classList.toggle("modal_open");
    }
} 

/* записываем данные из формы в профиль */
function modalSave(element) {
    profileName.textContent = modalName.value;
    profileProfession.textContent = modalProfession.value;
    modalToggle(element); /* записали, а теперь закрыть окно */
}
function prevent(event) { //функция антиперезагрузка страницы
    event.preventDefault();
}

//блок редактирования профиля
editProfileButton.addEventListener("click", function () {
    modalName.value = profileName.textContent;
    modalProfession.value = profileProfession.textContent;
    modalToggle(modalProfile);
});

saveProfile.addEventListener("click", function () {
    modalSave(modalProfile);
    prevent(event);
});

closeModalProfile.addEventListener("click", function () {
    modalToggle(modalProfile);
});

//блок добавления карточек
newCardButton.addEventListener("click", function () {
    modalToggle(modalAddCard);
});
saveCard.addEventListener("click", function () {
    const item = cardsGenerate({
        name: modalTitle.value,
        link: modalPlace.value
    });
    cards.prepend(item);
    modalTitle.value = ""; //после добавления карточки, очищаем поля ввода, чтобы при следующем открытии поля были пустыми
    modalPlace.value = "";
    modalToggle(modalAddCard);
    prevent(event);

});
closeModalAddCard.addEventListener("click", function () {
    modalToggle(modalAddCard);
});