import Card from '../createCard';
import Result from '../result';

const data = require('../../data.json');

// const result = new Result();

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

class Filter {
  choose: FilterItem[];

  chooseAll: FilterItem[];

  chooseAll2: FilterItem[];

  numberCamera: boolean;

  colorChoese: boolean;

  producer: boolean;

  constructor() {
    this.choose = [];
    this.chooseAll = [];
    this.chooseAll2 = [];
    this.colorChoese = false;
    this.numberCamera = false;
    this.producer = false;
  }

  filter() : void {
    const colorChoese = document.querySelectorAll('.color-btn') as NodeListOf<HTMLElement>;
    colorChoese.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chooseId = btn.getAttribute('id');

        localStorage.setItem(`${chooseId}`, 'btn-activ');
        if (!this.numberCamera && !this.producer) {
          if (!btn.classList.contains('btn-activ')) {
            this.chooseAll = data.filter((item: FilterItem) => item.color.en === chooseId);
            this.colorChoese = true;
            this.cardIter(true);
          }
        } else {
          if (!btn.classList.contains('btn-activ')) {
            if (this.choose.length === this.chooseAll2.length) { this.choose = []; }
            this.chooseAll = this.chooseAll2.filter((item: FilterItem) => (item.color.en === chooseId));
            if (this.chooseAll.length === 0) {
              Result.result([]);
            }
            this.cardIter(false);
          }
        }

        this.callRender(btn);
      });
    });

    const numberCamera = document.querySelectorAll('.number p') as NodeListOf<HTMLElement>;
    numberCamera.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chooseId = btn.getAttribute('data-camera');

        localStorage.setItem(`${chooseId}`, 'btn-activ');
        if (!this.colorChoese && !this.producer) {
          if (!btn.classList.contains('btn-activ')) {
            this.chooseAll = data.filter((item: FilterItem) => item.number_cameras === chooseId);
            this.numberCamera = true;
            this.cardIter(true);
          }
        } else {
          if (!btn.classList.contains('btn-activ')) {
            if (this.choose.length === this.chooseAll2.length) { this.choose = []; }
            this.chooseAll = this.chooseAll2.filter((item: FilterItem) => (item.number_cameras === chooseId));
            if (this.chooseAll.length === 0) {
              Result.result([]);
            }
            this.cardIter(false);
          }
        }

        this.callRender(btn);
      });
    });

    const producer = document.querySelectorAll('.producer p') as NodeListOf<HTMLElement>;
    producer.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chooseId = btn.getAttribute('data-producer');

        localStorage.setItem(`${chooseId}`, 'btn-activ');
        if (!this.colorChoese && !this.numberCamera) {
          if (!btn.classList.contains('btn-activ')) {
            this.chooseAll = data.filter((item: FilterItem) => item.producer === chooseId);
            this.producer = true;
            this.cardIter(true);
          }
        } else {
          if (!btn.classList.contains('btn-activ')) {
            if (this.choose.length === this.chooseAll2.length) { this.choose = []; }
            this.chooseAll = this.chooseAll2.filter((item: FilterItem) => (item.producer === chooseId));
            if (this.chooseAll.length === 0) {
              Result.result([]);
            }
            this.cardIter(false);
          }
        }

        this.callRender(btn);
      });
    });

    const sort = document.getElementById('sort') as HTMLInputElement;
    const sortBtn = document.querySelector('.search button') as HTMLInputElement;
    sort.focus();

    sortBtn.addEventListener('click', () => {
      sort.value = '';
      sort.focus();
    });
    sort.addEventListener('input', () => {
      const sortValue = sort.value.toLowerCase();
      const sortSaerchCard = this.choose.length === 0 ? data.filter((item: FilterItem) => item.model.toLowerCase().includes(`${sortValue}`)) : this.choose.filter((item: FilterItem) => item.model.toLowerCase().includes(`${sortValue}`));
      const cardsNode = document.querySelector('.cards');
      (cardsNode as HTMLElement).textContent = '';
      Card.create(sortSaerchCard);
    });

    const cardSelect = document.getElementById('card__select') as HTMLInputElement;
    cardSelect.addEventListener('change', () => {
      if (cardSelect.value === 'az') {
        if (this.choose.length === 0) {
          this.choose = data.sort((cur: FilterItem, last: FilterItem) => (last.model.toLowerCase() > cur.model.toLowerCase() ? -1 : 1));
        } else {
          this.choose = this.choose.sort((cur: FilterItem, last: FilterItem) => (last.model.toLowerCase() > cur.model.toLowerCase() ? -1 : 1));
        }
      }
      if (cardSelect.value === 'za') {
        if (this.choose.length === 0) {
          this.choose = data.sort((cur: FilterItem, last: FilterItem) => (last.model.toLowerCase() < cur.model.toLowerCase() ? -1 : 1));
        } else {
          this.choose = this.choose.sort((cur: FilterItem, last: FilterItem) => (last.model.toLowerCase() < cur.model.toLowerCase() ? -1 : 1));
        }
      }
      if (cardSelect.value === 'growth-year') {
        if (this.choose.length === 0) {
          this.choose = data.sort((cur: FilterItem, last: FilterItem) => Number(last.year) - Number(cur.year));
        } else {
          this.choose = this.choose.sort((cur: FilterItem, last: FilterItem) => Number(last.year) - Number(cur.year));
        }
      }
      if (cardSelect.value === 'dropout-year') {
        if (this.choose.length === 0) {
          this.choose = data.sort((cur: FilterItem, last: FilterItem) => Number(cur.year) - Number(last.year));
        } else {
          this.choose = this.choose.sort((cur: FilterItem, last: FilterItem) => Number(cur.year) - Number(last.year));
        }
      }
      if (cardSelect.value === 'growth-quantity') {
        if (this.choose.length === 0) {
          this.choose = data.sort((cur: FilterItem, last: FilterItem) => Number(cur.balance) - Number(last.balance));
        } else {
          this.choose = this.choose.sort((cur: FilterItem, last: FilterItem) => Number(cur.balance) - Number(last.balance));
        }
      }
      if (cardSelect.value === 'dropout-quantity') {
        if (this.choose.length === 0) {
          this.choose = data.sort((cur: FilterItem, last: FilterItem) => Number(last.balance) - Number(cur.balance));
        } else {
          this.choose = this.choose.sort((cur: FilterItem, last: FilterItem) => Number(last.balance) - Number(cur.balance));
        }
      }

      this.callRender();
    });
  }

  reset() : void {
    this.choose = [];
    this.chooseAll = [];
    this.chooseAll2 = [];
    this.colorChoese = false;
    this.numberCamera = false;
    this.producer = false;
  }

  callRender(btn?: HTMLElement) : void {
    if (btn) {
      btn.classList.add('btn-activ');
    }
    localStorage.setItem('choose', `${JSON.stringify(this.choose)}`);
    Result.result(this.choose);
  }

  cardIter(boolean: boolean): void {
    this.chooseAll.forEach((el) => {
      this.choose.push(el);
      if (boolean) {
        this.chooseAll2.push(el);
      }
    });
  }
}

export default Filter;
