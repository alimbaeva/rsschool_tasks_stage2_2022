import SetGarage from '../../render/setGarage';
import Car from '../../render/rendering/car';

class GetData {
  async getData(path: string): Promise<[]> {
    const res = await fetch(path);

    if (!res.ok) {
      this.get('');
      throw new Error(`Ошибка пути ${path}, статус ошибки: ${res}`);
    }
    const data = await res.json();
    return data;
  }

  get(path: string): void {
    const datas = this.getData(path);
    localStorage.setItem('pathGarage', path);
    datas.then((el) => {
      SetGarage.setCar(el);
      Car.select();
      Car.remove();
    })
      .catch((err: string) => {
        throw new Error(err);
      });
  }
}

export default GetData;
