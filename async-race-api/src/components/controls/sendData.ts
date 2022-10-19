class SendData {
  static async send(path: string, data: string): Promise<boolean> {
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

  static async change(path: string, data: string): Promise<void> {
    const res = await fetch(path, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method: 'PATCH',
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Ошибка пути ${path}, статус ошибки: ${res}`);
    }
  }
}

export default SendData;
