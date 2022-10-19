import Buttons from '../buttons/buttons';
import SendData from '../../components/controls/sendData';

interface Obj {
  name: string;
  color: string;
}
class ChangeCar {
  static create(): string {
    return Buttons.create('change');
  }

  static change(id: string): void {
    const changeInput = document.querySelector('#change') as HTMLInputElement;
    const changeInputColor = document.querySelector('#change-сolor') as HTMLInputElement;
    const changeBtn = document.querySelector('#change-car') as HTMLButtonElement;
    changeBtn.addEventListener('click', () => {
      const carName = changeInput.value;
      const carColor = changeInputColor.value;
      changeInput.value = '';
      this.changeCarData(carName, carColor, id);
    });
  }

  static changeCarData(carName: string, carColor: string, id: string): void {
    const obj: Obj = {
      name: carName,
      color: carColor,
    };

    const strObj = JSON.stringify(obj);
    SendData.change(`http://127.0.0.1:3000/garage/${id}`, strObj);
    window.location.reload();
  }
}

export default ChangeCar;
