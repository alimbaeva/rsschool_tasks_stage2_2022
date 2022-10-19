interface Winner {
  id: string;
  name: string;
  color: string;
}

class GetDataCar {
  static async get(path: string): Promise<Winner> {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Ошибка пути ${path}, статус ошибки: ${res}`);
    }
    const data = await res.json();
    return data;
  }
}

export default GetDataCar;
