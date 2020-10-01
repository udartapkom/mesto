import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utils/initial-cards.js";
import {
  cardTemplate,
  modalLookPhoto,
  modalProfile,
  modalAddCard,
  editProfileButton,
  newCardButton,
  saveCard,
  formsObj,
  modalTitle,
  modalName,
  modalProfession,
  profileName,
  profileProfession,
  closeModalLook,
  submitButton,
  modalPhoto, 
  modalSignature,
  cards
} from "../utils/data.js";

const addNewCard = (item) => {
  return new Card(
    item,
    {
      handleCardClick: (data) => {
        modalLook.open(data);
      },
    },
    cardTemplate
  );
};
// Создаем экземпяры классов
const profileValidator = new FormValidator(formsObj, modalProfile); // Создаём экземпяры класса FormValidator для модалок
const cardValidator = new FormValidator(formsObj, modalAddCard);
const modalLook = new PopupWithImage(modalLookPhoto, closeModalLook, modalPhoto, modalSignature);
const profileInfo = new UserInfo({
  professionElement: profileProfession,
  nameElement: profileName,
});

const section = new Section({
  // Создаём экземпяр класса Section и передаем в него массив и функцию renderer
  items: initialCards.reverse(), //переворачиваем массив чтобы карточки отображались в нужном порядке
  renderer: (item) => {
    const card = addNewCard(item);
    const element = card.cardGenerate(); // вызываем метод cardGenerate()
    section.addItem(element); //передаем в метод класса Section готовую разметку
  }, 
}, cards);

section.renderItem(); // запускаем генерацию и добавление карточек

const editPlaceForm = new PopupWithForm(modalAddCard, closeModalLook, formsObj, submitButton, {
  submitForm: (item) => {
    const card = addNewCard(item);
    const element = card.cardGenerate();
    section.addItem(element);
    editPlaceForm.close();
  },
});

const editProfessionForm = new PopupWithForm(modalProfile, closeModalLook, formsObj, submitButton,{
  submitForm: (item) => {
    profileInfo.setUserInfo(item.name, item.profession);
    editProfessionForm.close();
  },
});

editProfessionForm.setEventListeners();
editPlaceForm.setEventListeners();
modalLook.setEventListeners();

//блок редактирования профиля
editProfileButton.addEventListener("click", function () {
  const profileInfoData = profileInfo.getUserInfo();
  modalName.value = profileInfoData.name;
  modalProfession.value = profileInfoData.profession;
  editProfessionForm.open();
  profileValidator.enableValidation();
});

//блок добавления карточек
newCardButton.addEventListener("mouseup", function () {
  // mouseup чтобы перекинуть фокус с кнопки на модалку
  editPlaceForm.open();
  cardValidator.enableValidation();
  modalTitle.focus();
  saveCard.reset();
});
