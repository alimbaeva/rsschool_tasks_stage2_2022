import './buttons.scss';

class Buttons {
  static create(text: string): string {
    return `
      <div class="cr-ch-car ${text}-car">
        <input type="text" id="${text}" value>
        <input class="color" type="color" id="${text}-сolor" value="#ff0080">
        <button id="${text}-car">${text}</button>
      </div>
    `;
  }

  static createBtn(text: string, el: string): string {
    let booling: boolean;
    if (localStorage.getItem('page-namber')) {
      if (Number(localStorage.getItem('page-namber')) > 1) {
        booling = true;
      } else {
        booling = false;
      }
    } else {
      booling = false;
    }
    if (text === 'next' && Math.ceil(Number(localStorage.getItem('garage-length')) / 7) <= Number(localStorage.getItem('page-namber'))) {
      return `
      <button class="${text}" disabled >${text} ${el}</button>
    `;
    }
    if (text === 'previos') {
      return `
      <button class="${text}" ${text === 'previos' && !booling ? 'disabled' : ''}>${text} ${el}</button>
    `;
    }
    return `
      <button class="${text}">${text} ${el}</button>
    `;
  }
}

export default Buttons;
