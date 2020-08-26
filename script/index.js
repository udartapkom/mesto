import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  cardTemplate,
  cards,
  modalLookPhoto,
  modalProfile,
  modalAddCard,
  editProfileButton,
  newCardButton,
  saveProfile,
  saveCard,
  submitButton,
  closeModalProfile,
  closeModalAddCard,
  closeModalLook,
  formsObj,
  modalTitle,
  modalPlace,
  modalName,
  modalProfession,
  profileName,
  profileProfession,
  modalPhoto,
  modalSignature,
  modals,
} from "./data.js";

initialCards.map((element) => {
  const card = new Card(element, cardTemplate); //создаём экземпяр класса Cardsrfhnf
  const items = card.cardGenerate(); // вызываем публичный метод
  cards.append(items);
});

const profileValidator = new FormValidator(formsObj, modalProfile); // Создаём экземпяры класса FormValidator для модалок
const cardValidator = new FormValidator(formsObj, modalAddCard);

export function addPhotoClick(photoCard, nameText) {
  //вешаем слушателя на фото, получем параметры и сразу пишем в модалку
  photoCard.addEventListener("click", () => {
    modalPhoto.src = photoCard.src;
    modalSignature.textContent = nameText.textContent;
    modalToggle(modalLookPhoto); //открываем - закрываем модалку
  });
}

closeModalClick(modalLookPhoto);
closeModalClick(modalProfile);
closeModalClick(modalAddCard);

// функция открытия закрытия модалки
function modalToggle(modalWindow) {
  if (modalWindow.classList.contains("modal_open")) {
    // если у модалки есть модификатор modal_open,
    modalWindow.classList.toggle("modal_open"); //убираем его
    modalWindow.classList.toggle("modal_close"); //и ставим modal_close
    disableListenerEsc();
  } else {
    modalWindow.classList.toggle("modal_close"); // иначе убираем close
    modalWindow.classList.toggle("modal_open"); // и добавляем open
    enableListenerEsc();
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
  profileValidator.enableValidation();
});

saveProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  modalSave(modalProfile);
});

closeModalProfile.addEventListener("click", function () {
  modalToggle(modalProfile);
});

//блок добавления карточек
newCardButton.addEventListener("mouseup", function () { // mouseup чтобы перекинуть фокус с кнопки на модалку
  modalToggle(modalAddCard);
  cardValidator.enableValidation();
  modalTitle.focus();
  saveCard.reset();
});
saveCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const card = new Card(
    {
      name: modalTitle.value,
      link: modalPlace.value,
    },
    cardTemplate
  );
  const item = card.cardGenerate();
  cards.prepend(item);
  modalTitle.value = ""; //после добавления карточки, очищаем поля ввода, чтобы при следующем открытии поля были пустыми
  modalPlace.value = "";
  submitButton.classList.add("modal__save_state_invalid"); //при следующем открытии окна кнопка заблочена
  modalToggle(modalAddCard);
});

closeModalAddCard.addEventListener("click", function () {
  modalToggle(modalAddCard);
});

//блок просмотра фото
closeModalLook.addEventListener("click", function () {
  modalToggle(modalLookPhoto);
});

const isModalOpened = (modal) => {
  return modal.classList.contains("modal_open");
};
const thisModalIsOpen = () => {
  const ModalIsOpen = Array.from(modals);
  const modalElement = ModalIsOpen.find(function (modal) {
    return isModalOpened(modal);
  });
  return modalElement;
};

function enableListenerEsc() {
  document.addEventListener("keydown", closeModalEsc);
}
function disableListenerEsc() {
  document.removeEventListener("keydown", closeModalEsc);
}
//закрываем модалку по Esc
function closeModalEsc(event) {
  const modalElement = thisModalIsOpen();
  if (event.key === "Escape") {
    modalToggle(modalElement);
  }
}
//закрываем модалку по Click
function closeModalClick(modalType) {
  modalType.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("modal") ||
      (event.target.classList.contains("modal__close-button") &&
        modalType.classList.contains("modal_open"))
    ) {
      modalToggle(modalType);
    }
  });
}
