import GetCarData from './startCar/getDataCar';
import SetWinner from './startCar/setWinner';

interface Winner {
  id: string;
  name: string;
  color: string;
}

let scoreSec: number;
let idCar: string;
let winnerOne: Winner;
class OnFinish {
  static finish(recSec: number, id: string): void {
    if (!scoreSec) { scoreSec = recSec; }
    if (!idCar) { idCar = id; }
    const winner = GetCarData.get(`http://127.0.0.1:3000/garage?id=${idCar}`);
    if (!winnerOne) {
      winner.then((el) => {
        winnerOne = el;
        this.winner();
      });
    }
    const finishText = document.createElement('p') as HTMLElement;
    finishText.setAttribute('class', 'finishText');
    finishText.textContent = `FINISH SCORE(${scoreSec}), ID ${idCar}`;
    (document.querySelector('body') as HTMLBodyElement).append(finishText);
    document.querySelector('body')?.addEventListener('click', () => finishText.parentNode?.removeChild(finishText));
  }

  static winner(): void {
    const data = {
      id: winnerOne.id,
      wins: 1,
      time: scoreSec,
    };
    SetWinner.setWinner('http://127.0.0.1:3000/winners', JSON.stringify(data));
  }
}

export default OnFinish;
