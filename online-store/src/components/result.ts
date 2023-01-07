import Card from './createCard';

const data = require('../data.json');
// const card = new Card();

interface FilterItem {
  id: string;
  model: string;
  producer: string;
  number_cameras : string;
  color: {
    ru: string;
    en: string
  },
  year: string;
  populare: string;
  balance: string;
  price: string;
  image: {
    main_image: string;
    image_1: string;
    image_2: string;
    image_3: string
  }
}
class Result {
  static result(choose: FilterItem[]) : void {
    const cardsNode = document.querySelector('.cards');
    (cardsNode as HTMLDivElement).textContent = '';
    if (choose.length === 0) {
      (cardsNode as HTMLDivElement).innerHTML = '<p class="not-found">Ивините, но по вашему выбору ничего не найденно!</p>';
    }

    const getChoose = localStorage.getItem('choose');
    let chooseLS: FilterItem[] = [];
    if (getChoose === null) {
      chooseLS = data;
    } else {
      chooseLS = JSON.parse(getChoose);
    }
    if (chooseLS) {
      Card.create(chooseLS);
    } else {
      Card.create(choose);
    }
  }
}

export default Result;
