import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
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
  modals,
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
const modalCard = new Popup(modalAddCard, modals);
const modalEditProfile = new Popup(modalProfile, modals);
const modalLook = new PopupWithImage(modalLookPhoto);
const profileInfo = new UserInfo({
  professionElement: profileProfession,
  nameElement: profileName,
});

const section = new Section({
  // Создаём экземпяр класса Section и передаем в него массив и функцию renderer
  items: initialCards,
  renderer: (item) => {
    const card = addNewCard(item);
    const element = card.cardGenerate(); // вызываем метод cardGenerate()
    section.addItem(element); //передаем в метод класса Section готовую разметку
  },
});

section.renderItem(); // запускаем генерацию и добавление карточек

const editPlaceForm = new PopupWithForm(modalAddCard, {
  submitForm: (item) => {
    const card = addNewCard(item);
    const element = card.cardGenerate();
    section.addItem(element);
    editPlaceForm.close();
  },
});

const editProfessionForm = new PopupWithForm(modalProfile, {
  submitForm: (item) => {
    profileInfo.setUserInfo(item.name, item.profession);
    editProfessionForm.close();
  },
});

editProfessionForm.setEventListeners();
editPlaceForm.setEventListeners();
modalCard.setEventListeners();
modalLook.setEventListeners();

//блок редактирования профиля
editProfileButton.addEventListener("click", function () {
  const profileInfoData = profileInfo.getUserInfo();
  modalName.value = profileInfoData.name;
  modalProfession.value = profileInfoData.profession;
  modalEditProfile.open();
  profileValidator.enableValidation();
});

//блок добавления карточек
newCardButton.addEventListener("mouseup", function () {
  // mouseup чтобы перекинуть фокус с кнопки на модалку
  modalCard.open();
  cardValidator.enableValidation();
  modalTitle.focus();
  saveCard.reset();
});