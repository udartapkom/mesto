const profileName = document.querySelector(".profile-info__title");
const profileProfession = document.querySelector(".profile-info__subtitle");

const modalProfession = document.querySelector(".modal__input_profession");
const modalName = document.querySelector(".modal__input_name");

//Карточки
const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector(".template-card");

//окна
const modalProfile = document.querySelector(".modal_profile");
const modalAddCard = document.querySelector(".modal_add-card");
const modalLookPhoto = document.querySelector(".modal_look-photo");

const modalPhoto = modalLookPhoto.querySelector(".modal__photo-zoom"); 
const modalSignature = modalLookPhoto.querySelector(".modal__photo-signature");


//кнопки 
const closeModalProfile = modalProfile.querySelector(".modal__close-button");
const closeModalAddCard = modalAddCard.querySelector(".modal__close-button");
const closeModalLook = modalLookPhoto.querySelector(".modal__close-button");

const newCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile-info__edit-button");

const saveProfile = modalProfile.querySelector(".modal__form");
const saveCard = modalAddCard.querySelector(".modal__form");
const submitButton = modalAddCard.querySelector(".modal__save");

//Поля ввода
const modalPlace = modalAddCard.querySelector(".modal__input_profession");
const modalTitle= modalAddCard.querySelector(".modal__input_name");


// Перебираем элементы массива 
const cardsList = () => {
    const items = initialCards.map(element =>  cardGenerate(element)); // Передаем в функцию cardGenerate элементы массива 
        cards.append(... items); // Все что вернула функция, собираем в кучку и добавляем в DOM 
};

// Функция генерирует готовую карточку в зависимости от переданных ей данных и вешает слушателей на кнопки
const cardGenerate = data => {
    const elCard = cardTemplate.content.cloneNode(true); // Клонируем карточку 
    nameText = elCard.querySelector(".cards__title-style") // ищем нужные элементы
    photoCard = elCard.querySelector(".cards__photo");
    nameText.innerText = data.name;  //и пишем в них соответствующие данные
    photoCard.src = data.link; 
    photoCard.alt = data.name;
    findAndListeners(elCard, nameText, photoCard); //передаем параметры для слушателей и модалки
    return elCard;
}
// Поиск и навешивание слушателей
function findAndListeners(elCard, nameText, photoCard ){
    const like = elCard.querySelector(".cards__like"); // ищем кнопку лайк и корзина
    const trashButton = elCard.querySelector(".cards__trash"); 
    trashButton.addEventListener("click", cardTrash); // Вешаем на "корзину" и "лайк" слушателя и вызываем соответствующую функцию 
    like.addEventListener("click", likeActive);
    photoCard.addEventListener("click", function(){ //вешаем слушателя на фото, получем параметры и сразу пишем в модалку
    modalPhoto.src = photoCard.src;
    modalSignature.textContent = nameText.textContent;

    modalToggle(modalLookPhoto); //открываем - закрываем модалку
  
});
 
}
const cardTrash = event =>{
    event.target.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её 
}

const likeActive = event =>{
    event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
}

cardsList(); // запускаем всё это безобразие написанное выше

closeModalClick(modalLookPhoto);
closeModalClick(modalProfile);
closeModalClick(modalAddCard);

closeModalEsc(modalProfile);
closeModalEsc(modalAddCard);
closeModalEsc(modalLookPhoto);

// функция открытия закрытия модалки 
function modalToggle(modalWindow) {
    if (modalWindow.classList.contains("modal_open")) { // если у модалки есть модификатор modal_open,      
        modalWindow.classList.toggle("modal_open"); //убираем его
        modalWindow.classList.toggle("modal_close"); //и ставим modal_close
    }
    else {                                               
        modalWindow.classList.toggle("modal_close"); // иначе убираем close
        modalWindow.classList.toggle("modal_open");  // и добавляем open
    }
} 

/* записываем данные из формы в профиль, event.preventDefault(); здесь быть не должно*/
function modalSave(element) {
    profileName.textContent = modalName.value;
    profileProfession.textContent = modalProfession.value;
    modalToggle(element); /* записали, а теперь закрыть окно */
}

//блок редактирования профиля
editProfileButton.addEventListener("click", function (event) {
    modalName.value = profileName.textContent;
    modalProfession.value = profileProfession.textContent;
    modalToggle(modalProfile);
});

saveProfile.addEventListener("submit", function (event) {
    event.preventDefault();
    modalSave(modalProfile);
});

closeModalProfile.addEventListener("click", function () {
    modalToggle(modalProfile);

});

//блок добавления карточек
newCardButton.addEventListener("click", function () {
    modalToggle(modalAddCard);
    saveCard.reset();
    
    
});
saveCard.addEventListener("submit", function (event) {
    event.preventDefault();
    const item = cardGenerate({
        name: modalTitle.value,
        link: modalPlace.value
    });
    cards.prepend(item);
    modalTitle.value = ""; //после добавления карточки, очищаем поля ввода, чтобы при следующем открытии поля были пустыми
    modalPlace.value = "";
    submitButton.classList.add("modal__save_state_invalid"); //при следующем открытии окна кнопка заблочена
    enterDisable(event); // enter тоже заблочен 
    modalToggle(modalAddCard);
 
});
closeModalAddCard.addEventListener("click", function () {
    modalToggle(modalAddCard);
});

//блок просмотра фото
closeModalLook.addEventListener("click", function () {
    modalToggle(modalLookPhoto);
});

//закрываем модалку по Esc
 function closeModalEsc(modalType) {
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" && modalType.classList.contains("modal_open")) {
            modalToggle(modalType);
         }
        modalType.removeEventListener('keydown', (event));

    });
} 

//закрываем модалку по Click
function closeModalClick(modalType) {
    modalType.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') || event.target.classList.contains('modal__close-button') && modalType.classList.contains("modal_open")) {
            modalToggle(modalType);
        }
        modalType.removeEventListener('click', (event));
    });
} 
