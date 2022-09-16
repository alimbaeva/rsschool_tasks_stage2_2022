import PaginationWin from '../../winners/pagination/pagination';
import TableWinners from '../../winners/tableWinner';
import Pages from '../pagesCar/pages';

class Winners {
  static start(): HTMLElement {
    // const body = document.querySelector('body') as HTMLElement;
    const bodySection = document.querySelector('div') as HTMLElement;
    PaginationWin.render();
    bodySection.append(Pages.create());
    bodySection.append(TableWinners.create());
    TableWinners.createWinn('http://127.0.0.1:3000/winners');
    return bodySection;
  }
}

export default Winners;
