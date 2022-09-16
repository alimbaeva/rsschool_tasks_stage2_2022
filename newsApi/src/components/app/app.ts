import AppController from '../controller/controller';
import { AppView } from '../view/appView';


type TypeGetSources = {
  category: string,
  country: string,
  description: string,
  id: string,
  language: string,
  name: string,
  url: string
};
type TypeGetnews = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string, name: string };
  title: string;
  url: string;
  urlToImage: string;
};

type DataGetSources = {
  status: string, 
  sources: Array<TypeGetSources>
};

interface AppDataGetNews {
  status: string;
  totalResults: number;
  articles: Array<TypeGetnews>
}

class App {

  controller: AppController;

  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sources = document.querySelector('.sources') as HTMLElement;
    const btn = document.querySelector('.btn__source') as HTMLElement;
    btn.addEventListener('click', ()=>{
      sources.style.display = 'block';
    });

    (document.querySelector('.sources') as HTMLElement)
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => {
        const widthWindow = document.documentElement.clientWidth;
        if (widthWindow <= 500) {
          sources.style.display = 'none';
        }
        this.view.drawNews(data as AppDataGetNews);
      }));
    this.controller.getSources((data  ) => {
      this.view.drawSources(data as DataGetSources);
    });
  }
}

export default App;
