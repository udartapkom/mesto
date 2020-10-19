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
  cardsTrashClass,
  saveCard,
  saveAvatar
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
          api
            .delLikes(item._id)
            .then((data) => {
              plusMinusUnit(data);
            })
            .catch((error) => {
              alert(error);
            });
          event.target.classList.toggle("cards__like_button_active");
        } else {
          api
            .setLikes(item._id)
            .then((data) => {
              plusMinusUnit(data);
            })
            .catch((error) => {
              alert(error);
            });
          event.target.classList.toggle("cards__like_button_active"); // лайк - дизлайк
        }

        function plusMinusUnit(data) {
          // один и тот же код для лайка и дизлайка
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
      },
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
    toggleButtonText(modalSubmit, true);
    const idCard = modalDelCard.getCardId(); // получаем ID карточки
    api
      .removeCard(idCard)
      .then(() => {
        cardElement.closest(".cards").remove(); // ищем ближайшую карточку и убиваем её
        modalDelCard.close();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        toggleButtonText(modalSubmit, false);
      });
  },
});

const setAvatar = (data) => {   //функция установки аватара
   profileAvatar.style.backgroundImage = `url(${data.avatar})`;
};

const section = new Section( // Создаём экземпяр класса Section и передаем в него функцию renderer
  {
    renderer: (item, userID) => {
      // Нужно передать ID юзера полученный именно с сервера из объекта профиля, чтобы точно идентифицировать себя
      const card = addNewCard(item, userID, cardsTrashClass);
      const element = card.cardGenerate(); // вызываем метод cardGenerate()
      section.addItem(element, true); //передаем в метод класса Section готовую разметку
    },
  },
  elements
);

const editPlaceForm = new PopupWithForm(modalAddCard, closeModalLook, formsObj, submitButton, {
  submitForm: (item) => {
    toggleButtonText(modalAddCard, true);
    api
      .setNewCard(item.placeName, item.placeLink)
      .then((res) => {
        const card = addNewCard(res, res.owner._id, cardsTrashClass);
        const element = card.cardGenerate(); // вызываем метод cardGenerate()
        section.addItem(element, false); //передаем в метод класса Section готовую разметку
        editPlaceForm.close();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
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
        editProfessionForm.close();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
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
        editAvatar.close();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        toggleButtonText(modalAvatar, false);
      });
  },
});

Promise.all([userInformation, initializeCards])
  .then(([userInfo, cardsArray]) => {
    profileInfo.setUserInfo(userInfo.name, userInfo.about); //устанавливаем начальные значения профиля
    setAvatar(userInfo); //устанавливаем аватар
    section.renderItem(cardsArray, userInfo._id);

    /* поместитл в этот метод then добавление на кнопки слушателей событий открытия всех форм,
 чтобы до представления карточек на экране, 
 невозможно было открыть формы */

    //блок редактирования профиля
    editProfileButton.addEventListener("click", function () {
      const profileInfoData = profileInfo.getUserInfo();
      modalName.value = profileInfoData.name;
      modalProfession.value = profileInfoData.profession;
      editProfessionForm.open();
      modalTitle.focus();
      profileValidator.enableValidation();
      profileValidator.resetForm(modalProfile);
     });
    //блок редактирования аватара
    profileAvatar.addEventListener("mouseup", function () {
      editAvatar.open();
      avatarValidator.enableValidation();
      saveAvatar.reset();
      avatarValidator.resetForm(modalAvatar);
      avatarValidator.disableSubmit(modalAvatar);
    });
    //блок добавления карточек
    newCardButton.addEventListener("mouseup", function () {
      // mouseup чтобы перекинуть фокус с кнопки на модалку
      editPlaceForm.open();
      cardValidator.enableValidation();
      modalTitle.focus();
      saveCard.reset();
      cardValidator.resetForm(modalAddCard);
      cardValidator.disableSubmit(modalAddCard)
    });
  })
  .catch((error) => {
    alert(error);
  });

editProfessionForm.setEventListeners();
editPlaceForm.setEventListeners();
modalLook.setEventListeners();
editAvatar.setEventListeners();
modalDelCard.setEventListeners();
