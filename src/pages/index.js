import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import {
  cardTemplate,
  modalLookPhoto,
  modalProfile,
  modalAddCard,
  editProfileButton,
  newCardButton,
  formsObj,
  modalTitle,
  modalName,
  modalProfession,
  modalAvatar,
  modalSubmit,
  modalPhoto,
  modalSignature,
  profileName,
  profileProfession,
  closeModalLook,
  submitButton,
  elements,
  cohort,
  token,
  serverUrl,
  profileAvatar,
  cardsTrashClass
 } from "../utils/data.js";
let cardElement;

// Создаем экземпяры классов
const api = new Api(token, cohort, serverUrl);
const initializeCards = api.getCards();
const userInformation = api.getProfileInfo();

const profileValidator = new FormValidator(formsObj, modalProfile); // Создаём экземпяры класса FormValidator для модалок
const cardValidator = new FormValidator(formsObj, modalAddCard);
const avatarValidator = new FormValidator(formsObj, modalAvatar);
const modalLook = new PopupWithImage(modalLookPhoto, closeModalLook, modalPhoto, modalSignature);
const profileInfo = new UserInfo({
  professionElement: profileProfession,
  nameElement: profileName,
});

const addNewCard = (item, userID, cardsTrashClass) => {
  //колбэк добавление карточек
  return new Card(
    item,
    userID,
    cardsTrashClass,
    {
      handleCardClick: (data) => {
        modalLook.open(data);
      },
    },
    {
      handleLikeButtonClick: (event) => {
        if (event.target.classList.contains("cards__like_button_active")) {
          api.delLikes(item._id).then((data) => {
            plusMinusUnit(data);
          });
          event.target.classList.toggle("cards__like_button_active");
        } else {
          api.setLikes(item._id).then((data) => {
            plusMinusUnit(data);
          });
          event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
        }

        function plusMinusUnit(data) { // один и тот же код для лайка и дизлайка
          const cardLikes = event.target
            .closest(".cards__likes-data")
            .querySelector(".cards__likes-quantity");
          cardLikes.innerText = data.likes.length;
        }
      },
    },
    {
      handleDeleteButtonClick: (event) => {
      cardElement = event.target;
      modalDelCard.open(item._id);
      }
    }, 
    cardTemplate
  );
};

const toggleButtonText = (modalWindow, booleanKey) => {
  //функция смены надписи на кнопке
  const modalSubmitButton = modalWindow.querySelector(formsObj.submitButtonSelector);
  if (booleanKey) {
    modalSubmitButton.innerText = "Секундочку...";
  } else {
    modalSubmitButton.innerText = "Сохранить";
  }
};

  const modalDelCard = new PopupWithSubmit(modalSubmit, submitButton, closeModalLook, {
    //Специальный класс для модалки с подтверждением удаления
    handleDeleteCard: () => {
    toggleButtonText(modalSubmit, true)
      const idCard = modalDelCard.getCardId(); // получаем ID карточки
      api.removeCard(idCard)
        .then((res) => {
          cardElement.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          modalDelCard.close();
          toggleButtonText(modalSubmit, false)
        });
    },
  });

 userInformation.then((data) => { //достаём из промиса объект профиля
   profileInfo.setUserInfo(data.name, data.about); //устанавливаем начальные значения профиля
   setAvatar(data); //устанавливаем аватар
 })
 .catch((error) => { 
  alert(error)
});

 const setAvatar = (data) => { //функция установки аватара
   profileAvatar.style.backgroundImage = `url(${data.avatar})`;
 };

 const section = new Section( // Создаём экземпяр класса Section и передаем в него функцию renderer
   {
     renderer: (item) => {
        userInformation.then((data) => {
         // Нужно передать ID юзера полученный именно с сервера из объекта профиля, чтобы точно идентифицировать себя 
         const userID = data._id;
         const card = addNewCard(item, userID, cardsTrashClass);
         const element = card.cardGenerate(); // вызываем метод cardGenerate()
         section.addItem(element, true); //передаем в метод класса Section готовую разметку 
       })
       .catch((error) => { 
        alert(error)
      });
     },
   },
   elements
 );
 initializeCards.then((data) => {  //достаём из промиса массив объектов
   section.renderItem(data);
 })
.catch((error) => { 
  alert(error)
});

const editPlaceForm = new PopupWithForm(modalAddCard, closeModalLook, formsObj, submitButton, {
  submitForm: (item) => {
    toggleButtonText(modalAddCard, true);
    api
      .setNewCard(item.placeName, item.placeLink)
      .then((res) => {
        const card = addNewCard(res, res.owner._id, cardsTrashClass);
        const element = card.cardGenerate(); // вызываем метод cardGenerate()
        section.addItem(element, false); //передаем в метод класса Section готовую разметку
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        editPlaceForm.close();
        toggleButtonText(modalAddCard, false);
      });
  },
});

const editProfessionForm = new PopupWithForm(modalProfile, closeModalLook, formsObj, submitButton, {
  submitForm: (item) => {
    toggleButtonText(modalProfile, true);
    api
      .setProfileInfo(item.name, item.profession) // При сохранении записываем данные на сервер через api
      .then((res) => {
        profileInfo.setUserInfo(res.name, res.about);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        editProfessionForm.close();
        toggleButtonText(modalProfile, false);
      });
  },
});

const editAvatar = new PopupWithForm(modalAvatar, closeModalLook, formsObj, submitButton, {
  submitForm: (item) => {
    toggleButtonText(modalAvatar, true);
    api
      .setAvatar(item.placeLink)
      .then((data) => {
        setAvatar(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        editAvatar.close();
        toggleButtonText(modalAvatar, false);
      });
  },
});

editProfessionForm.setEventListeners();
editPlaceForm.setEventListeners();
modalLook.setEventListeners();
editAvatar.setEventListeners();
modalDelCard.setEventListeners();

//блок редактирования профиля
editProfileButton.addEventListener("click", function () {
  const profileInfoData = profileInfo.getUserInfo();
  modalName.value = profileInfoData.name;
  modalProfession.value = profileInfoData.profession;
  editProfessionForm.open();
  profileValidator.enableValidation();
});
//блок редактирования аватара
profileAvatar.addEventListener("mouseup", function () {
  editAvatar.open();
  avatarValidator.enableValidation();
});

//блок добавления карточек
newCardButton.addEventListener("mouseup", function () {
  // mouseup чтобы перекинуть фокус с кнопки на модалку
  editPlaceForm.open();
  cardValidator.enableValidation();
  modalTitle.focus();
//  saveCard.reset();
});
