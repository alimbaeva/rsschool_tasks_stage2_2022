import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Result from '../result';

const data = require('../../data.json');

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

let max2 = 0;
let min2 = 0;

class RangeSlider {
  choose1: [];

  choose11: FilterItem[];

  constructor() {
    this.choose1 = [];
    this.choose11 = [];
  }

  create(rangeSlider: noUiSlider.target, input0: HTMLInputElement, input1: HTMLInputElement, startNum: number, endNum: number, step: number) : void {
    function setrangeSlider(index: number, value: string) : void {
      const inputValue = [];
      inputValue[index] = value;
      rangeSlider.noUiSlider?.set(inputValue);
    }

    if (rangeSlider) {
      noUiSlider.create(rangeSlider, {
        start: [startNum, endNum],
        connect: true,
        step,
        range: {
          min: startNum,
          max: endNum,
        },
      });

      const inputs:HTMLInputElement[] = [input0, input1];

      (rangeSlider.noUiSlider as noUiSlider.API).on('update', (values, handle) : void => {
        ((inputs[handle]).value as string) = String(Math.round((values[handle] as number)));
        const idElement = input0.id.split('-')[0];
        this.filter((values[handle] as number), handle, idElement, endNum);
      });

      inputs.forEach((el: HTMLInputElement, ind: number) : void => {
        el.addEventListener('change', (e) => {
          setrangeSlider(ind, (e.currentTarget as HTMLInputElement).value);
        });
      });
    }

    const resetFilter = document.querySelector('#resetFilter');
    resetFilter?.addEventListener('click', () => {
      rangeSlider.noUiSlider?.set([startNum, endNum]);
    });
  }

  filter(values: number, handle: number, idElement: string, endNum: number) : void {
    max2 = endNum;
    if (handle === 0) {
      min2 = values;
    }
    if (handle === 1) {
      max2 = values;
    }
    const getChoose = localStorage.getItem('choose');
    let chooseLS: FilterItem[] = [];
    if (getChoose !== null) {
      chooseLS = JSON.parse(getChoose);
    } else {
      chooseLS = data;
    }
    if (idElement === 'price') {
      this.choose1 = chooseLS ? chooseLS.filter((item: FilterItem) => min2 < Number(item.price)) : data.filter((item: FilterItem) => min2 < Number(item.price));
      this.choose11 = this.choose1.filter((item: FilterItem) => max2 > Number(item.price));
      localStorage.setItem('choose', `${JSON.stringify(this.choose11)}`);
      Result.result(this.choose11);
    }
    if (idElement === 'year') {
      this.choose1 = chooseLS ? chooseLS.filter((item: FilterItem) => min2 < Number(item.year)) : data.filter((item: FilterItem) => min2 < Number(item.year));
      this.choose11 = this.choose1.filter((item: FilterItem) => max2 > Number(item.year));
      localStorage.setItem('choose', `${JSON.stringify(this.choose11)}`);
      Result.result(this.choose11);
    }
  }
}

export default RangeSlider;
