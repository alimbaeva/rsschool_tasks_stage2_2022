import PagesMain from '../pagesCar/pagesMain';
import Garage from './garage';
import Winners from './winnwers';

class Collect {
  static collect(): void {
    const body = document.querySelector('body') as HTMLElement;
    body.prepend(PagesMain.creat());
    const garageBtn = document.querySelector('.garage') as HTMLButtonElement;
    const winnerBtn = document.querySelector('.winners') as HTMLButtonElement;
    garageBtn.addEventListener('click', () => {
      const winnersTable = document.querySelector('.winners-table') as HTMLElement;
      const nextPrevBtn = document.querySelector('.next-prev-btn') as HTMLElement;
      const pagination = document.querySelector('.pagination') as HTMLElement;
      nextPrevBtn.parentNode?.removeChild(nextPrevBtn);
      pagination.parentNode?.removeChild(pagination);
      winnersTable.parentNode?.removeChild(winnersTable);
      localStorage.setItem('Page', 'garage');
      Garage.creat();
    });

    winnerBtn.addEventListener('click', () => {
      const inputsCar = document.querySelector('.inputs-car') as HTMLElement;
      const garages = document.querySelector('.garages') as HTMLElement;
      const pagination = document.querySelector('.pagination') as HTMLElement;
      const nextPrevBtn = document.querySelector('.next-prev-btn') as HTMLElement;
      inputsCar.parentNode?.removeChild(inputsCar);
      garages.parentNode?.removeChild(garages);
      pagination.parentNode?.removeChild(pagination);
      nextPrevBtn.parentNode?.removeChild(nextPrevBtn);
      localStorage.setItem('Page', 'winners');
      Winners.start();
    });

    if (localStorage.getItem('Page') === 'garage' || !localStorage.getItem('Page')) {
      Garage.creat();
    } else {
      Winners.start();
    }
  }
}

export default Collect;
