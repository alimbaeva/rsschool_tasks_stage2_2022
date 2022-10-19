import Car from './rendering/car';
import StartCarAnimation from '../animation/startCar';

interface Data {
  name: string,
  color: string,
  id: number
}

class SetGarage {
  static setCar(data: Data[]): void {
    const body = document.querySelector('body') as HTMLElement;
    const bodyCar = document.createElement('section') as HTMLElement;
    bodyCar.setAttribute('class', 'garages');

    data.forEach((el: Data): void => {
      bodyCar.innerHTML += Car.car(el.name, el.color, el.id);
    });
    body.append(bodyCar);
    const startCar = document.querySelectorAll('.starts-car');
    startCar.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idCar = btn.getAttribute('class');
        if (idCar) {
          StartCarAnimation.start(idCar.split(' ')[1].split('-')[1]);
        }
      });
    });
  }
}

export default SetGarage;
