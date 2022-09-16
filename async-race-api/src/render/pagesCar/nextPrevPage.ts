import GetData from '../../components/controls/getData';
import CarCount from '../../components/carCount';

const getData = new GetData();

class NextPrevPage {
  page: number;

  constructor() {
    this.page = (localStorage.getItem('page-namber') ? Number((localStorage.getItem('page-namber'))) : 1);
  }

  start(num: number): void {
    getData.get(`http://127.0.0.1:3000/garage?_limit=7&_page=${num}`);
    CarCount.datas(String(num));
    const pagesNext = Math.ceil(Number(localStorage.getItem('garage-length')) / 7);
    const pagesPrev = Number(localStorage.getItem('page-namber'));
    if (pagesPrev <= 1 || pagesPrev === 2 || pagesNext === pagesPrev || pagesNext - 2 === pagesPrev - 1) {
      if (this.page) window.location.reload();
    }
  }

  next(): void {
    this.page += 1;
    this.start(this.page);
  }

  prev(): void {
    this.page -= 1;
    this.start(this.page);
  }
}

export default NextPrevPage;
