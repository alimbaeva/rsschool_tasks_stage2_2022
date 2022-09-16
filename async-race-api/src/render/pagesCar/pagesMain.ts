import Buttons from '../buttons/buttons';

class PagesMain {
  static creat(): HTMLElement {
    const pagesMain = document.createElement('div') as HTMLElement;
    pagesMain.setAttribute('class', 'main-pages');
    pagesMain.innerHTML += Buttons.createBtn('garage', '');
    pagesMain.innerHTML += Buttons.createBtn('winners', '');
    return pagesMain;
  }
}

export default PagesMain;
