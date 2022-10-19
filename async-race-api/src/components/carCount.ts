import RenderPagination from '../render/pagination/renderPagination';
import './carCount.scss';

class CarCount {
  static async getData(path: string): Promise<[]> {
    const res = await fetch(path);
    const data = await res.json();
    return data;
  }

  static datas(numPage: string): Promise<void> {
    const data = this.getData('http://127.0.0.1:3000/garage');
    localStorage.setItem('page-namber', numPage);
    return data.then((el: string[]): string => {
      localStorage.setItem('garage-length', `${el.length}`);
      let arr = '';
      arr += `${el.length},${numPage}`;
      return arr;
    })
      .then((el: string): void => {
        const arr: string[] = el.split(',');
        RenderPagination.render('Garage', arr);
      });
  }
}

export default CarCount;
