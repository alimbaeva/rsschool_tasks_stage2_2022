import Buttons from '../buttons/buttons';

class Pages {
  static create(): HTMLElement {
    const nextPrevBtn = document.createElement('div') as HTMLElement;
    nextPrevBtn.setAttribute('class', 'next-prev-btn');
    nextPrevBtn.innerHTML += Buttons.createBtn('previos', 'page');
    nextPrevBtn.innerHTML += Buttons.createBtn('next', 'page');
    return nextPrevBtn;
  }
}

export default Pages;
