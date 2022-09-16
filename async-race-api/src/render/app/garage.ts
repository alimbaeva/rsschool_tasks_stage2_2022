import ChangeCar from '../changeCar/changeCar';
import CreateCar from '../createCar/createCar';
import StartCar from '../startCar/startCar';
import Pages from '../pagesCar/pages';
import NextPrevPage from '../pagesCar/nextPrevPage';
import GetData from '../../components/controls/getData';
import CarCount from '../../components/carCount';

const nextPrevPage = new NextPrevPage();
const getData = new GetData();

class Garage {
  static creat(): void {
    const body = document.querySelector('body') as HTMLElement;
    const creatChangeCar = document.createElement('section') as HTMLElement;
    creatChangeCar.setAttribute('class', 'inputs-car');
    creatChangeCar.innerHTML += CreateCar.create();
    creatChangeCar.innerHTML += ChangeCar.create();
    creatChangeCar.append(StartCar.create());
    body.append(creatChangeCar);
    body.append(Pages.create());
    const next = document.querySelector('.next') as HTMLButtonElement;
    const prev = document.querySelector('.previos') as HTMLButtonElement;
    next.addEventListener('click', () => {
      const garage = document.querySelector('.garages') as HTMLElement;
      garage.parentNode?.removeChild(garage);
      nextPrevPage.next();
    });
    prev.addEventListener('click', () => {
      const garage = document.querySelector('.garages') as HTMLElement;
      garage.parentNode?.removeChild(garage);
      nextPrevPage.prev();
    });
    getData.get(`${localStorage.getItem('pathGarage') ? localStorage.getItem('pathGarage') : 'http://127.0.0.1:3000/garage?_limit=7&_page='}`);
    CarCount.datas(`${(localStorage.getItem('page-namber') ? (localStorage.getItem('page-namber')) : 1)}`);
    CreateCar.getData();
    StartCar.generate();
  }
}

export default Garage;
