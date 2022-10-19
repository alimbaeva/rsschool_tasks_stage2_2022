import AppLoader from './appLoader';



type GetNewsData = {
  urlToImage: string; 
  author: string; 
  source: { name: string; }; 
  publishedAt: string; 
  title: string; 
  description: string; 
  url: string; 
};

interface AppDataGetNews {
  status: string,  
  totalResults: number;
  articles: Array<GetNewsData>
}


type TypeGetSources = {
  category: string,
  country: string,
  description: string,
  id: string | number,
  language: string,
  name: string,
  url: string
};

interface DataGetSources {
  status?: string, 
  sources: Array<TypeGetSources>
}

type TypeFunCall<T> = (data?: T) => void;
class AppController extends AppLoader {
  getSources(callback: TypeFunCall<DataGetSources>): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: TypeFunCall<AppDataGetNews> | undefined): void {
    let target = e.target as HTMLElement;
    if (target === null) {
      throw Error('It is null');
    }
    const newsContainer = e.currentTarget as HTMLElement;
    if (newsContainer === null) {
      throw Error('It is null');
    }

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
