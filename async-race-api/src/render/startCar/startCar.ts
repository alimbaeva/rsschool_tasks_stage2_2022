import Buttons from '../buttons/buttons';
import Generate from './generate';

class StartCar {
  static create(): HTMLElement {
    const startCar = document.createElement('div') as HTMLElement;
    startCar.setAttribute('class', 'start-car');
    startCar.innerHTML += Buttons.createBtn('rase', 'car');
    startCar.innerHTML += Buttons.createBtn('reset', 'car');
    startCar.innerHTML += Buttons.createBtn('generate', 'car');

    return startCar;
  }

  static generate(): void {
    const generateBtn = document.querySelector('.generate') as HTMLButtonElement;
    generateBtn.addEventListener('click', () => {
      Generate.generate();
    });
  }
}

export default StartCar;
