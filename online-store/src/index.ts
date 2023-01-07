import * as noUiSlider from 'nouislider';
import RangeSlider from './components/slider/slider';
import Filter from './components/filter/filter';
import './style.scss';

const rangeSlider = new RangeSlider();
const yearSlider = new RangeSlider();
const filter = new Filter();

const rangeSliders = document.getElementById('range-slider') as noUiSlider.target;
const input0 = document.getElementById('price-input0') as HTMLInputElement;
const input1 = document.getElementById('price-input1') as HTMLInputElement;

const yearSliders = document.getElementById('year-slider') as noUiSlider.target;
const year0 = document.getElementById('year-input0') as HTMLInputElement;
const year1 = document.getElementById('year-input1') as HTMLInputElement;
const colorChoese = document.querySelectorAll('.color-btn');
const numberCamera = document.querySelectorAll('.number p');
const producer = document.querySelectorAll('.producer p');

window.addEventListener('load', () => {
  for (let i = 0; i <= localStorage.length; i++) {
    if (localStorage.key(i)) {
      if (localStorage.key(i)?.split('_')[0] === 'card') {
        const cardCl = localStorage.key(i) || '';
        (document.getElementById(cardCl) as HTMLElement).classList.add('click-card');
      }

      colorChoese.forEach((btn) => {
        const chooseId = btn.getAttribute('id');
        if (chooseId === localStorage.key(i)) {
          btn.classList.add('btn-activ');
        }
      });

      numberCamera.forEach((btn) => {
        const chooseId = btn.getAttribute('data-camera');
        if (chooseId === localStorage.key(i)) {
          btn.classList.add('btn-activ');
        }
      });

      producer.forEach((btn) => {
        const chooseId = btn.getAttribute('data-producer');
        if (chooseId === localStorage.key(i)) {
          btn.classList.add('btn-activ');
        }
      });
    }
  }
});

const reset = document.getElementById('reset') as HTMLElement;
reset.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

const resetFilter = document.getElementById('resetFilter') as HTMLElement;
resetFilter.addEventListener('click', () => {
  colorChoese.forEach((btn) => {
    const chooseId = btn.getAttribute('id');
    localStorage.removeItem(`${chooseId}`);
    btn.classList.remove('btn-activ');
  });

  numberCamera.forEach((btn) => {
    const chooseId = btn.getAttribute('data-camera');
    localStorage.removeItem(`${chooseId}`);
    btn.classList.remove('btn-activ');
  });

  producer.forEach((btn) => {
    const chooseId = btn.getAttribute('data-producer');
    localStorage.removeItem(`${chooseId}`);
    btn.classList.remove('btn-activ');
  });

  filter.reset();
});

rangeSlider.create(rangeSliders, input0, input1, 20000, 100000, 10);
yearSlider.create(yearSliders, year0, year1, 2015, 2022, 1);
filter.filter();
