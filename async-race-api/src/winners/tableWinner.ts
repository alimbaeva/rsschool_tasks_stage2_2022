import RowWinners from './rowWinners';
import GetWinners from '../animation/startCar/getWinners';

interface Data {
  id: string;
  wins: string;
  time: string;
}
class TableWinners {
  static create(): HTMLElement {
    const tableWin = document.createElement('section') as HTMLElement;
    tableWin.setAttribute('class', 'winners-table');
    tableWin.innerHTML += RowWinners.create('Number', 'Car', 'Name', 'Wins', 'Best-time (seconds)');
    return tableWin;
  }

  static createWinn(path: string): void {
    const dataWinn = GetWinners.getWinners(path);
    dataWinn.then((el): void => {
      const table = document.querySelector('.winners-table') as HTMLElement;
      el.forEach((elWin: Data): void => {
        table.innerHTML += RowWinners.create(`${elWin.id}`, 'Car', 'Name', `${elWin.wins}`, `${elWin.time}`);
      });
    });
  }
}

export default TableWinners;
