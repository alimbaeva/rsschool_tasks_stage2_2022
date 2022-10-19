import News from './news/news';
import Sources from './sources/sources';

type TypeDrawNews = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string, name: string };
  title: string;
  url: string;
  urlToImage: string;
};

type AppViewData = {
  status: string, 
  totalResults: number, 
  articles: Array<TypeDrawNews>
};

type AppViewDataValues = {
  category: string, 
  country: string, 
  description: string, 
  id: string, 
  language: string, 
  name: string, 
  url: string, 
};

interface AppDrawSources {
  status: string, 
  sources: Array<AppViewDataValues>
}

export class AppView { 

  news: News;
  
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: AppViewData) : void  {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: AppDrawSources) : void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
