import GetScore from './startCar/getScore';
import StoptCarAnimation from './stopCar';
import OnFinish from './onFinish';

class StartCarAnimation {
  static start(id: string): void {
    const score = GetScore.getScore(id, 'started');
    score.then((el: number) : void => {
      const distanceWindows = window.screen.width - 170;
      const car = document.getElementById(`${id}`) as HTMLElement;
      const animation = car.animate([{ transform: `translate3d(${distanceWindows}px, 0px, 0px)` }], { duration: el, fill: 'forwards' });
      const backBar = document.querySelectorAll('.back-car');
      backBar.forEach((btn): void => {
        btn.addEventListener('click', (): void => {
          const idCar = btn.getAttribute('class');
          if (idCar) {
            StoptCarAnimation.stop(animation);
          }
        });
        animation.onfinish = () => {
          const recSec = new Date().getMilliseconds();
          const finishText = document.querySelector('.finishText') as HTMLDivElement;
          if (finishText) {
            finishText.parentNode?.removeChild(finishText);
          }
          OnFinish.finish(recSec, id);
        };
      });
    });
  }
}

export default StartCarAnimation;
