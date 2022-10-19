import Buttons from '../buttons/buttons';
import SendData from '../../components/controls/sendData';

interface Obj {
  name: string;
  color: string;
}
class CreateCar {
  static create() : string {
    return Buttons.create('create');
  }

  static getData(): void {
    const createInput = document.querySelector('#create') as HTMLInputElement;
    const createInputColor = document.querySelector('#create-сolor') as HTMLInputElement;
    const createBtn = document.querySelector('#create-car') as HTMLButtonElement;
    createBtn.addEventListener('click', () => {
      const carName = createInput.value;
      const carColor = createInputColor.value;
      createInput.value = '';
      this.sendCarData(carName, carColor);
    });
  }

  static sendCarData(carName: string, carColor: string): void {
    const obj: Obj = {
      name: carName,
      color: carColor,
    };

    const strObj = JSON.stringify(obj);
    SendData.send('http://127.0.0.1:3000/garage', strObj);
    window.location.reload();
  }
}

export default CreateCar;
