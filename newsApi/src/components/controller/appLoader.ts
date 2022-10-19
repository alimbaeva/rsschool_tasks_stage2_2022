import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'caecbae4043c424581e742645f3bbaba', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
