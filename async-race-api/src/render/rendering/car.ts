import ChangeCar from '../changeCar/changeCar';
import DeleteData from '../../components/controls/deleteData';
import './car.scss';

class Car {
  static car(name: string, color: string, id: number): string {
    return `
      <div class="car-block">
        <div class="car-block__selects">
            <button id="select" class="car-${id}">select</button>
            <button id="remove" class="car-${id}">remove</button>
            <p>${name}</p>
        </div>
        <div class="car-block__activ">
            <button class="starts-car start-${id}">A</button>
            <button class="back-car start-${id}">B</button>
            <svg id="${id}" class="car-svg">
                <use class="ic" style="fill: ${color};" xlink:href='./svg/sprite.svg#car2'></use>
            </svg>
        </div>
        <svg class="flag-svg">
          <use style="fill: red;" xlink:href='./svg/sprite.svg#flag'></use>
        </svg>
      </div>
    `;
  }

  static select(): void {
    const select = document.querySelectorAll('#select');
    select.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idCar = btn.getAttribute('class')?.split('-')[1];
        if (idCar) {
          ChangeCar.change(idCar);
        }
      });
    });
  }

  static remove(): void {
    const remove = document.querySelectorAll('#remove');
    remove.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idCar = btn.getAttribute('class')?.split('-')[1];
        if (idCar) {
          DeleteData.delete(`http://127.0.0.1:3000/garage/${idCar}`);
        }
      });
    });
  }
}

export default Car;
