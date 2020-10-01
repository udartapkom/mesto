export class Section {
  constructor({ items, renderer }, cards) { //renderer - это функция
    this._items = items;
    this._renderer = renderer;
    this._cards = cards;
  }
  addItem(element) {
    //массив перевернут .reverse() чтобы карточеки отображались в нужном порядке
    this._cards.prepend(element); //вызываемый метод из колбэка (renderer), который добавляет карточки на страницу
  }
  renderItem() {
    this._items.forEach((item) => { //перебираем полученный массив
      this._renderer(item); // отправляем item в колбэк функцию renderer 
    });
  }
}
