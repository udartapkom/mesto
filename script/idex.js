let editButton = document.querySelector(".profile-info__edit-button");
let modal = document.querySelector(".modal");
let profileName = document.querySelector(".profile-info__title");
let profileProfession = document.querySelector(".profile-info__subtitle");
let closeModal = document.querySelector(".modal__close-button");
let modalProfession = document.querySelector(".modal__input_profession");
let modalName = document.querySelector(".modal__input_name");
let submitButton = document.querySelector(".modal__form");

/* функция открытия закрытия модалки и чтения данных из профиля*/ 
function modalToggle(){  
/* если у modal есть модификатор modal_open, убираем его */     
    if (modal.classList.contains("modal_open")) {
        modal.classList.toggle("modal_open");
    }
/* иначе, добавляем его и пишем в форму данные из секции profile */ 
       else{
        modal.classList.toggle("modal_open"); 
        modalName.value = profileName.textContent;
        modalProfession.value = profileProfession.textContent;
        }
    } 

/* записываем данные из формы в профиль */
function modalSave(event){
    event.preventDefault(); /*чтобы страница не перезагружалась при нажатии на кнопку */
    profileName.textContent = modalName.value;
    profileProfession.textContent = modalProfession.value;
    modalToggle(); /* записали, а теперь закрыть окно */
}
editButton.addEventListener("click", modalToggle);
closeModal.addEventListener("click", modalToggle);
submitButton.addEventListener("submit", modalSave);


