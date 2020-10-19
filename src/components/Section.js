export class Section {
  constructor({ renderer }, cards) {
    this._renderer = renderer;
    this._cards = cards;
  }
  addItem(element, trueFalse) {  //вызываемый метод из колбэка (renderer), который добавляет карточки на страницу
    if (trueFalse) { // это условие для того, чтобы карточки выстраивались в правильном порядке
      this._cards.append(element);
    } else {
      this._cards.prepend(element);
    }
  }
  renderItem(items, userID) {
    items.forEach((item) => { //перебираем полученный массив
      this._renderer(item, userID); // отправляем item в колбэк функцию renderer
    });
  }
}
