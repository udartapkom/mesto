let editButton = document.querySelector(".profile-info__edit-button");
let modal = document.querySelector(".modal");
let profileName = document.querySelector(".profile-info__title");
let profileProfession = document.querySelector(".profile-info__subtitle");
let closeModal = document.querySelector(".modal__close-button");
   let modalProfession = document.querySelector(".modal__input_profession");
   let modalName = document.querySelector(".modal__input_name");
   let submitButton = document.querySelector(".modal__save");
let cards = document.querySelector(".elements");
const profileForm = document.querySelector(".profile-form");
const newCard = document.querySelector(".new-card");
const cardTemplate = document.querySelector(".template-card");
const addButton = document.querySelector(".profile__add-button");
   const mOpen = document.querySelector(".modal__header")


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

/* Перебираем элементы массива */
const cardsList = () => {
    const items = initialCards.map(element =>  cardsGenerate(element)); /* Передаем в функцию cardsGenerate элементы массива */
        cards.append(... items); /* Все что вернула функция, собираем в кучку и добавляем в DOM */
};

/*Функция генерирует готовую карточку в зависимости от переданных ей данных и вешает слушателей на кнопки*/
const cardsGenerate = data => {
    const elCard = cardTemplate.content.cloneNode(true); /*  Клонируем карточку*/
    elCard.querySelector(".cards__title-style").innerText = data.name; /* ищем нужный элемент и пишем в него соответствующие данные*/ 
    elCard.querySelector(".cards__photo").src = data.link;
    const like = elCard.querySelector(".cards__like"); /* ищем кнопку лайк и корзина  */
    const trashButton = elCard.querySelector(".cards__trash"); 
    trashButton.addEventListener("click", cardTrash); /* Вешаем на "корзину", "добавить", "лайк" слушателя и вызываем соответствующую функцию */
    //addButton.addEventListener("click", modalOpen); 
    like.addEventListener("click", likeActive);
    return elCard;
}
const cardTrash = event =>{
    event.target.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её 
}

const likeActive = event =>{
    event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
}

const modalOpen = (swichModal) => {

   switch (swichModal.toElement.classList.value){ //Получаем класс нажатой кнопки и в зависимости от класса заполняем окно 
    case "profile__add-button":
        modalName.value = '';
        mOpen.innerText = "Новое место";
        modalName.placeholder = "Название";
        modalProfession.value = '';
        modalProfession.placeholder = "Ссылка на картинку";
        
        submitButton.addEventListener("submit", modalMestoSave = event =>{
            event.preventDefault(); 
            submitButton.addEventListener("submit");
            const item = cardsGenerate({
                      name: modalName.value,
                      link: modalProfession.value 
                 });
              cards.prepend(item);
        });  
        break;
    
        case "profile-info__edit-button":
        mOpen.innerText = "Редактировать профиль";
        modalName.value = profileName.textContent;
        modalName.placeholder = "Введите имя";
        modalProfession.value = profileProfession.textContent;
        modalProfession.placeholder = "Введите профессию";

       // submitButton.addEventListener("submit", modalProfileSave);
      
        break;
}
    // console.log(swichModal.toElement.classList.value);
        //modal.classList.add("modal_open");
        modalToggle();
    }
cardsList(); // запускаем всё это безобразие написанное выше

/* функция открытия закрытия модалки */
function modalToggle(){  
 // если у modal есть модификатор modal_open, убираем его     
    if (modal.classList.contains("modal_open")) {
        modal.classList.toggle("modal_open");
    }
 // иначе, добавляем его 
       else{
        modal.classList.toggle("modal_open"); 

        }
    } 

 function modalProfileSave(event){
    event.preventDefault(); 
    profileName.textContent = modalName.value;
    profileProfession.textContent = modalProfession.value;
    modalToggle(); 
}  

/* function modalMestoSave(event){
    event.preventDefault(); 
    submitButton.addEventListener("submit");
    const item = cardsGenerate({
              name: modalName.value,
              link: modalProfession.value 
         });
      cards.prepend(item);
      modalToggle(); 

} */

editButton.addEventListener("click", modalOpen);
closeModal.addEventListener("click", modalToggle);
addButton.addEventListener("click", modalOpen);
//submitButton.addEventListener("submit", modalSave()
    //event.preventDefault(); 
   // const item = cardsGenerate({
     //   name: modalName.value,
       // link: modalProfession.value 
  //  });
  //  cards.prepend(item);
  //  modalToggle(); 
// });
// submitButtonProfile.addEventListener("submit", modalSave = event => {
   // event.preventDefault();
   // profileName.textContent = modalName.value;
   // profileProfession.textContent = modalProfession.value;
    // modalToggle();    
// });
  