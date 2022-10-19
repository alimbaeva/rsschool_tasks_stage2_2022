class GetWinners {
  static async getWinners(path: string): Promise<[]> {
    const res = await fetch(path);

    if (!res.ok) {
      throw new Error(`Ошибка пути , статус ошибки: ${res}`);
    }
    const data = await res.json();
    return data;
  }
}

export default GetWinners;
