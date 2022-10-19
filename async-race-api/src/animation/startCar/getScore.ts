interface ScoreCar {
  velocity: number;
  distance: number;
}

class GetScore {
  static async get(path: string): Promise<ScoreCar> {
    try {
      const res = await fetch(path, {
        method: 'PATCH',
      });
      const data = await res.json();
      return data;
    } catch (err) {
      throw Error(`${err}`);
    }
  }

  static getScore(id: string, status: string): Promise<number> {
    const scoreCar = this.get(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`);
    return scoreCar.then((el: ScoreCar): number => el.distance / el.velocity);
  }
}

export default GetScore;
