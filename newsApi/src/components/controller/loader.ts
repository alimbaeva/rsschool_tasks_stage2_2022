interface ResponseErrorHandler  {
  ok: boolean;
  redirected:  boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
  json(): void;
}

interface GetRespType {
  endpoint: string,
  options?: { sources: string | null | number }
}

type TypeFunCall<T> = (data?: T) => void;
class Loader {

  options: { apiKey:string };

  baseLink: string;

  constructor(baseLink: string, options: { apiKey:string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
        
    { endpoint, options } : GetRespType,
    callback = (): void => {
      throw new Error('No callback for GET response');
    },
  ) : void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: ResponseErrorHandler ) : ResponseErrorHandler {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        throw new Error(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: { sources: string | null | number } | undefined, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    // console.log("options===",options)
    // console.log("this.options===",this.options)
    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as  keyof typeof urlOptions]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: TypeFunCall<ResponseErrorHandler>, options: { sources: string | null | number } | undefined): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data as undefined))
      .catch((err) => {throw new Error(err);});
  }
}

export default Loader;
