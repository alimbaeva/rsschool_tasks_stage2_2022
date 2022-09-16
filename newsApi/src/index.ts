import App from './components/app/app';
import WindowSize from './components/view/windowSize';
import './global.css';

const app = new App();
const size = new WindowSize();
app.start();
window.addEventListener('resize', ()=>{
  size.sizeChange();
});
size.sizeChange();