let editButton = document.querySelector(".profile-info__edit-button");
let modal = document.querySelector(".modal");
let profileName = document.querySelector(".profile-info__title");
let profileProfession = document.querySelector(".profile-info__subtitle");
let closeModal = document.querySelector(".modal__close-button");
let modalProfession = document.querySelector(".modal__input_profession");
let modalName = document.querySelector(".modal__input_name");
let submitButton = document.querySelector(".modal__form");

editButton.addEventListener("click", modalToggle);
closeModal.addEventListener("click", modalToggle);
submitButton.addEventListener("submit", modalSave);
 
/* функция открытия закрытия модалки и чтения данных из профиля*/ 
function modalToggle(){  
    modal.classList.toggle("modal_open");
    modalName.value = profileName.textContent;
    modalProfession.value = profileProfession.textContent;
}

/* записываем данные из формы в профиль */
function modalSave(){
    event.preventDefault(); /*чтобы страница не перезагружалась при нажатии на кнопку */
    profileName.textContent = modalName.value;
    profileProfession.textContent = modalProfession.value;
    modalToggle(); /* записали, а теперь закрыть окно */
}



