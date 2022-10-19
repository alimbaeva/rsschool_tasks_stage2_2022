class SetWinner {
  static async setWinner(path: string, data: string): Promise<boolean> {
    const res = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Ошибка пути ${path}, статус ошибки: ${res}`);
    }
    return true;
  }
}

export default SetWinner;
