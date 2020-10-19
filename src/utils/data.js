//профиль пользователя
export const profileName = document.querySelector(".profile-info__title");
export const profileProfession = document.querySelector(".profile-info__subtitle");


export const modalProfession = document.querySelector(".modal__input_profession");
export const modalName = document.querySelector(".modal__input_name");

//Карточки
export const elements = document.querySelector(".elements");
export const cardTemplate = ".template-card";

//окна
export const modalProfile = document.querySelector(".modal_profile");
export const modalAddCard = document.querySelector(".modal_add-card");
export const modalLookPhoto = document.querySelector(".modal_look-photo");
export const modalAvatar = document.querySelector(".modal_avatar");
export const modalSubmit = document.querySelector(".modal_delete-card"); 

export const modalPhoto = modalLookPhoto.querySelector(".modal__photo-zoom");
export const modalSignature = modalLookPhoto.querySelector(".modal__photo-signature");

export const modals = document.querySelectorAll(".modal");

//кнопки
export const closeModalProfile = modalProfile.querySelector(".modal__close-button_profile");
export const closeModalAddCard = modalAddCard.querySelector(".modal__close-button_place");
export const closeModalLook = modalLookPhoto.querySelector(".modal__close-button");

export const newCardButton = document.querySelector(".profile__add-button");
export const editProfileButton = document.querySelector(".profile-info__edit-button");
export const profileAvatar = document.querySelector(".profile__avatar");

export const saveProfile = modalProfile.querySelector(".modal__form");
export const saveCard = modalAddCard.querySelector(".modal__form");
export const saveAvatar = modalAvatar.querySelector(".modal__form");
export const submitButton = modalAddCard.querySelector(".modal__save");

export const cardsTrashClass = ".cards__trash";

//Поля ввода
export const modalPlace = modalAddCard.querySelector(".modal__input_profession");
export const modalTitle = modalAddCard.querySelector(".modal__input_name");

export const formsObj = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_state_invalid",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
//данные для аутентификации
export const token = "ba6456b8-04fa-4ae4-bfc6-d88a7370f524";
export const cohort = "cohort-16";
export const serverUrl = "https://mesto.nomoreparties.co";

//Юзер ID
//export const userID;
