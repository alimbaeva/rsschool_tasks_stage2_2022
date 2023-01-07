import './createCard.scss';

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
class Card {
  static create(data: FilterItem[]) : void {
    // if (!data) {
    //   return Error('Data did not come!');
    // }
    const cardSection = document.querySelector('.cards') as HTMLElement;
    data.map((el: FilterItem) : HTMLElement => {
      const card = document.createElement('div') as HTMLElement;
      card.setAttribute('class', 'card');
      card.setAttribute('id', `${el.id}`);
      const cardImgBlock = document.createElement('div') as HTMLElement;
      cardImgBlock.setAttribute('class', 'card__img-block');
      const img = document.createElement('img') as HTMLElement;
      img.setAttribute('src', `./img/${el.image.main_image}`);
      img.setAttribute('alt', `smartfone ${el.model}`);
      cardImgBlock.append(img);
      card.append(cardImgBlock);
      const cardInfo = document.createElement('div') as HTMLElement;
      cardInfo.setAttribute('class', 'card__info');
      const titleCard = document.createElement('h3') as HTMLElement;
      titleCard.innerHTML = `${el.model}`;
      const producer = document.createElement('p') as HTMLElement;
      producer.innerHTML = `Производитель: ${el.producer}`;
      const cameras = document.createElement('p') as HTMLElement;
      cameras.innerHTML = `Количество камер: ${el.number_cameras}`;
      const color = document.createElement('p') as HTMLElement;
      color.innerHTML = `Цвет: ${el.color.ru}`;
      const year = document.createElement('p') as HTMLElement;
      year.innerHTML = `Год выпуска: ${el.year}`;
      const populare = document.createElement('p') as HTMLElement;
      populare.innerHTML = `Популярность: ${el.populare}`;
      const balance = document.createElement('p') as HTMLElement;
      balance.innerHTML = `Остаток: ${el.balance}`;
      const price = document.createElement('p') as HTMLElement;
      price.setAttribute('class', 'card__price');
      price.innerHTML = `${el.price} р`;
      cardInfo.append(titleCard);
      cardInfo.append(producer);
      cardInfo.append(cameras);
      cardInfo.append(color);
      cardInfo.append(year);
      cardInfo.append(populare);
      cardInfo.append(balance);
      cardInfo.append(price);
      card.append(cardInfo);
      const productCount = document.querySelector('.product') as HTMLElement;
      productCount.innerHTML = localStorage.productCount === 'undefined' ? 0 : localStorage.productCount;
      localStorage.setItem('productCount', productCount?.innerHTML);
      card.addEventListener('click', () => {
        const getProductCount = localStorage.getItem('productCount');
        const idCard = card.getAttribute('id');
        if (!card.classList.contains('click-card')) {
          localStorage.productCount = String(Number(getProductCount) + 1);
          card.classList.add('click-card');
          if (Number(localStorage.productCount) >= 10) {
            (cardSection as HTMLElement).innerHTML = '<p class="not-found">Извините, все слоты заполнены!</p>';
          }
          localStorage.setItem(`${idCard}`, 'click-card');
          productCount.innerHTML = localStorage.productCount;
        } else {
          localStorage.productCount = String(Number(getProductCount) - 1);
          card.classList.remove('click-card');
          localStorage.removeItem(`${idCard}`);
          productCount.innerHTML = localStorage.productCount;
        }
      });

      return cardSection.appendChild(card);
    });
  }
}

export default Card;
